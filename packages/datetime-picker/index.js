import DatePicker from './picker/date-picker'
import TimePicker from './picker/time-picker'
import TimeSelect from './picker/time-select'


DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker);
};
TimePicker.install = function (Vue) {
  Vue.component(TimePicker.name, TimePicker);
};
TimeSelect.install = function (Vue) {
  Vue.component(TimeSelect.name, TimeSelect);
};

export {
  DatePicker as TDatePicker,
  TimePicker as TTimePicker,
  TimeSelect as TTimeSelect
}
