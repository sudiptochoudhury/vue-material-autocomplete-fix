<template>
  <md-popover :md-settings="popperSettings" :md-active="shouldRender">
    <transition name="md-menu-content" :css="didMount" v-if="shouldRender" v-on="$listeners">
      <div
        :class="[menuClasses, mdContentClass, $mdActiveTheme]"
        :style="menuStyles"
        ref="menu">
        <div class="md-menu-content-container md-scrollbar" :class="$mdActiveTheme" ref="container">
          <md-list :class="listClasses" v-bind="filteredAttrs" ref="list">
            <slot />
          </md-list>
        </div>
      </div>
    </transition>
  </md-popover>
</template>

<script>
  import MdComponent from 'core/MdComponent'
  import MdObserveEvent from 'core/utils/MdObserveEvent'
  import MdResizeObserver from 'core/utils/MdResizeObserver'
  import MdPopover from 'components/MdPopover/MdPopover'
  import MdFocusTrap from 'components/MdFocusTrap/MdFocusTrap'
  import MdList from 'components/MdList/MdList'
  import MdContains from 'core/utils/MdContains'

  export default new MdComponent({
    name: 'MdMenuContent2',
    components: {
      MdPopover,
      MdFocusTrap,
      MdList
    },
    props: {
      mdListClass: [String, Boolean],
      mdContentClass: [String, Boolean]
    },
    inject: ['MdMenu'],
    data: () => ({
      highlightIndex: 0,
      didMount: false,
      highlightItems: [],
      popperSettings: null,
      menuStyles: ''
    }),
    computed: {
      filteredAttrs () {
        const attrs = this.$attrs
        delete attrs.id
        return attrs
      },
      highlightedItem () {
        return this.highlightItems[this.highlightIndex]
      },
      shouldRender () {
        return this.MdMenu.active
      },
      menuClasses () {
        const prefix = 'md-menu-content-'

        return {
          [prefix + this.MdMenu.direction]: true,
          [prefix + this.MdMenu.size]: true,
          'md-menu-content': this.didMount,
          'md-shallow': !this.didMount
        }
      },
      listClasses () {
        return {
          'md-dense': this.MdMenu.dense,
          ...this.mdListClass
        }
      }
    },
    watch: {
      shouldRender (shouldRender) {
        if (shouldRender) {
          this.setPopperSettings()
          setTimeout(() => {
            this.setInitialHighlightIndex()
            this.createClickEventObserver()
            this.createResizeObserver()
            this.createKeydownListener()
          }, 0)
        }
      }
    },
    methods: {
      setPopperSettings () {
        const { direction, alignTrigger } = this.MdMenu

        let { offsetX, offsetY } = this.getOffsets()

        if (!this.hasCustomOffsets()) {
          if (this.MdMenu.instance.$el && this.MdMenu.instance.$el.offsetHeight) {
            offsetY = -this.MdMenu.instance.$el.offsetHeight - 11
          }

          if (direction.includes('start')) {
            offsetX = -8
          } else if (direction.includes('end')) {
            offsetX = 8
          }
        }

        this.popperSettings = {
          placement: direction,
          modifiers: {
            keepTogether: {
              enabled: true
            },
            flip: {
              enabled: false
            },
            offset: {
              offset: `${offsetX}, ${offsetY}`
            }
          }
        }
      },
      setInitialHighlightIndex () {
        this.setHighlightItems()
        this.highlightItems.forEach((item, index) => {
          if (item.highlighted) {
            this.highlightIndex = index
          }
        })
        this.setHighlight()
      },
      getListComponents () {
        const list = this.$refs.list || {}
        return list.$children || []
      },
      getAvailableItems () {
        return this.getListComponents().filter(item => !item.disabled && !item.isDefaultListItem)
      },
      getAvailableItemsCount () {
        return this.getAvailableItems().length
      },
      setHighlightItems () {
        this.highlightItems = this.getAvailableItems()
      },
      setHighlight (direction = 0) {
        let nextIndex = 0
        this.setHighlightItems()
        const count = this.getAvailableItemsCount()
        if (!count) {
          nextIndex = null
        }
        if (count) {
          const index = this.highlightIndex
          nextIndex = Math.abs((index + count) + direction) % count
          this.highlightIndex = nextIndex
        }
        if (!direction) {
          if (count && nextIndex >= count) {
            nextIndex = 0
          }
        }
        this.highlightIndex = nextIndex
        this.clearAllHighlights()
        this.setItemHighlight()
      },
      clearAllHighlights () {
        this.highlightItems.forEach(item => {
          item.highlighted = false
          //item.parentNode.__vue__.highlighted = false
        })
      },
      setItemHighlight () {
        if (this.highlightedItem) {
          this.highlightedItem.highlighted = true
          //this.highlightedItem.parentNode.__vue__.highlighted = true
          if (this.$parent.$parent.setOffsets) {
            this.$parent.$parent.setOffsets(this.highlightedItem.$el)
          }
        }
      },
      setSelection () {
        if (this.getAvailableItemsCount() && this.highlightedItem) {
          this.highlightedItem.$el.click()
        } else {
          this.$emit('click-blank')
        }
      },
      onEsc () {
        this.MdMenu.active = false
        this.destroyKeyDownListener()
      },
      getOffsets () {
        const relativePosition = this.getBodyPosition()

        const offsetX = this.MdMenu.offsetX || 0
        const offsetY = this.MdMenu.offsetY || 0

        return {
          offsetX: offsetX - relativePosition.x,
          offsetY: offsetY - relativePosition.y
        }
      },
      hasCustomOffsets () {
        const { offsetX, offsetY, alignTrigger } = this.MdMenu

        return Boolean(alignTrigger || offsetY || offsetX)
      },
      isMenu ({ target }) {
        return this.MdMenu.$el ? MdContains(this.MdMenu.$el, target) : false
      },
      isMenuContentEl ({ target }) {
        return this.$refs.menu ? MdContains(this.$refs.menu, target) : false
      },
      createClickEventObserver () {
        if (document) {
          this.MdMenu.bodyClickObserver = new MdObserveEvent(document.body, 'click', $event => {
            $event.stopPropagation()
            if (!this.isMenu($event) && (this.MdMenu.closeOnClick || !this.isMenuContentEl($event))) {
              this.MdMenu.active = false
              this.MdMenu.bodyClickObserver.destroy()
              this.MdMenu.windowResizeObserver.destroy()
              this.destroyKeyDownListener()
            }
          })
        }
      },
      createKeydownListener () {
        window.addEventListener('keyup', this.keyUpListener)
        window.addEventListener('keydown', this.keyNavigation)
      },
      destroyKeyDownListener () {
        window.removeEventListener('keyup', this.keyUpListener)
        window.removeEventListener('keydown', this.keyNavigation)
      },
      keyUpListener (event) {
        if (!this.MdMenu.active) {
          return
        }
        const ignore = ['ArrowUp', 'ArrowDown', 'Enter', 'Space', 'Tab']
        if (!ignore.includes(event.key)) {
          this.setHighlight()
        }
      },
      keyNavigation (event) {
        if (!this.MdMenu.active) {
          return
        }
        const key = event.key
        const selectOn = ['Enter', 'Tab', 'Space']
        if (selectOn.includes(key)) {
          return this.setSelection()
        }

        switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          this.setHighlight(-1)
          break

        case 'ArrowDown':
          event.preventDefault()
          this.setHighlight(1)
          break

        case 'Escape':
          this.onEsc()
        }
      },
      createResizeObserver () {
        this.MdMenu.windowResizeObserver = new MdResizeObserver(window, this.setStyles)
      },
      setupWatchers () {
        this.$watch('MdMenu.direction', this.setPopperSettings)
        this.$watch('MdMenu.alignTrigger', this.setPopperSettings)
        this.$watch('MdMenu.offsetX', this.setPopperSettings)
        this.$watch('MdMenu.offsetY', this.setPopperSettings)
      },
      setStyles () {
        if (this.MdMenu.fullWidth) {
          this.menuStyles = `
            width: ${this.MdMenu.instance.$el.offsetWidth}px;
            max-width: ${this.MdMenu.instance.$el.offsetWidth}px
          `
        }
      },
      getBodyPosition () {
        const body = document.body
        const { top, left } = body.getBoundingClientRect()

        const scrollLeft = window.pageXOffset !== undefined ? window.pageXOffset : body.scrollLeft
        const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : body.scrollTop

        return { x: left + scrollLeft, y: top + scrollTop }
      }
    },
    mounted () {
      this.$nextTick().then(() => {
        this.setHighlightItems()
        this.setupWatchers()
        this.setStyles()
        this.didMount = true
      })
    },
    beforeDestroy () {
      if (this.MdMenu.bodyClickObserver) {
        this.MdMenu.bodyClickObserver.destroy()
      }

      if (this.MdMenu.windowResizeObserver) {
        this.MdMenu.windowResizeObserver.destroy()
      }
      this.destroyKeyDownListener()
    }
  })
