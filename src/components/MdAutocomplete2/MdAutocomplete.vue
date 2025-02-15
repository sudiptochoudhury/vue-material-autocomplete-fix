<template>
  <md-field class="md-autocomplete" :class="fieldClasses" md-clearable :md-inline="isBoxLayout">
    <md-menu2 md-direction="bottom-start" :md-dense="mdDense" md-align-trigger md-full-width :md-active.sync="showMenu">
      <md-input
        v-model="searchTerm"
        v-bind="$attrs"
        :id="mdInputId"
        :name="mdInputName"
        :maxlength="mdInputMaxlength"
        :placeholder="mdInputPlaceholder"
        @focus.stop="onFocus"
        @blur="onBlur"
        @keyup="onKeyPress"
        @input="onInput"
        @click.stop.prevent="openOnFocus" />

      <md-menu-content2 :class="contentClasses" v-show="hasScopedEmptySlot || hasFilteredItems" @click-blank="deSelectItem()">
        <div class="md-autocomplete-loading" v-if="isPromisePending">
          <md-progress-spinner :md-diameter="40" :md-stroke="4" md-mode="indeterminate" />
        </div>

        <div class="md-autocomplete-items" v-if="hasFilteredItems">
          <md-menu-item2 v-for="(item, index) in getOptions()" :key="index" @click="selectItem(item, $event)" :initiallyHighlighted="isSelected(item, index)">
            <slot name="md-autocomplete-item" :item="item" :term="searchTerm" v-if="$scopedSlots['md-autocomplete-item']" />
            <template v-else>{{ item }}</template>
          </md-menu-item2>
        </div>

        <md-menu-item2 disabled v-else-if="hasScopedEmptySlot">
          <div class="md-autocomplete-empty">
            <slot name="md-autocomplete-empty" :term="searchTerm">
              {{ mdEmptyText }}
            </slot>
          </div>
        </md-menu-item2>
      </md-menu-content2>
    </md-menu2>

    <slot />
  </md-field>
</template>

