/**
 * @author naice
 * Date: 17/11/9
 */
import TButton from './button/index.js';
import TRow from './row/index'
import TCol from './col/index'
import { TRadio, TRadioGroup } from './radio/index'
import { TCheckbox, TCheckboxGroup } from './checkbox/index'
import { TForm, TFormItem } from './form/index'
import { TAlert, Alert } from './alert/index'
import TModal from './modal/index'
import TInput from './input/index'
import TTree from './tree/index'

const components = [
  TButton,
  TRow,
  TCol,
  TRadio,
  TRadioGroup,
  TFormItem,
  TForm,
  TAlert,
  TModal,
  TInput,
  TCheckbox,
  TCheckboxGroup,
  TTree
]



const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))

  Vue.prototype.$alert = Alert;
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  TButton,
  TRow,
  TCol,
  TRadio,
  TRadioGroup,
  TAlert,
  TModal,
  TInput,
  TFormItem,
  TForm,
  TCheckbox,
  TCheckboxGroup,
  TTree
}
