import TModal from './src/modal'

/* istanbul ignore next */
TModal.install = function (Vue) {
  Vue.component(TModal.name, TModal)
}

export default TModal