<script>
  import fuzzy from 'fuzzysearch'
  import isPromise from 'is-promise'
  import MdPropValidator from 'core/utils/MdPropValidator'

  export default {
    name: 'MdAutocomplete2',
    props: {
      value: {
        type: null,
        required: true
      },
      mdDense: Boolean,
      mdLayout: {
        type: String,
        default: 'floating',
        ...MdPropValidator('md-layout', [
          'floating',
          'box'
        ])
      },
      mdOpenOnFocus: {
        type: Boolean,
        default: true
      },
      mdOpenOnInput: {
        type: Boolean,
        default: true
      },
      mdFuzzySearch: {
        type: Boolean,
        default: true
      },
      mdOptions: {
        type: [Array, Promise],
        required: true
      },
      mdInputName: String,
      mdInputId: String,
      mdInputMaxlength: [String, Number],
      mdInputPlaceholder: [String, Number],
      mdEmptyText: {
        type: [String, Number],
        default: 'No data available'
      },
      mdCleanEmptyOnEnter: {
        type: Boolean,
        default: true
      },
      mdSkipFilterOnOpen: {
        type: Boolean,
        default: true
      },
      mdContentClasses: {
        type: [String, Array, Object],
        default: () => []
      },
      mdStrict: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        searchTerm: this.value,
        allowFilter: !this.mdSkipFilterOnOpen,
        showMenu: false,
        triggerPopover: false,
        isPromisePending: false,
        filteredAsyncOptions: []
      }
    },
    computed: {
      isBoxLayout () {
        return this.mdLayout === 'box'
      },
      fieldClasses () {
        if (this.isBoxLayout) {
          return 'md-autocomplete-box'
        }
      },
      contentClasses () {
        let classes = [
          'md-autocomplete-menu-content',
          this.mdContentClasses
        ]
        if (this.isBoxLayout) {
          classes.push('md-autocomplete-box-content')
        }
        return classes
      },
      shouldFilter () {
        return this.allowFilter && this.mdOptions[0] && this.searchTerm
      },
      filteredStaticOptions () {
        if (this.isPromise(this.mdOptions)) {
          return false
        }

        const firstItem = this.mdOptions[0]

        if (this.shouldFilter) {
          if (typeof firstItem === 'string') {
            return this.filterByString()
          } else if (typeof firstItem === 'object') {
            return this.filterByObject()
          }
        }

        return this.mdOptions
      },
      hasFilteredItems () {
        return this.filteredStaticOptions.length > 0 || this.filteredAsyncOptions.length > 0
      },
      hasScopedEmptySlot () {
        return this.mdEmptyText || this.$scopedSlots['md-autocomplete-empty']
      }
    },
    watch: {
      searchTerm (value, oldValue) {
        this.revertOnNoResult(value, oldValue)
      },
      mdOptions: {
        deep: true,
        immediate: true,
        handler () {
          if (this.isPromise(this.mdOptions)) {
            this.isPromisePending = true
            this.mdOptions.then(options => {
              this.filteredAsyncOptions = options
              this.isPromisePending = false
            })
          }
        }
      },

      value (val) {
        this.searchTerm = val
      },

      showMenu (val) {
        if (this.mdSkipFilterOnOpen) {
          this.allowFilter = false
        }
      }
    },
    methods: {
      getOptions () {
        if (this.isPromise(this.mdOptions)) {
          return this.filteredAsyncOptions
        }

        return this.filteredStaticOptions
      },
      isPromise (obj) {
        return isPromise(obj)
      },
      // eslint-disable-next-line complexity
      matchText (item, exact) {
        const target = item && item.toLowerCase()
        const search = this.searchTerm && this.searchTerm.toLowerCase()
        if (!target || !search) {
          return false
        }
        if (target === search) {
          return true
        }
        if (exact) {
          return false
        }
        if (this.mdFuzzySearch) {
          return fuzzy(search, target)
        }

        return target.includes(search)
      },
      filterByString () {
        return this.mdOptions.filter(item => this.matchText(item))
      },
      filterByObject () {
        return this.mdOptions.filter(item => {
          const values = Object.values(item)
          const valuesCount = values.length

          for (let i = 0; i <= valuesCount; i++) {
            if (typeof values[i] === 'string' && this.matchText(values[i])) {
              return true
            }
          }
        })
      },
      openOnFocus () {
        if (this.mdOpenOnFocus) {
          this.showOptions()
        }
      },
      onFocus () {
        this.cleanOnNoStrictMatch()
        this.openOnFocus()
      },
      onBlur () {
        this.cleanOnNoStrictMatch()
        this.hideOptions()
      },
      onInput (value) {
        this.$emit('input', value)

        if (!this.mdOpenOnFocus) {
          this.showOptions()
        }

        if (this.searchTerm.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
          this.$emit('md-changed', this.searchTerm)
        }
      },
      onKeyPress (e) {
        const canOpen = this.canOpenMenu(e)
        if (canOpen) {
          this.showOptions()
        }
        const deleteKeys = ['Delete', 'Backspace']
        if (this.isAlphaNumSymPressed(e.keyCode) || deleteKeys.includes(e.key)) {
          this.$nextTick(() => {
            this.allowFilter = true
          })
        }
      },
      isAlphaNumSymPressed (keyCode) {
        const openCodes = [
          226, 173, [186, 223], [169, 171], [160, 165], [96, 111], [48, 90]
        ]

        return openCodes.some(code => {
          if (typeof code === 'number') {
            return keyCode === code
          }
          return keyCode >= code[0] && keyCode <= code[1]
        })
      },
      canOpenOnBlank (key) {
        const openOnBlankFor = ['Enter']
        return openOnBlankFor.includes(key) && !this.searchTerm
      },
      canOpenMenu (e) {
        if (!this.showMenu || e) {
          const key = e.key
          const openAlways = ['ArrowDown', 'ArrowUp', 'Delete', 'Backspace']
          return openAlways.includes(key) ||
            this.canOpenOnBlank(key) ||
            (this.mdOpenOnInput && this.isAlphaNumSymPressed(e.keyCode))
        }
      },
      showOptions () {
        if (this.showMenu) {
          return false
        }

        this.showMenu = true
        this.$nextTick(() => {
          this.triggerPopover = true
          this.$emit('md-opened')
        })
      },
      hideOptions () {
        this.$nextTick(() => {
          this.triggerPopover = false
          this.$emit('md-closed')
        })
      },
      selectItem (item, $event) {
        const content = $event.target.textContent.trim()

        this.searchTerm = content
        this.$emit('input', item)
        this.$emit('md-selected', item)
        this.hideOptions()
      },
      deSelectItem () {
        this.searchTerm = ''
        this.$emit('input', '')
        this.$emit('md-selected', '')
        this.showMenu = false
        this.hideOptions()
      },
      isSelected (item) {
        if (typeof item === 'string') {
          return this.matchText(item, true)
        } else if (typeof item === 'object') {
          const values = Object.values(item)
          return values.some(part => {
            return this.isSelected(part)
          })
        }
      },
      revertOnNoResult (value, oldValue = '', force) {
        if (force || this.mdStrict) {
          value = value || this.searchTerm
          const hasMatch = this.hasFilteredItems
          if (value && !hasMatch) {
            this.$nextTick(() => {
              this.searchTerm = oldValue
            })
          }
        }
      },
      cleanOnNoStrictMatch (value, oldValue = '', force) {
        if (force || this.mdStrict) {
          value = value || this.searchTerm
          if (value) {
            const options = this.getOptions()
            const hasMatch = options.some(item => {
              return (value || '').toLowerCase() === (item || '').toLowerCase()
            })
            if (!hasMatch) {
              this.$nextTick(() => {
                this.searchTerm = oldValue
              })
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";
  @import "~components/MdElevation/mixins";
  @import "~components/MdLayout/mixins";

  .md-autocomplete {
    .md-menu {
      width: 100%;
      display: flex;
    }
  }

  .md-autocomplete-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

  .md-field.md-inline.md-autocomplete-box {
    @include md-elevation(2);
    padding-top: 2px;
    border-radius: 2px;

    &.md-focused {
      z-index: 120;
    }

    &:before,
    &:after {
      display: none;
    }

    .md-toolbar & {
      min-height: 40px;
      height: 40px;
      margin: 0;
      box-shadow: none;
    }

    .md-menu {
      align-items: center;
    }

    .md-input {
      padding-left: 16px;
    }

    &.md-focused label,
    label,
    .md-input-action {
      top: 50%;
      transform: translateY(-50%);
    }

    .md-input-action {
      right: 8px;
    }

    &.md-focused label,
    label {
      margin-top: 2px;
      left: 16px;
    }
  }

  .md-autocomplete-box-content:after {
    height: 6px;
    position: absolute;
    top: -6px;
    right: 0;
    left: 0;
    z-index: 120;
    border-bottom: 1px solid;
    content: "";
  }
</style>
