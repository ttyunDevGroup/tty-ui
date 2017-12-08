# Button 按钮
----
### 基础用法
使用```type```、```plain```和```round```属性来定义 Button 的样式。

<div class="demo-block">
  <div>
    <t-button>默认按钮</t-button>
    <t-button type="primary">主要按钮</t-button>
    <t-button type="success">成功按钮</t-button>
    <t-button type="warning">警告按钮</t-button>
    <t-button type="danger">危险按钮</t-button>
  </div>
  <br/>
  <div class="m-10">
    <t-button round>圆形按钮</t-button>
    <t-button type="primary" round>主要按钮</t-button>
    <t-button type="success" round>成功按钮</t-button>
    <t-button type="warning" round>警告按钮</t-button>
    <t-button type="danger" round>危险按钮</t-button>
  </div>
</div>

::: demo
```html

<div>
  <t-button>默认按钮</t-button>
  <t-button type="primary">主要按钮</t-button>
  <t-button type="success">成功按钮</t-button>
  <t-button type="info">信息按钮</t-button>
  <t-button type="warning">警告按钮</t-button>
  <t-button type="danger">危险按钮</t-button>
</div>

<div>
  <t-button plain>朴素按钮</t-button>
  <t-button type="primary" plain>主要按钮</t-button>
  <t-button type="success" plain>成功按钮</t-button>
  <t-button type="info" plain>信息按钮</t-button>
  <t-button type="warning" plain>警告按钮</t-button>
  <t-button type="danger" plain>危险按钮</t-button>
</div>
<div>
  <t-button round>圆形按钮</t-button>
  <t-button type="primary" round>主要按钮</t-button>
  <t-button type="success" round>成功按钮</t-button>
  <t-button type="info" round>信息按钮</t-button>
  <t-button type="warning" round>警告按钮</t-button>
  <t-button type="danger" round>危险按钮</t-button>
</div>

```
:::

### 禁用状态

按钮不可用状态。

<div class="demo-block">
  <div>
    <t-button disabled>默认按钮</t-button>
    <t-button type="primary" disabled>主要按钮</t-button>
    <t-button type="success" disabled>成功按钮</t-button>
    <t-button type="info" disabled>信息按钮</t-button>
    <t-button type="warning" disabled>警告按钮</t-button>
    <t-button type="danger" disabled>危险按钮</t-button>
  </div>
  <br/>
  <div>
    <t-button disabled round>默认按钮</t-button>
    <t-button type="primary" disabled round>主要按钮</t-button>
    <t-button type="success" disabled round>成功按钮</t-button>
    <t-button type="info" disabled round>信息按钮</t-button>
    <t-button type="warning" disabled round>警告按钮</t-button>
    <t-button type="danger" disabled round>危险按钮</t-button>
  </div>
</div>

::: demo
```html

<div>
  <t-button disabled>默认按钮</t-button>
  <t-button type="primary" disabled>主要按钮</t-button>
  <t-button type="success" disabled>成功按钮</t-button>
  <t-button type="info" disabled>信息按钮</t-button>
  <t-button type="warning" disabled>警告按钮</t-button>
  <t-button type="danger" disabled>危险按钮</t-button>
</div>

```
:::



### 固定宽度按钮
设置`width`可以指定按钮的固定快递
<div class="demo-block">
  <t-button width="120">默认尺寸</t-button>
</div>

::: demo
```html

<t-button width="120">默认尺寸</t-button>

```
:::

### 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
设置```icon```属性即可，icon 的列表可以参考 tty-ui 的 icon 组件，也可以设置在文字右边的 icon ，只要使用```i```标签即可，可以使用自定义图标。
<div class="demo-block">
  <t-button icon="t-icon-search" type="primary"></t-button>
  <t-button icon="t-icon-yonghumin" type="primary"></t-button>
  <t-button icon="t-icon-bangzhu" type="primary"></t-button>
  <t-button icon="t-icon-qiyong" type="primary">搜索</t-button>
  <t-button icon="t-icon-yujing" type="primary">下载</t-button>
</div>

::: demo
```html

<t-button icon="t-icon-search" type="primary"></t-button>
<t-button icon="t-icon-yonghumin" type="primary"></t-button>
<t-button icon="t-icon-bangzhu" type="primary"></t-button>
<t-button icon="t-icon-qiyong" type="primary">搜索</t-button>
<t-button icon="t-icon-yujing" type="primary">下载</t-button>

```
:::


### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
额外的尺寸：```medium```、```small```，通过设置```size```属性来配置它们。
<div class="demo-block">
  <t-button>默认尺寸</t-button>
  <t-button size="medium">中等按钮</t-button>
  <t-button size="small">小型按钮</t-button>
</div>

::: demo
```html

<t-button>默认尺寸</t-button>
<t-button size="medium">中等按钮</t-button>
<t-button size="small">小型按钮</t-button>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   default,medium,small            |    —     |
| type     | 类型   | string    |   primary,success,warning,danger,info |     —    |
| plain     | 是否朴素按钮   | Boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标，已有的图标库中的图标名 | string   |  —  |  —  |
| width  | 固定宽度 | string   |  —  |  —  |

