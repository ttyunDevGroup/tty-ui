<script>
  module.exports = {
    data () {
      return {
        msg: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        textarea: ''
      }
    },
    methods: {
      open() {
        this.$alert('这是一条消息提示');
      }
    }
  };
</script>

# Input 输入框
----
### 基础用法
通过鼠标或键盘输入字符

<div class="demo-block">
  <t-input v-model="msg"></t-input>
</div>

::: demo
```html
<div class="demo-block">
  <t-input v-model="msg"></t-input>
</div>

<script>
  export default {
    data () {
      return {
        msg: ''
      }
    }
  };
</script>

```
:::


### 禁用状态
通过 `disabled` 属性指定是否禁用 input 组件

<div class="demo-block">
  <t-input v-model="input1" size="sm" :disabled="true"></t-input>
</div>

::: demo
```html
<div class="demo-block">
  <t-input v-model="input1" size="sm" :disabled="true"></t-input>
</div>

<script>
  export default {
    data() {
      return {
        msg: ''
      }
    }
  }
</script>

```
:::


### 文本域
用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。

<div class="demo-block">
  <t-input
    type="textarea"
    :rows="2"
    placeholder="请输入内容"
    v-model="input2"></t-input>
</div>

::: demo
```html
<div class="demo-block">
  <t-input
    type="textarea"
    :rows="2"
    placeholder="请输入内容"
    v-model="textarea"></t-input>
</div>

<script>
  export default {
    data () {
      return {
        textarea: ''
      }
    }
  }
</script>

```
:::


### 复合型输入框
可前置或后置元素，一般为标签或按钮

<div class="demo-block">  
  <t-input placeholder="请输入内容" v-model="input3">
    <template slot="prepend">Http://</template>
  </t-input>
  <br/>
  <br/>
  <t-input placeholder="请输入内容" v-model="input4">
    <template slot="append">.com</template>
  </t-input>
</div>

::: demo
```html
<div class="demo-block">
  <t-input placeholder="请输入内容" v-model="msg">
    <template slot="prepend">Http://</template>
  </t-input>
  <t-input placeholder="请输入内容" v-model="msg">
    <template slot="append">.com</template>
  </t-input>
</div>

<script>
  export default {
    data() {
      return {
        msg: ''
      }
    }
  }
</script>

```
:::


### 尺寸
 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 lg、sm尺寸。
 
<div class="demo-block">
  <t-input v-model="input5" size="sm"></t-input>
  <br/>
  <t-input v-model="input6" size="lg"></t-input>
  <br/>
  <t-input v-model="input7"></t-input>
</div>

::: demo
```html
<div class="demo-block">
  <t-input v-model="msg" size="sm"></t-input>
  <t-input v-model="msg" size="lg"></t-input>
  <t-input v-model="msg"></t-input>
</div>

<script>
  export default {
    data() {
      return {
        msg: ''
      }
    }
  }
</script>

```
:::


### Input Attributes

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type         | 类型   | string  | text / textarea | text |
| value         | 绑定值           | string / number  | — | — |
| maxlength     | 最大输入长度      | number          |  —  | — |
| minlength     | 最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | lg / sm / ''  | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | — | — | — |
| min | 原生属性，设置最小值 | — | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性 | string | — | — |
| label | 输入框关联的label文字 | string | — | — |

### Input slots
| name | 说明 |
|------|--------|
| prepend | 输入框前置内容，只对 `type="text"` 有效 |
| append | 输入框后置内容，只对 `type="text"` 有效 |

### Input Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
| change | 在 Input 值改变时触发 | (value: string \| number) |

### Input Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |