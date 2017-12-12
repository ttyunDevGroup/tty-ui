import TTable from './src/table';
import TTreeTable from './src/tree-table'

TTable.install = function (Vue) {
  Vue.component(TTable.name, TAlert);
};


TTreeTable.install = function (Vue) {
  Vue.component(TTreeTable.name, TAlert);
};
export { TTable, TTreeTable };
