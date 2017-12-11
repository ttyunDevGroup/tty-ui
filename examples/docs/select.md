<script>
  let optionIndex = 6
  module.exports = {
    data () {
      return {
        selectValue:'',
        remoteSelectValue: '',
        selectMulValue: [],
        selectValue2:'',
        selectValue3:'',
        options: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村'
        }, {
          value: '选项3',
          label: '上海滩外'
        }, {
          value: '选项4',
          label: '杭州西湖'
        }, {
          value: '选项5',
          label: '广州天河'
        }],
        options2: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村',
          disabled: true,
        }, {
          value: '选项3',
          label: '上海滩外',
          disabled: true,
        }, {
          value: '选项4',
          label: '杭州西湖',
          disabled: true,
        }, {
          value: '选项5',
          label: '广州天河'
        }],
        options3: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村',
        }, {
          value: '选项3',
          label: '上海滩外',
        }, {
          value: '选项4',
          label: '杭州西湖',
        }, {
          value: '选项5',
          label: '广州天河'
        }],
        selectValue4:'',
        options4: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村'
        }, {
          value: '选项3',
          label: '上海滩外'
        }, {
          value: '选项4',
          label: '杭州西湖'
        }, {
          value: '选项5',
          label: '广州天河'
        }],
        selectList: [],
        selectLoading: false,
        treeSelectValue: '',
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        treeProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    methods: {
      createNewOption() {
        let index = optionIndex++
        const newOption = {
          value: '选项' + index,
          label: '自定义底部增加城市' + index
        }
        this.options4.push(newOption)
      },
    }
  };
</script>

# Select 下拉选择器

当选项过多时，使用下拉菜单展示并选择内容。

----
### 基础用法
适用广泛的基础单选。
`v-model`的值为当前被选中的`t-option`的 value 属性值

<div class="demo-block">
  <t-select v-model="selectValue" placeholder="请选择">
    <t-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></t-option>
  </t-select>
</div>

::: demo
```html
<t-select v-model="selectValue" placeholder="请选择">
  <t-option v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"></t-option>
</t-select>

<script>
  export default {

    data () {
      return {
        selectValue2:'',
        selectValue2:'',
        options2: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村',
          disabled: true,
        }, {
          value: '选项3',
          label: '上海滩外',
          disabled: true,
        }, {
          value: '选项4',
          label: '杭州西湖',
          disabled: true,
        }, {
          value: '选项5',
          label: '广州天河'
        }]
      }
    }
  }
</script>

```
:::


### 有禁用选项

在`t-option`中，设定`disabled`值为 true，即可禁用该选项


<div class="demo-block">
  <t-select v-model="selectValue2" placeholder="请选择">
    <t-option v-for="item in options2" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value" 
              :disabled="item.disabled"></t-option>
  </t-select>
</div>

::: demo
```html
<t-select v-model="selectValue2" placeholder="请选择">
  <t-option v-for="item in options2" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value" 
            :disabled="item.disabled"></t-option>
</t-select>

<script>
  export default {
    data () {
      return {
        selectValue2:'',
        options2: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村'
        }, {
          value: '选项3',
          label: '上海滩外'
        }, {
          value: '选项4',
          label: '杭州西湖'
        }, {
          value: '选项5',
          label: '广州天河'
        }]
      }
    }
  }
</script>

```
:::


### 可清空单选

包含清空按钮，可将选择器清空为初始状态

为`t-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。
<div class="demo-block">
  <t-select v-model="selectValue3" clearable placeholder="请选择">
    <t-option v-for="item in options3" 
              :key="item.value"
              :label="item.label" 
              :value="item.value"></t-option>
  </t-select>
</div>


::: demo
```html
<t-select v-model="selectValue3" placeholder="请选择">
  <t-option v-for="item in options3" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value" 
            :disabled="item.disabled"></t-option>
</t-select>

<script>
  export default {
    data () {
      return {
        selectValue3:'',
        options3: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村'
        }, {
          value: '选项3',
          label: '上海滩外'
        }, {
          value: '选项4',
          label: '杭州西湖'
        }, {
          value: '选项5',
          label: '广州天河'
        }]
      }
    }
  }
</script>

```
:::

### 基础多选

适用性较广的基础多选，用 Tag 展示已选项

为`t-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。

<div class="demo-block">
  <t-select v-model="selectMulValue" multiple placeholder="请选择">
    <t-option v-for="item in options" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"></t-option>
  </t-select>
</div>