</script>

<style lang="scss">
  @import "~components/MdAnimation/variables";
  @import "~components/MdElevation/mixins";
  @import "~components/MdLayout/mixins";

  $md-menu-base-width: 56px;

  .md-menu-content {
    @include md-elevation(8);
    min-width: $md-menu-base-width * 2;
    max-width: $md-menu-base-width * 5;
    max-height: 35vh;
    display: flex;
    flex-direction: row;
    position: absolute;
    z-index: 60;
    border-radius: 2px;
    transition: transform .2s $md-transition-stand-timing,
                opacity .3s $md-transition-stand-timing;
    will-change: opacity, transform, top, left !important;

    &.md-shallow {
      position: fixed !important;
      top: -9999em !important;
      left: -9999em !important;
      pointer-events: none;
    }

    &.md-menu-content-enter-active {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    &.md-menu-content-leave-active {
      transition: opacity .4s $md-transition-default-timing;
      opacity: 0;
    }

    &.md-menu-content-enter {
      &.md-menu-content-top-start {
        transform-origin: bottom left;
        transform: translate3d(0, 8px, 0) scaleY(.95);
      }

      &.md-menu-content-top-end {
        transform-origin: bottom right;
        transform: translate3d(0, 8px, 0) scaleY(.95);
      }

      &.md-menu-content-right-start {
        transform-origin: left top;
        transform: translate3d(0, -8px, 0) scaleY(.95);
      }

      &.md-menu-content-right-end {
        transform-origin: left bottom;
        transform: translate3d(0, 8px, 0) scaleY(.95);
      }

      &.md-menu-content-bottom-start {
        transform-origin: top left;
        transform: translate3d(0, -8px, 0) scaleY(.95);
      }

      &.md-menu-content-bottom-end {
        transform-origin: top right;
        transform: translate3d(0, -8px, 0) scaleY(.95);
      }

      &.md-menu-content-left-start {
        transform-origin: right top;
        transform: translate3d(0, -8px, 0) scaleY(.95);
      }

      &.md-menu-content-left-end {
        transform-origin: right bottom;
        transform: translate3d(0, 8px, 0) scaleY(.95);
      }

      .md-list {
        opacity: 0;
      }
    }

    &.md-menu-content-medium {
      min-width: $md-menu-base-width * 3;
    }

    &.md-menu-content-big {
      min-width: $md-menu-base-width * 4;
    }

    &.md-menu-content-huge {
      min-width: $md-menu-base-width * 5;
    }
  }

  .md-menu-content-container {
    flex: 1;
    overflow: auto;

    .md-list {
      transition: opacity .3s $md-transition-stand-timing;
      will-change: opacity;
      font-family: 'Roboto', sans-serif;
      text-transform: none;
      white-space: nowrap;

      .md-list-item-container {
        height: 100%;
      }

      @include md-layout-small {
        font-size: 14px;
      }
    }
  }
</style>
