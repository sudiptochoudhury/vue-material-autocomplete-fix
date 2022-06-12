# vue-material-autocomplete-fix

---

This is an extended version of [vue-material]("https://github.com/vuematerial/).
Everything is same as is from `vue-material`.

## Component: `MdAutocomplete2`

This package adds a new component `MdAutocomplete2` and extended version of
`MdAutocomplete` with a number of fixes and new features.


### New features and fixes

#### Better navigation and selection using keyboard

* Fix keyboard `ArrowUp` and `ArrowDown` navigation.
* By default, the the top-most item of the suggested results is highlighted.
* On pressing `Enter` or `Tab`, the highlighted items is selected and populated in the input field. The suggestion results popup hides.
* While the suggestion popup is not showing, it can be opened 
  * By pressing `ArrowUp` and `ArrowDown` keys, while the input field is in focus.
  * By pressing `Enter` while the input field is in focus, provided that the input field is empty.
  * By starting typing in the empty input field (can be disabled setting `mdOpenOnInput` prop to `false`) 
* In case the suggestion popup has no result or is empty, a default empty message "No data available" is shown (without defining `md-autocomplete-empty` slot). 
The value can be modified using `mdEmptyText` prop.

#### Strict Mode

* In case the suggestion popup has no result or is empty, but the input field has a value in it, which may not be the desired input value, 
it will be cleaned pressing `Enter` or `Tab`. This mode can be disabled setting `mdCleanEmptyOnEnter` prop to `false`.

#### Show all results at first
* By default, when the suggestion popup opens and there is already a value in the input field, the suggestion result for once, does not  
filter based on the input field's value. It shows all the values. The filtering starts in case the input value changes. 
This can be disabled using `mdSkipFilterOnOpen` prop to `false`.


### New props

| Name                  | Type    | Default             | Description                                                                                                                                                      |
|-----------------------|---------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mdEmptyText`         | String  | "No data available" | Shows this message as default when there is no/empty suggested result.                                                                                           |
| `mdCleanEmptyOnEnter` | Boolean | true                | When the suggested result is empty, and Enter is pressed, the input field is cleaned. This can be disabled setting the value to `false`.                         |
| `mdOpenOnInput`       | Boolean | true                | This adds additional feature along with `mdOpenOnFocus`. It allows to open the suggested results popup, in case it's closed when typing in the input box starts. |
| `mdSkipFilterOnOpen`  | Boolean | true                | This allows to show all the suggested items in the popup when the suggested popup is open again.                                                                 |


## Installation and Usage

Install Vue Material through npm or yarn

``` bash
npm install vue-material-autocomplete-fix --save
yarn add vue-material-autocomplete-fix
```

<small>* Others package managers like JSPM and Bower are not supported yet.</small>

Import or require Vue and Vue Material in your code:

``` javascript
import Vue from 'vue'
import VueMaterial from 'vue-material-autocomplete-fix'
import 'vue-material-autocomplete-fix/dist/vue-material.min.css'

Vue.use(VueMaterial)
```

Or use individual components:

``` javascript
import Vue from 'vue'
import { MdButton, MdContent, MdTabs } from 'vue-material-autocomplete-fix/dist/components'
import 'vue-material-autocomplete-fix/dist/vue-material.min.css'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
```

## License

MIT
