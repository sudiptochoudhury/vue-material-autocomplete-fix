<template>
  <div>
    <md-autocomplete2 v-model="selectedCountry" :md-options="countries">
      <label>Country</label>
    </md-autocomplete2>

    <md-autocomplete2 v-model="selectedEmployee" :md-options="employees" md-dense>
      <label>Employees</label>
    </md-autocomplete2>
  </div>
</template>

<script>
  export default {
    name: 'AutocompleteStatic',
    data: () => ({
      selectedCountry: null,
      selectedEmployee: null,
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
    })
  }
</script>
