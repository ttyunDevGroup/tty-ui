import TCheckbox from './src/checkbox'
import TCheckboxGroup from './src/checkbox-group'


TCheckbox.install = function (Vue) {
  Vue.component(TCheckbox.name, TCheckbox);
};

TCheckboxGroup.install = function (Vue) {
  Vue.component(TCheckboxGroup.name, TCheckboxGroup);
};

export {
  TCheckbox,
  TCheckboxGroup
}
