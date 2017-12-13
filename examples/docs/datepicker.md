<script>
  module.exports = {
    data () {
      return {
        value3: '',
        value4: '',
        value5: '',
        datetimes: {
          date0: '',
          date1: '',
          date2: '',
          daterange0: '',
          daterange1: '',
          daterange2: '',
          datetime1: '',
          datetimerange1: '',
          week: '',
          month: '',
          year: '',
          timeSelect: '',
          time0: '',
          startTime: '',
          endTime: '',
          timeRange: [],
        },
        pickerOptions: {
          date1: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7
            }
          },
          date2: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]
          },
          daterange1: {
            disabledDate(time) {
              let correctTime = time.getTime() + 8.64e7
              let startTime = Date.now()
              let endTime = Date.now() + 30 * 24 * 60 * 60 * 1000
              return correctTime < startTime || correctTime > endTime
            }
          },
          daterange2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
          },
          datetime1: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }]
          },
          datetimerange1: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
          }
        }
      }
    },
    methods: {
      date(e) {
        console.log(e)
      },
      daterange(e) {
        console.log(e)
      },
      pickerOption(e) {
        console.log(e)
      }
    }
  };
</script>

# DatePicker 日期选择器
----
### 基础用法
以「日」为基本单位，基础的日期选择控件

<div class="demo-block">
  <t-date-picker v-model="datetimes.date0" type="date" placeholder="选择日期"></t-date-picker>
</div>

::: demo
```html

<div class="demo-block">
  <t-date-picker v-model="date" type="date" placeholder="选择日期"></t-date-picker>
</div>

<script>

export default {
  data () {
    return {
      date: ''
    }
  }

}

<script/>

```
:::


### 带快捷键选项
以「日」为基本单位，基础的日期选择控件

<div class="demo-block">
  <t-date-picker v-model="datetimes.date2" 
                 type="date" 
                 placeholder="选择日期" 
                 :picker-options="pickerOptions.date2"></t-date-picker>
</div>

::: demo
```html

<div class="demo-block">
  <t-date-picker v-model="date" 
                 type="date" 
                 placeholder="选择日期" 
                 :picker-options="pickerOptions"></t-date-picker>
</div>

<script>

export default {
  data () {
    return {
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  }

}

<script/>

```
:::

### 日期和时间范围

可在一个选择器中选择一个时间范围
<div class="demo-block">
  <t-date-picker v-model="datetimes.daterange0" 
                 type="daterange" 
                 placeholder="选择日期范围"></t-date-picker>
</div>

::: demo
```html

<div class="demo-block">
  <t-date-picker v-model="daterange" 
                 type="daterange" 
                 placeholder="选择日期范围"></t-date-picker>
</div>

<script>

export default {
  data () {
    return {
      daterange: ''
    }
  }

}

<script/>

```
:::

### 日期和时间范围，带快捷选项

可在一个选择器中便捷地选择一个时间范围

<div class="demo-block">
  <t-date-picker v-model="datetimes.daterange2" 
                 type="daterange" 
                 placeholder="选择日期范围" :picker-options="pickerOptions.daterange2"></t-date-picker>
</div>


::: demo
```html

<div class="demo-block">
  <t-date-picker v-model="daterange" 
                 type="daterange" 
                 placeholder="选择日期范围" 
                 :picker-options="pickerOption"></t-date-picker>
</div>


<script>

export default {
  data () {
    return {
      daterange: '',
      pickerOption: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
    }
  }

}

<script/>

```
:::

### 其他选择

<div class="demo-block">
  <t-row class="m-10">
    <t-col :span="8">
      <h3 class="demonstration">周</h3>
      <t-date-picker
        v-model="value3"
        type="week"
        format="yyyy 第 WW 周"
        placeholder="选择周">
      </t-date-picker>
    </t-col>
    <t-col :span="8">
      <h3 class="demonstration">月</h3>
      <t-date-picker
        v-model="value4"
        type="month"
        placeholder="选择月">
      </t-date-picker>
    </t-col>
    <t-col :span="8">
    <h3 class="demonstration">年</h3>
    <t-date-picker
      v-model="value5"
      align="right"
      type="year"
      placeholder="选择年">
    </t-date-picker>
    </t-col>
  </t-row>
</div>

:::demo
```html


<div class="demo-block">
  <t-row :gutter="10">
    <t-row class="m-10">
      <t-col :span="8">
        <h3 class="demonstration">周</h3>
        <t-date-picker
          v-model="value3"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周">
        </t-date-picker>
      </t-col>
      <t-col :span="8">
        <h3 class="demonstration">月</h3>
        <t-date-picker
          v-model="value4"
          type="month"
          placeholder="选择月">
        </t-date-picker>
      </t-col>
      <t-col :span="8">
      <h3 class="demonstration">年</h3>
      <t-date-picker
        v-model="value5"
        align="right"
        type="year"
        placeholder="选择年">
      </t-date-picker>
      </t-col>
    </t-row>
  </t-row>
</div>


<script>

export default {
  data () {
    return {
      value3: '',
      value4: '',
      value5: ''
    }
  }

}

<script/>

```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| readonly | 完全只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size          | 输入框尺寸     | string          | large, small, mini  | — |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| type | 显示类型 | string | year/month/date/week/ datetime/datetimerange/daterange | date |
| format | 显示在输入框中的格式 | string | 年 `yyyy`，月 `MM`，日 `dd`，小时 `HH`，分 `mm`，秒 `ss`，AM/PM `A` | yyyy-MM-dd |
| align | 对齐方式 | string | left, center, right | left |
| popper-class | DatePicker 下拉框的类名 | string | — | — |
| picker-options | 当前时间日期选择器特有的选项参考下表 | object |  — | {} |
| range-separator | 选择范围时的分隔符 | string | — | '-' |
| default-value | 可选，选择器打开时默认显示的时间 | Date | 可被`new Date()`解析 | — |
| value-format | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string | 年 `yyyy`，月 `MM`，日 `dd`，小时 `HH`，分 `mm`，秒 `ss`，AM/PM `A` | — |
| name | 原生属性 | string | — | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | boolean | — | false |

### Picker Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| shortcuts | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表 | Object[] | — | — |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function | — | — |
| firstDayOfWeek | 周起始日 | Number | 1 到 7 | 7 |
| onPick | 选中日期后会执行的回调，只有当 `daterange` 或 `datetimerange` 才生效 | Function({ maxDate, minDate }) | — | — |

### Shortcuts
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text | 标题文本 | string | — | — |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.$emit('pick', new Date()) | function | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------|--------|---------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 `value-format` 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |
