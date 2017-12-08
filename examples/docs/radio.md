
<style>

</style>
<script>
export default {
  data () {
    return {
      radio1: '',
      radio2: '男',
      radio3: ''
    }
  },
  methods: {
    hello() {
      alert('Hello World!');
    }
  }
}
</script>
# Radio 单选
----
### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。
用`t-radio`

<div class="demo-block">
  <div>
    <t-radio>默认单选</t-radio>
  </div>
  <br/>
  <div class="m-10">
    <t-radio v-model="radio1" label="男">男</t-radio>
    <t-radio v-model="radio1" label="女">女</t-radio>
    <p>{{radio1}}</p>
  </div>
</div>

::: demo
```html

<div>
    <t-radio>默认按钮</t-radio>
  </div>
  <br/>
  <div class="m-10">
    <t-radio v-model="radio1" label="男">男</t-radio>
    <t-radio v-model="radio1" label="女">女</t-radio>
  </div>

```
:::


### 禁用状态
用`disabled`属性来设置组件的禁用状态

<div class="demo-block">
  <t-radio disabled v-model="radio2" label="禁用">备选项</t-radio>
  <t-radio disabled v-model="radio2" label="选中且禁用">备选项</t-radio>
</div>

::: demo
```html
<div class="m-10">
  <t-radio disabled v-model="radio2" label="1">备选项</t-radio>
  <t-radio disabled v-model="radio2" label="2">备选项</t-radio>
</div>
```
:::


### 单选框组
适用于在多个互斥的选项中选择的场景

<div class="demo-block">
  <t-radio-group v-model="radio3">
    <t-radio :label="2">魅族</t-radio>
    <t-radio :label="3">华为</t-radio>
    <t-radio :label="4">小米</t-radio>
  </t-radio-group>
</div>

::: demo
```html
<div class="m-10">
  <t-radio-group v-model="radio3">
    <t-radio :label="3">备选项</t-radio>
    <t-radio :label="6">备选项</t-radio>
    <t-radio :label="9">备选项</t-radio>
  </t-radio-group>
</div>
```
:::



### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string / number / boolean  |   -         |    —     |
| disabled     | 是否禁用   | boolean    |   - |     false    |
| border     | 是否显示边框   | 是否显示边框    | — | false   |
| width  | 固定宽度 | string   |  —  |  —  |


### Radio Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效   | string  | medium / small / mini |    —     |
| disabled  | 是否禁用    | boolean   | — | false   |
| text-color  | 按钮形式的 Radio 激活时的文本颜色    | string   | — | #ffffff   |
| fill  | 按钮形式的 Radio 激活时的填充色和边框色    | string   | — | #409EFF   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

### Radio-button Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value  | string / number  |        —       |     —    |
| disabled  | 是否禁用    | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
