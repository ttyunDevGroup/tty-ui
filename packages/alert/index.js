import TAlert from './src/alert.vue';
import Alert from './src/alert.js'

TAlert.install = function (Vue) {
  Vue.component(TAlert.name, TAlert);
};
export { TAlert, Alert };
