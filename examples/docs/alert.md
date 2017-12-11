<script>
  module.exports = {
    data () {
      return {
        show: false
      }
    },
    methods: {
      open() {
        this.$alert('这是一条消息提示');
      },

      open2() {
        this.$alert({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$alert({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$alert({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'danger'
        });
      },

      open5() {
        this.$alert({
          type: 'success',
          message: '恭喜你，打开一个提示框',
          duration: 3000,
          closable: false
        });
      },

      open6() {
        this.$alert({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open7() {
        this.$alert({
          showClose: true,
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open8() {
        this.$alert({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'danger'
        });
      },

      openCenter() {
        this.$alert({
          message: '居中的文字',
          center: true
        });
      },

      openHTML() {
        this.$alert({
          dangerouslyUseHTMLString: true,
          message: '<strong>这是 <i>HTML</i> 片段</strong>'
        });
      }
    }
  };
</script>

# Alert 消息提示
----
### 基础用法
从顶部出现，3 秒后自动消失。

<div class="demo-block">
  <t-button :plain="true" @click="open">打开消息提示</t-button>
  <t-button :plain="true" @click="open2">打开消息提示</t-button>
</div>

::: demo
```html
<div class="demo-block">
  <t-button :plain="true" @click="open">打开消息提示</t-button>
  <t-button :plain="true" @click="open2">打开消息提示</t-button>
</div>

<script>
  export default {
    methods: {
      open() {
        this.$alert('这是一条消息提示');
      },

      open2() {
        this.$alert({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
    }
  }
</script>

```
:::
### 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。
当需要自定义更多属性时，Alert也可以接收一个对象为参数。比如，设置`type`字段可以定义不同的状态，默认为`info`。此时正文内容以`message`的值传入。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入`type`字段的情况下像`open4`那样直接调用。

<div class="demo-block">
  <t-button :plain="true" @click="open2">成功</t-button>
  <t-button :plain="true" @click="open3">警告</t-button>
  <t-button :plain="true" @click="open">消息</t-button>
  <t-button :plain="true" @click="open4">错误</t-button>
</div>

::: demo
```html

<div>
  <t-button :plain="true" @click="open2">成功</t-button>
  <t-button :plain="true" @click="open3">警告</t-button>
  <t-button :plain="true" @click="open">消息</t-button>
  <t-button :plain="true" @click="open8">错误</t-button>
</div>

<script>
  export default {
    methods: {
      open() {
        this.$alert('这是一条消息提示');
      },

      open2() {
        this.$alert({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
      open3() {
        this.$alert({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
      open4() {
        this.$alert({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'danger'
        });
      }
    }
  }
</script>


```
:::



### 可关闭

可以添加关闭按钮。

默认的 Alert 是可以被人工关闭的，设置`0`为不会被自动关闭，默认为 3000 毫秒。



### 以组件的形式使用

Alert组件是可以用组件的形式使用的

<div class="demo-block">
  <div>
    <t-button type="button" @click="show=!show">组件使用方式</t-button>
    <t-alert type="warning" :closable="true" :show="show">组件使用方式,警告框</t-alert>
  </div>
</div>

::: demo
```html
<div class="demo-block">
  <div>
    <t-button type="button" @click="show=!show">组件使用方式</t-button>
    <t-alert type="warning" :closable="true" :show="show">组件使用方式,警告框</t-alert>
  </div>
</div>

```
:::

### 全局方法

tty-ui 为 Vue.prototype 添加了全局方法 $alert。因此在 vue instance 中可以采用本页面中的方式调用 `TAlert`。

### 单独引用

单独引入 `TAlert`：

```javascript
import { TAlert } from 'tty-ui';

````


### Options or Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字 | string | — | — |
| type | 主题 | string | success/warning/info/danger | info |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| closable | 是否显示关闭按钮 | boolean | — | false |

### Methods
调用 `Alert` 或 `this.$alert` 会返回当前 Alert 的实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 |
| ---- | ---- |
| close | 关闭当前的 Message |