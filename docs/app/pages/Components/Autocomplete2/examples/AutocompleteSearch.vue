<template>
  <div>
    <strong>Fuzzy Search:</strong>
    <md-autocomplete2 v-model="selectedEmployee" :md-options="employees">
      <label>Manager</label>

      <template slot="md-autocomplete-item" slot-scope="{ item, term }">
        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
      </template>

      <template slot="md-autocomplete-empty" slot-scope="{ term }">
        No employees matching "{{ term }}" were found. <a @click="noop()">Create a new</a> one!
      </template>
    </md-autocomplete2>

    <strong>Normal Search:</strong>
    <md-autocomplete2 v-model="selectedCountry" :md-options="countries" :md-fuzzy-search="false">
      <label>Country</label>

      <template slot="md-autocomplete-item" slot-scope="{ item, term }">
        <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
      </template>

      <template slot="md-autocomplete-empty" slot-scope="{ term }">
        No countries matching "{{ term }}" were found. <a @click="noop()">Create a new</a> one!
      </template>
    </md-autocomplete2>
  </div>
</template>

<script>
  export default {
    name: 'AutocompleteSearch',
    data: () => ({
      selectedEmployee: null,
      selectedCountry: null,
      countries: [
        'Algeria',
        'Argentina',
        'Brazil',
        'Canada',
        'Italy',
        'Japan',
        'United Kingdom',
        'United States'
      ],
      employees: [
        'Jim Halpert',
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Angela Martin',
        'Kelly Kapoor',
        'Ryan Howard',
        'Kevin Malone',
        'Creed Bratton',
        'Oscar Nunez',
        'Toby Flenderson',
        'Stanley Hudson',
        'Meredith Palmer',
        'Phyllis Lapin-Vance'
      ]
    }),
    methods: {
      noop () {
        window.alert('noop')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-autocomplete + strong {
    margin-top: 36px;
    display: block;
  }
</style>