::: demo
```html
<t-select v-model="selectValue" placeholder="请选择">
  <t-option v-for="item in options" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"></t-option>
</t-select>

<script>
  export default {
    data () {
      return {
        selectMulValue: [],
        options: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村',
        }, {
          value: '选项3',
          label: '上海滩外',
        }, {
          value: '选项4',
          label: '杭州西湖',
        }, {
          value: '选项5',
          label: '广州天河'
        }]
      }
    }
  }
</script>

```
:::


### 可搜索

可以利用搜索功能快速查找选项
为`t-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。


<div class="demo-block">
  <t-select v-model="selectValue" filterable placeholder="请选择">
    <t-option v-for="item in options" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"></t-option>
  </t-select>
</div>

::: demo
```html
<t-select v-model="selectValue" filterable placeholder="请选择">
    <t-option v-for="item in options" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"></t-option>
  </t-select>

<script>
  export default {
    data () {
      return {
        selectValue: '',
        options: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村',
        }, {
          value: '选项3',
          label: '上海滩外',
        }, {
          value: '选项4',
          label: '杭州西湖',
        }, {
          value: '选项5',
          label: '广州天河'
        }]
      }
    }
  }
</script>

```
:::

### 支持自定义底部操作

支持自定义底部操作，比如添加操作，自定义slot(name=footer)
<div class="demo-block">
  <t-select v-model="selectValue4" filterable allow-create :create-method="createNewOption" placeholder="请选择">
    <t-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></t-option>
  </t-select>
</div>

::: demo
```html
<t-select v-model="selectValue4" 
          filterable allow-create 
          :create-method="createNewOption" placeholder="请选择">
  <t-option v-for="item in options4" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value"></t-option>
</t-select>

<script>
  let optionIndex = 6
  export default {
    data () {
      return {
        selectValue4: [],
        options4: [{
          value: '选项1',
          label: '深圳南山'
        }, {
          value: '选项2',
          label: '北京中关村',
        }, {
          value: '选项3',
          label: '上海滩外',
        }, {
          value: '选项4',
          label: '杭州西湖',
        }, {
          value: '选项5',
          label: '广州天河'
        }]
      }
    },
    methods: {
      createNewOption() {
        let index = optionIndex++
        const newOption = {
          value: '选项' + index,
          label: '自定义底部增加城市' + index
        }
        this.options4.push(newOption)
      },
    }
  }
</script>

```
:::


### 下拉树

下拉树形结构展示，支持输入关键字进行搜索。

<div class="demo-block">
  <t-select v-model="treeSelectValue" filterable placeholder="请选择">
    <t-option-tree :tree-data="treeData" :tree-props="treeProps" node-key="id"></t-option-tree>
  </t-select>
</div>

::: demo
```html
<t-select v-model="treeSelectValue" filterable placeholder="请选择">
    <t-option-tree :tree-data="treeData" 
                    :tree-props="treeProps" 
                    node-key="id"></t-option-tree>
  </t-select>

<script>
  let optionIndex = 6
  export default {
    data () {
      return {
        treeSelectValue: '',
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        treeProps: {
          children: 'children',
          label: 'label'
        },
      }
    }
  }
</script>

```
:::



如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。


### Select Attributes 
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| multiple | 是否多选 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| value-key | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | string | — | value |
| size | 输入框尺寸 | string | large/small/mini | — |
| clearable | 单选时是否可以清空选项 | boolean | — | false |
| collapse-tags | 多选时是否将选中值按文字的形式展示 | boolean | — | false |
| multiple-limit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | — | 0 |
| name | select input 的 name 属性 | string | — | — |
| placeholder | 占位符 | string | — | 请选择 |
| filterable | 是否可搜索 | boolean | — | false |
| allow-create | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | — | false |
| filter-method | 自定义搜索方法 | function | — | — |
| remote | 是否为远程搜索 | boolean | — | false |
| remote-method | 远程搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 |
| no-match-text | 搜索条件无匹配时显示的文字 | string | — | 无匹配数据 |
| no-data-text | 选项为空时显示的文字 | string | — | 无数据 |
| popper-class | Select 下拉框的类名 | string | — | — |
| reserve-keyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | — | false |
| default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | (event: Event) |
| focus | 当 input 获得焦点时触发 | (event: Event) |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | — | — |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | — | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | — | — |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | — | — |
| disabled | 是否禁用该选项 | boolean | — | false |


### Option-Tree Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| tree-data | 树形结构数据 | Array | — | — |
| tree-props | children(树形结构的子节点) label(指定的 key) | string/number | — | — |
| node-key | 树形结构子级的 id | 'id' | — | false |


### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | - |
