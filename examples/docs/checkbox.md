<script>
  module.exports = {
    data () {
      return {
        checkbox1: '',
        checkbox2: '',
        checkbox3: '',
        checkbox4: '',
        checkbox5: '',
        checkbox6: '',
        checkbox7: '',
        checkList: [],
        checkedCities1: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳'],
        roles: [
          { value: 1, label: '系统管理员' },
          { value: 2, label: '采购主管' },
          { value: 3, label: '采购专员' },
          { value: 4, label: '店长' },
          { value: 5, label: '销售经理' },
          { value: 6, label: '销售' },
          { value: 7, label: '财务经理' },
          { value: 8, label: '会计' }
        ],
        checkedRoles: [],
      }
    },
    methods: {
      open() {
        this.$alert('这是一条消息提示');
      }
    }
  };
</script>

# Checkbox 复选框
----
### 基础用法
单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

<div class="demo-block">
  <t-checkbox v-model="checkbox1">备选项</t-checkbox>
</div>

::: demo
```html
<div class="demo-block">
  <t-checkbox v-model="checkbox1">备选项</t-checkbox>
</div>

<script>
  export default {
    data () {
      return {
        checkbox1: ''
      }
    }
  }
</script>

```
:::

### 禁用状态
设置`disabled`属性即可。

<div class="demo-block">
  <t-checkbox v-model="checkbox1" disabled>备选项</t-checkbox>
</div>

::: demo
```html
<div class="demo-block">
  <t-checkbox v-model="checkbox1" disabled>备选项</t-checkbox>
</div>

<script>
  export default {
    data () {
      return {
        checkbox1: ''
      }
    }
  }
</script>

```
:::


### 多选框组
`checkbox-group`元素能把多个 checkbox 管理为一组，只需要在 Group 中使用`v-model`绑定`Array`类型的变量即可。 `t-checkbox` 的 `label`属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。`label`与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

<div class="demo-block">
  <t-checkbox-group v-model="checkList">
    <t-checkbox label="复选框 A"></t-checkbox>
    <t-checkbox label="复选框 B"></t-checkbox>
    <t-checkbox label="复选框 C"></t-checkbox>
    <t-checkbox label="禁用" disabled></t-checkbox>
    <t-checkbox label="选中且禁用" disabled></t-checkbox>
  </t-checkbox-group>
</div>

::: demo
```html
<div class="demo-block">
  <t-checkbox-group v-model="checkList">
    <t-checkbox label="复选框 A"></t-checkbox>
    <t-checkbox label="复选框 B"></t-checkbox>
    <t-checkbox label="复选框 C"></t-checkbox>
    <t-checkbox label="禁用" disabled></t-checkbox>
    <t-checkbox label="选中且禁用" disabled></t-checkbox>
  </t-checkbox-group>
</div>

<script>
  export default {
    data () {
      return {
        checkList: []
      }
    }
  }
</script>

```
:::



### 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

<div class="demo-block">
  <t-checkbox-group 
    v-model="checkedCities1"
    :min="1"
    :max="2">
    <t-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</t-checkbox>
  </t-checkbox-group>
</div>

::: demo
```html
<t-checkbox-group 
  v-model="checkedCities1"
  :min="1"
  :max="2">
  <t-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</t-checkbox>
</t-checkbox-group>

<script>
  export default {
    data () {
      return {
        checkedCities1: ['上海', '北京'],
        cities: ['上海', '北京', '广州', '深圳']
      }
    }
  }
</script>

```
:::

### 按钮样式

按钮样式的多选组合。
只需要把`type` 加上`button`即可


<div class="demo-block">
  <t-checkbox-group v-model="checkedRoles" type="button" tips="至少选择一种角色">
    <t-checkbox v-for="role in roles" :label="role.label" :key="role.value">{{role.label}}</t-checkbox>
  </t-checkbox-group>
</div>


::: demo
```html
<t-checkbox-group v-model="checkedRoles" type="button" tips="至少选择一种角色">
  <t-checkbox v-for="role in roles" :label="role.label" :key="role.value">{{role.label}}</t-checkbox>
</t-checkbox-group>

<script>
  export default {
    data () {
      return {
        roles: [
          { value: 1, label: '系统管理员' },
          { value: 2, label: '采购主管' },
          { value: 3, label: '采购专员' },
          { value: 4, label: '店长' },
          { value: 5, label: '销售经理' },
          { value: 6, label: '销售' },
          { value: 7, label: '财务经理' },
          { value: 8, label: '会计' }
        ],
        checkedRoles: [],
      }
    }
  }
</script>

```
:::


### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| true-label | 选中时的值   | string / number | — |     —    |
| false-label | 没有选中时的值   | string / number    |      —         |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| size  | Checkbox 的尺寸，仅在 border 为真时有效  | string  | medium / small / mini | — |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效   | string  | medium / small / mini  |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| min     | 可被勾选的 checkbox 的最小数量   | number    |       —        |     —    |
| max     | 可被勾选的 checkbox 的最大数量   | number    |       —        |     —    |
| text-color  | 按钮形式的 Checkbox 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Checkbox 激活时的填充色和边框色    | string   | — | #409EFF   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |
