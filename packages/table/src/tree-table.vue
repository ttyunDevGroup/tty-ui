<template>
  <div :style="{width:tableWidth}" class='autoTbale department'>
    <table class="table table-bordered" id='hl-tree-table'>
      <thead>
        <tr>
          <th v-for="(column,index) in cloneColumns" :key="index">
            <label>
              {{ renderHeader(column, index) }}
            </label>
          </th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in initItems" :key="index" 
            v-show="show(item)" 
            :class="{'child-tr':item.parent, 'isDisable': item.status != 1}">
          <td v-for="(column, snum) in columns" :key="column.key" :style=tdStyle(column)>
            <label @click="toggle(index,item)">
              <span v-if='snum==iconRow()'>
                <i v-html='item.spaceHtml'></i>
                <i v-if="item.children&&item.children.length>0" class="taggolIcon">
                  {{item.expanded ? '-' : '+'}}
                </i>
                <i v-else class="taggolIcon noborder"></i>
              </span>
              <span v-if="snum == 0">
                <i class="textIcon t-icon-zongzuzh" v-if="index == 0"></i>
                <i class="textIcon" 
                   :class="item.tree_type == '1' ? 't-icon-zuzhi' : 't-icon-bumen'" v-else></i>
              </span>
              {{renderBody(item,column)}}
            </label>
          </td>
          <td class="actions" :class="{'actionsDisable': false}">
            <slot name="operations" :item="item">
              <span>编辑</span>
              <span>删除</span>
              <span>禁用</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'TTreeTable',
  componentName: 'TTreeTable',
  props: {
    columns: Array,
    items: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      initItems: [], //  处理后数据数组
      cloneColumns: [], //  处理后的表头数据
      screenWidth: document.body.clientWidth, //  自适应宽
      tdsWidth: 0, //  td总宽
      timer: false, //  控制监听时长
      dataLength: 0 //  树形数据长度
    }
  },
  computed: {
    tableWidth() {
      return this.tdsWidth > this.screenWidth && this.screenWidth > 0 ? this.screenWidth + 'px' : '100%'
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        setTimeout(() => {
          this.timer = false
        }, 400)
      }
    },
    items() {
      if (this.items) {
        this.dataLength = this.Length(this.items)
        this.initData(this.deepCopy(this.items), 1, null)
      }
    },
    columns: {
      handler() {
        this.cloneColumns = this.makeColumns()
      },
      deep: true
    }
  },
  mounted() {
    if (this.items) {
      this.dataLength = this.Length(this.items)
      this.initData(this.deepCopy(this.items), 1, null)
      this.cloneColumns = this.makeColumns()
    }
    //  绑定onresize事件 监听屏幕变化设置宽
    this.$nextTick(() => {
      this.screenWidth = document.body.clientWidth
    })
    // this.toggle(0, this.initItems[0])
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
      })()
    }
  },
  methods: {
    //  有无多选框折叠位置优化
    iconRow() {
      for (var i = 0, len = this.columns.length; i < len; i++) {
        if (this.columns[i].type === 'selection') {
          return 1
        }
      }
      return 0
    },
    //  设置td宽度,td的align
    tdStyle(column) {
      var style = {}
      if (column.align) {
        style['text-align'] = column.align
      }
      if (column.width) {
        style['min-width'] = column.width + 'px'
      }
      return style
    },
    //  处理表头数据
    makeColumns() {
      let columns = this.deepCopy(this.columns)
      this.tdsWidth = 0
      columns.forEach((column, index) => {
        column._index = index
        column._width = column.width ? column.width : ''
        column._sortType = 'normal'
        this.tdsWidth += column.width ? parseFloat(column.width) : 0
      })
      return columns
    },
    //  数据处理 增加自定义属性监听
    initData(items, level, parent) {
      this.initItems = []
      let spaceHtml = ''
      for (var i = 1; i < level; i++) {
        spaceHtml += '<i class="ms-tree-space"></i>'
      }
      items.forEach((item, index) => {
        item = Object.assign({}, item, {
          'parent': parent,
          'level': level,
          'spaceHtml': spaceHtml
        })
        if ((typeof item.expanded) === 'undefined') {
          item = Object.assign({}, item, {
            'expanded': false
          })
        }
        if ((typeof item.show) === 'undefined') {
          item = Object.assign({}, item, {
            'isShow': false
          })
        }
        item = Object.assign({}, item, {
          'load': !!item.expanded
        })
        this.initItems.push(item)
        if (item.children && item.expanded) {
          this.initData(item.children, level + 1, item)
        }
      })
    },
    //   隐藏显示
    show(item) {
      return ((item.level === 1) || (item.parent && item.parent.expanded && item.isShow))
    },
    toggle(index, item) {
      let level = item.level + 1
      let spaceHtml = ''
      for (var i = 1; i < level; i++) {
          spaceHtml += '<i class="ms-tree-space"></i>'
      }
      if (item.children) {
        if (item.expanded) {
          item.expanded = !item.expanded
          this.close(index, item)
        } else {
          item.expanded = !item.expanded
          if (item.load) {
            this.open(index, item)
          } else {
              item.load = true
              item.children.forEach((child, childIndex) => {
                this.initItems.splice((index + childIndex + 1), 0, child)
                // 设置监听属性
                this.$set(this.initItems[index + childIndex + 1], 'parent', item)
                this.$set(this.initItems[index + childIndex + 1], 'level', level)
                this.$set(this.initItems[index + childIndex + 1], 'spaceHtml', spaceHtml)
                this.$set(this.initItems[index + childIndex + 1], 'isShow', true)
                this.$set(this.initItems[index + childIndex + 1], 'expanded', false)
              })
          }
        }
      }
    },
    open(index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = true
          if (child.children && child.expanded) {
            this.open(index + childIndex + 1, child)
          }
        })
      }
    },
    close(index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = false
          child.expanded = false
          if (child.children) {
            this.close(index + childIndex + 1, child)
          }
        })
      }
    },
    initToggle () {
      this.toggle(0, this.initItems[0])
    },
    //  返回树形数据长度
    Length(data) {
      let length = data.length
      data.forEach((child) => {
        if (child.children) {
          length += this.Length(child.children)
        }
      })
      return length
    },
    //  返回表头
    renderHeader(column, $index) {
      if ('renderHeader' in this.columns[$index]) {
        return this.columns[$index].renderHeader(column, $index)
      } else {
        return column.title || '#'
      }
    },
    //  返回内容
    renderBody(row, column, index) {
      let key = column.key
      if (/:/.test(key)) {
        let k = key.split(':')
        key = k[row.tree_type - 1]
        key = key.trim()
      }
      if (key === 'status') {
        return (row[key] === '1' || row[key] === 1) ? '启用' : '禁用'
      } else if (key === 'tree_type') {
        return (row[key] === '1' || row[key] === 1) ? '组织' : '部门'
      } else {
        return row[key]
      }
    },
    //  深度拷贝函数
    deepCopy(data) {
      let t = this.type(data)
      let o = null
      let i = null
      let ni = null
      if (t === 'array') {
        o = []
      } else if (t === 'object') {
        o = {}
      } else {
        return data
      }
      if (t === 'array') {
        for (i = 0, ni = data.length; i < ni; i++) {
          o.push(this.deepCopy(data[i]))
        }
        return o
      } else if (t === 'object') {
        for (i in data) {
          o[i] = this.deepCopy(data[i])
        }
        return o
      }
    },
    type(obj) {
      var toString = Object.prototype.toString
      var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      }
      return map[toString.call(obj)]
    }
  },
  beforeDestroy() {
    window.onresize = null
  }
}
</script>
<style lang="less" scoped>
.autoTbale {
  overflow: auto;
}

