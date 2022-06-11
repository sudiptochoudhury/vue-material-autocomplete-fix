import material from 'vue-material/material'
import MdAutocomplete from './MdAutocomplete'
import menu from './MdMenu'

export default Vue => {
  material(Vue)
  Vue.component(MdAutocomplete.name, MdAutocomplete)
  menu(Vue)
}
