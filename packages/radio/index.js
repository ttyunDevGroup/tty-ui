import TRadio from './src/radio'
import TRadioGroup from './src/radio-group'


TRadio.install = function (Vue) {
  Vue.component(TRadio.name, TRadio);
};

TRadioGroup.install = function (Vue) {
  Vue.component(TRadioGroup.name, TRadioGroup);
};

export {
  TRadio,
  TRadioGroup
}
