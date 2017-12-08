/**
 * @author naice
 * Date: 17/11/20
 */
import Col from './src/col';

/* istanbul ignore next */
Col.install = function (Vue) {
  Vue.component(Col.name, Col);
};

export default Col;
