<script>
  module.exports = {
    data () {
      return {
        show: false,
        switchValue1: true,
        switchValue2: true,
        switchValue3: true,
      }
    },
    methods: {
    }
  };
</script>

# Switch 消息提示
----
### 基础用法
表示两种相互对立的状态间的切换，多用于触发「开/关」。
绑定v-model到一个Boolean类型的变量。可以使用active-color属性与inactive-color属性来设置开关的背景色。

<div class="demo-block">
  <t-switch v-model="switchValue1" active-color="#00a53c" inactive-color="#ccc"></t-switch>
</div>

::: demo
```html
<div class="demo-block">
  <t-switch v-model="switchValue1" active-color="#00a53c" inactive-color="#ccc"></t-switch>
</div>


<script>
  export default = {
    data () {
      return {
        switchValue1: true
      }
    },
    methods: {
    }
  };
</script>

```
:::


### 文字描述
使用show-text控制是否显示文字描述,使用active-text属性与inactive-text属性来设置开关的文字描述。

<div class="demo-block">
  <t-switch v-model="switchValue2" 
            active-color="#13ce66" 
            inactive-color="#ff4949" 
            :show-text="true" 
            active-text="开" 
            inactive-text="关"></t-switch>
</div>

::: demo
```html
<div class="demo-block">
  <t-switch v-model="switchValue2" 
            active-color="#13ce66" 
            inactive-color="#ff4949" 
            :show-text="true" 
            active-text="开" 
            inactive-text="关"></t-switch>
</div>


<script>
  export default = {
    data () {
      return {
        switchValue2: true
      }
    }
  };
</script>

```
:::


### 禁用状态
设置disabled属性，接受一个Boolean，设置true即可禁用。

<div class="demo-block">
  <t-switch v-model="switchValue3" disabled></t-switch>
</div>

::: demo
```html
<div class="demo-block">
  <t-switch v-model="switchValue3" disabled></t-switch>
</div>


<script>
  export default = {
    data () {
      return {
        switchValue3: true
      }
    }
  };
</script>

```
:::


### 单独引用

```javascript
import { TSwitch } from 'tty-ui';

````


### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用    | boolean   | — | false   |
| width  | switch 的宽度（像素）    | number   | — | 40 |
| active-icon-class  | switch 打开时所显示图标的类名，设置此项会忽略 `active-text`    | string   | — | — |
| inactive-icon-class  | switch 关闭时所显示图标的类名，设置此项会忽略 `inactive-text`    | string   | — | — |
| active-text  | switch 打开时的文字描述    | string   | — | — |
| inactive-text  | switch 关闭时的文字描述    | string   | — | — |
| active-value  | switch 打开时的值    | boolean / string / number | — | true |
| inactive-value  | switch 关闭时的值    | boolean / string / number | — | false |
| active-color  | switch 打开时的背景色    | string   | — | #409EFF |
| inactive-color  | switch 关闭时的背景色    | string   | — | #C0CCDA |
| name  | switch 对应的 name 属性    | string   | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | switch 状态发生变化时的回调函数    | 新状态的值 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 Switch 获取焦点 | - |