.department{
  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .table-bordered {
    // border: 1px solid #ddd;
  }
  .table>thead>tr>th{
    text-align: center;
  }
  .table>tbody>tr>td,
  .table>tbody>tr>th,
  .table>thead>tr>td,
  .table>thead>tr>th {
    border-top: 1px solid #e7eaec;
    line-height: 1.42857;
    padding: 8px;
    vertical-align: middle;
  }
  .table-bordered>tbody>tr{
    height: 50px;
    &:hover{
      background: #ffffbb;
    }
  }
  .table-bordered>tbody>tr>td,
  .table-bordered>tbody>tr>th,
  .table-bordered>tfoot>tr>td,
  .table-bordered>tfoot>tr>th,
  .table-bordered>thead>tr>td,
  .table-bordered>thead>tr>th {
    border: 1px solid #ddd;
  }

  .table>thead>tr>th {
    border-bottom: 1px solid #DDD;
  }

  .table-bordered>thead>tr>td,
  .table-bordered>thead>tr>th {
    background-color: #F5F5F6;
  }

  /* #hl-tree-table>tbody>tr {
      background-color: #fbfbfb;
  }

  #hl-tree-table>tbody>.child-tr {
      background-color: #fff;
  } */

  #hl-tree-table>tbody>.isDisable{
    color: #ccc;
    &:hover{
      background: #ffffff;
    }
  }
  label {
    margin: 0px;
  }

  .ms-tree-space {
      position: relative;
      top: 1px;
      display: inline-block;
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      width: 15px;
      height: 14px;
  }

  .ms-tree-space::before {
      content: ''
  }

  #hl-tree-table th>label {
      margin: 0 4px;
  }
  .taggolIcon{
    display: inline-block;
    width: 13px;
    height: 13px;
    font-size: 12px;
    text-align: center;
    line-height: 10px;
    border: 1px solid #666;
    font-style: normal;
  }
  .noborder{
    border-color: transparent;
  }
  .textIcon{
    display: inline-block;
    padding: 0 5px;
    font-size: 16px;
  }
  .actions{
    text-align: center;
    min-width: 147px;
    color: #5a82be;
    span{
      cursor: pointer;
      line-height: 20px;
      &:hover{
        text-decoration: underline
      }
    }
  }
  .actionsDisable{
    color: #ccc;
  }
}

</style>
