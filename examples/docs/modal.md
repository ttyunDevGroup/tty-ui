<script>
  module.exports = {
    data () {
      return {
        show: false,
        show1: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
      }
    },
    methods: {
      open() {
        this.show = !this.show
      },
      open2() {
        this.show1 = !this.show1
      },
      open3() {
        this.show3 = !this.show3
      },
      open4() {
        this.show4 = !this.show4
      },
      open5() {
        this.show5 = !this.show5
      },
      open6() {
        this.show6 = !this.show6
      },
    }
  };
</script>

# Modal 模态弹出层
----
### 基础用法
从顶部出现，3 秒后自动消失。

<div class="demo-block">
  <t-button @click="open">打开Modal</t-button>
</div>
<t-modal v-model="show" title="demo modal">
  <p>This is a simple modal.</p>
</t-modal>

::: demo
```html

<t-button @click="open">打开Modal</t-button>
<t-modal v-model="show" title="demo modal">
  <p>This is a simple modal.</p>
</t-modal>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = !this.show
      }
    }
  };
</script>

```
:::


### 大尺寸
从顶部出现，3 秒后自动消失。

<div class="demo-block">
  <t-button @click="open2">打开大尺寸Modal</t-button>
</div>
<t-modal size="lg" v-model="show1" title="demo modal">
  <p>This is a simple modal.</p>
</t-modal>

::: demo
```html

<t-button @click="open">打开Modal</t-button>
<t-modal size="lg" v-model="show" title="demo modal">
  <p>This is a simple modal.</p>
</t-modal>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = !this.show
      }
    }
  };
</script>

```
:::


### 自定义头部和底部

<div class="demo-block">
  <t-button @click="open3">自定义标题和底部</t-button>
</div>
<t-modal v-model="show3" title="demo modal自定义头部和底部">
  <div slot="title">自定义头部标题</div>
  <p>This is a simple modal.自定义头部和底部</p>
  <div slot="footer">自定义底部</div>
</t-modal>

::: demo
```html

<t-button @click="open">打开Modal</t-button>
<t-modal v-model="show" title="demo modal自定义头部和底部">
  <div slot="title">自定义头部标题</div>
  <p>This is a simple modal.自定义头部和底部</p>
  <div slot="footer">自定义底部</div>
</t-modal>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = !this.show
      }
    }
  };
</script>

```
:::

### 位置设置

<div class="demo-block">
  <t-button @click="open4">顶部</t-button>
  <t-button @click="open5">居中</t-button>
</div>
<t-modal vertical-align="top" v-model="show4" title="demo modal顶部">
  <p>This is a simple modal.顶部</p>
</t-modal>
<t-modal  vertical-align="middle" v-model="show5" title="demo modal顶部">
  <p>This is a simple modal.居中</p>
</t-modal>


::: demo
```html

<t-button @click="open">打开Modal</t-button>
<t-modal v-model="show" title="demo modal自定义头部和底部">
  <div slot="title">自定义头部标题</div>
  <p>This is a simple modal.自定义头部和底部</p>
  <div slot="footer">自定义底部</div>
</t-modal>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.show = !this.show
      }
    }
  };
</script>

```
:::

### 单独引用

单独引入 `TAlert`：

```javascript
import { TModal } from 'tty-ui';

````

### 具体细节设置，请阅读下面的 api


### Props
| 参数  | 类型  | 默认值  | 必需  | 说明  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| v-model  | Boolean  | false  | 是  | 显示/隐藏模态框  |
| title  | String  | -  | 否  | 模态框标题（如果有title插槽会被覆盖）  |
| width  | String  | -  | 否  |  自定义模态框的宽度，例如 `500px`、`80%` |
| size  | String  | -  | 否  |  设置模态框尺寸。支持 `lg`或`sm` |
| backdrop  | Boolean  | false  | 否  | 设置点击模态框区域外是否隐藏模块框  |
| header  | Boolean  | true  | 否  | 是否显示头部  |
| footer  | Boolean  | true  | 否  | 是否显示尾部  |
| cancel-text  | String  | 取消  | 否  | 覆盖取消按钮显示文本  |
| ok-text  | String  | 确定  | 否  | 覆盖确定按钮显示文本  |
| transition-duration  | Number  | 150  | 否  | 动画持续时间，设置0关闭动画  |
| auto-focus  | Boolean  | false  | 否  | 自动聚焦到设置了 data-action=`"auto-focus"` 属性的按钮，默认是确定按钮  |
| keyboard  | Boolean  | false  | 否  | 按esc键可以关闭模态框  |
| vertical-align  | String  | -  | 否  | 设置垂直方向位置 'top','middle','bottom'  |
| show-confirm-button  | Boolean  | true | 否  | 设置是否显示确认按钮  |
| show-cancel-button  | Boolean  | true | 否  | 设置是否显示取消按钮  |

### Slots
| 名称  | 说明  |
| ------------ | ------------ |
| title  | 替代默认title  |
| default  | 替代默认body  |
| header  | 替代默认header。注：会同时替换title插槽的内容  |
| footer  | 替代默认footer  |

### Events
| 名称  | 参数  | 说明  |
| ------------ | ------------ | ------------ |
| cancel-click | - | 点取消按钮的回掉操作  |
| ok-click | - | 点确定按钮的回掉操作  |
| show  | -  | 模态框显示后触发  |
| hide  | msg  | 模态框隐藏时触发，msg: `''`或`ok`或`cancel`  |
