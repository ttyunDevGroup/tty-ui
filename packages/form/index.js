import TForm from './src/form'
import TFormItem from './src/form-item'

TForm.install = function (Vue) {
  Vue.component(TForm.name, TForm);
};

TFormItem.install = function (Vue) {
  Vue.component(TFormItem.name, TFormItem);
};


export {
  TForm,
  TFormItem
}
