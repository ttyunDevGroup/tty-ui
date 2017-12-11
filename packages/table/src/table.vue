/** * @file * @author 何文林 * @date 2017/9/20 */
<template>
  <div id="tableComponent" ref="tableScroll">
    <!--内容 -->
    <div class="content">
      <!--左边固定-->
      <div class="table-fixed-left" v-if="showSelect && selectFixed && showFixed">
        <div class="table-header" :style="titleFixed == 'fixed' ? {position: 'absolute', overflow:'hidden', zIndex: 1}: {}">
          <table cellpadding="0px" cellspacing="0px" style="width: 50px;">
            <colgroup>
              <col style="width: 50px; min-width: 50px;" />
            </colgroup>
            <thead>
              <tr :style="{height: titleHeight + 'px', borderBottom: (titleFixed=='auto') ? 0 : '1px solid #ddd'}">
                <th>
                  <b-checkbox v-model="checkedAll" @change="checkedAllItem" :indeterminate="isIndeterminate"></b-checkbox>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" :style="titleFixed == 'fixed' ? {paddingTop: titleHeight + 'px', overflow: 'hidden', height: scrollHeight + 'px'} : ''">
          <table cellpadding="0px" cellspacing="0px" style="width: 50px;" ref="tFixedLeft">
            <colgroup>
              <col style="width: 50px; min-width: 50px;" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in data" :key="index" @mouseenter="mouseEnter(index)" @mouseout="mouseOut(index)" :class="toTrClass(index)"
                :style="{height: tdHeight + 'px'}">
                <td>
                  <b-checkbox v-model="checkedItems" :label="index" :show-label="false" @change="checkedSingleItem"></b-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--中间滚动内容-->
      <div class="table-scroll" ref="cScroll" :style="titleFixed == 'fixed' ? {overflow: 'auto', height: scrollHeight + 'px'} : {}">
        <div class="table-header" :style="titleFixed == 'fixed' ? {width: tableContentWith + 'px', position: 'absolute',overflow:'hidden'}: {}">
          <table class="scroll-header" :style="{width: setWithd}" ref="cHead">
            <colgroup>
              <col v-if="showSelect" style="width: 50px; min-width: 50px" />
              <col v-if="orderNumber" style="width: 68px; min-width: 68px" />
              <col v-for="(item,index) in columns" :key="index" :style="{width: item.width+'px', minWidth: item.width + 'px'}" />
              <col v-if="showHandle" style="width: 150px; min-width: 150px" />
            </colgroup>
            <thead>
              <tr :style="{height: titleHeight + 'px', borderBottom: (titleFixed=='auto') ? 0 : '1px solid #ddd'}">
                <th v-if="showSelect">
                  <b-checkbox v-model="checkedAll" @change="checkedAllItem" :indeterminate="isIndeterminate"></b-checkbox>
                </th>
                <th v-if="orderNumber">序号</th>
                <th v-for="(item,index) in columns" :key="index">{{item.title}}</th>
                <th v-if="showHandle">操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" :style="titleFixed == 'fixed' ? {paddingTop: titleHeight + 'px'} : ''">
          <table :style="{width: setWithd}" :id="tableId">
            <colgroup>
              <col v-if="showSelect" style="width: 50px; min-width: 50px" />
              <col v-if="orderNumber" style="width: 68px; min-width: 68px" />
              <col v-for="(item,index) in columns" :key="index" :style="{width: item.width+'px', minWidth: item.width + 'px'}" />
              <col v-if="showHandle" style="width: 150px; min-width: 150px" />
            </colgroup>
            <!-- 这里标头纯属为了导出数据 -->
            <thead v-show="false">
              <tr :style="{height: titleHeight + 'px', borderBottom: (titleFixed=='auto') ? 0 : '1px solid #ddd'}">
                <th v-if="showSelect">
                  <b-checkbox v-model="checkedAll" @change="checkedAllItem" :indeterminate="isIndeterminate"></b-checkbox>
                </th>
                <th v-if="orderNumber">序号</th>
                <th v-for="(item,index) in columns" :key="index">{{item.title}}</th>
                <th v-if="showHandle">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dataItem, index) in data" :key="index" @mouseenter.stop.prevent="mouseEnter(index)" @mouseout.stop.prevent="mouseOut(index)"
                v-on:click.stop="tItamClick(dataItem)" :class="toTrClass(index)" :style="{height: tdHeight + 'px'}">
                <td v-if="showSelect" class="tbSelect">
                  <b-checkbox v-model="checkedItems" :label="index" :show-label="false" @change="checkedSingleItem"></b-checkbox>
                </td>
                <td v-if="orderNumber" style="text-align: center">{{calculateOrderNumber(index)}}</td>

                <td v-for="(item, index1) in columns" :key="index1" :class="'text' + item.textAlign" v-ellipsis="dataItem[item.key] + ',' +item.textLine"
                  v-html="showTableImage(dataItem[item.key], index, item.key)" @click="clickTd(dataItem, item)"></td>

                <td :class="isDisAbled(index) ? 'textDisable' : ''" v-if="showHandle" class="handleAction">
                  <slot name="operations" :item="dataItem">
                    <span>编辑</span>
                    <span>删除</span>
                    <span>禁用1</span>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--右边固定-->
      <div class="table-fixed-right" v-if="showHandle && handleFixed && showFixed">
        <div class="table-header" :style="titleFixed == 'fixed' ? {width: tableContentWith + 'px', position: 'absolute',overflow:'hidden'}: {}">
          <table>
            <colgroup>
              <col style="width: 150px" />
            </colgroup>
            <thead>
              <tr :style="{height: titleHeight + 'px', borderBottom: (titleFixed=='auto') ? 0 :
              '1px solid #ddd'}">
                <th>操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table-body" :style="titleFixed == 'fixed' ? {paddingTop: titleHeight + 'px', overflow: 'hidden', height: scrollHeight + 'px'} : ''">
          <table ref="tFixedRight">
            <colgroup>
              <col style="width: 150px" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in data" :key="index" @mouseenter="mouseEnter(index)" @mouseout="mouseOut(index)" :class="toTrClass(index)"
                :style="{height: tdHeight + 'px'}">
                <td :class="isDisAbled(index) ? 'textDisable' : ''" class="handleAction">
                  <slot name="operations" :item="item">
                    <span>编辑</span>
                    <span>删除</span>
                    <span>禁用1</span>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="page" v-if="!pagination.hidePagination && pagination.total">
      <b-pagination :max-size="pagination.maxSize" :total="pagination.total" :page-sizes="pageSizes" v-model="currentPage" @change="changePage"></b-pagination>
    </div>
    <!--划词提示框-->
    <!--<p class="crossWord">{{crossWord}}</p>-->
  </div>
</template>

<script>
import BPagination from '../pagination/pagination'
import BCheckbox from '../checkbox/checkbox'
export default {
  name: 'BTable',
  componentName: 'BTable',
  components: {
    BPagination,
    BCheckbox
  },
  props: {
    columns: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 显示选择空间
    showSelect: {
      type: Boolean,
      default: false
    },
    // 显示操作列表
    showHandle: {
      type: Boolean,
      default: false
    },
    // 头部是否固定
    titleFixed: {
      type: String,
      default: 'auto'
    },
    titleHeight: {
      type: Number,
      default: 32
    },
    tdHeight: {
      type: Number,
      default: 50
    },
    scrollHeight: {
      type: Number,
      default: 400
    },
    selectFixed: {
      type: Boolean,
      default: false
    },
    handleFixed: {
      type: Boolean,
      default: false
    },
    orderNumber: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default: function () {
        return {}
      }
    },
    tableId: {
      type: String,
      default: 'tty-table'
    }
  },
  data() {
    return {
      hoverIndex: -1,
      checkedItems: [],
      checkedAll: false,
      isIndeterminate: false,
      setWithd: '1000px',
      currentPage: 1,
      currentPageSize: '',
      // 宽度配置
      checkBoxWidth: 50,
      tableContentWith: 600,
      handleWith: 150,
      crossWord: '',
      // 计算是否显示左右浮动
      showFixed: true
    }
  },
  computed: {
    activeDateCount: function () {
      let count = 0
      this.data.forEach((item, index) => {
        if (!item.disable) {
          count++
        }
      })
      return count
    },
    pageSizes: function () {
      let defaultPageSizes = [10, 15, 20, 50, 100, 200]
      return this.pagination.pageSizes ? this.pagination.pageSizes : defaultPageSizes
    }
  },
  directives: {
    // 行数溢出省略号指令
    ellipsis: {
      bind(el, binding) {
        let line = 2
        if (binding.value) {
          let val = (binding.value).split(',')
          line = val[1]
        }
        setTimeout(() => {
          let max = el.offsetWidth
          max = max * line
          let text = (binding.value).trim().replace(' ', '　') // for fix white-space bug
          let ellipsisChar = '...'
          let clone = el.cloneNode(true)
          clone.style.visibility = 'hidden'
          clone.style.whiteSpace = 'nowrap'
          clone.style.width = 'auto'
          document.body.appendChild(clone)
          let width = clone.offsetWidth
          if (width > max) {
            let stop = Math.floor(text.length * max / width)
            let tempStr = text.substring(0, stop) + ellipsisChar
            clone.innerHTML = tempStr
            width = clone.offsetWidth
            if (width > max) {
              while (width > max && stop > 1) {
                stop--
                tempStr = text.substring(0, (
                  stop - 5)) + ellipsisChar
                clone.innerHTML = tempStr
                width = clone.offsetWidth
              }
            } else if (width < max) {
              while (width < max && stop < text.length) {
                stop++
                tempStr = text.substring(0, stop) + ellipsisChar
                clone.innerHTML = tempStr
                width = clone.offsetWidth
              }
              if (width > max) {
                tempStr = text.substring(0, stop - 1) + ellipsisChar
              }
            }
            el.innerHTML = tempStr
          }
          document.body.removeChild(clone)
        }, 0)
      }
    }
  },
  methods: {
    mouseEnter(index) {
      this.hoverIndex = index
    },
    mouseOut(e) {
      this.hoverIndex = -1
    },
    // 鼠标点击一行
    tItamClick(item) {
      if (item.disable) {
        return
      }
      this.$emit('click-item', item)
    },
    // 鼠标滑过 class
    toTrClass(index) {
      if (this.data[index] && (this.data[index].disable || this.data[index].status === '0')) {
        return 'trDisable'
      }
      if (this.hoverIndex === index) {
        return 'mouseover'
      } else {
        return ''
      }
    },
    // 表格初始化宽度
    initTableWidth() {
      const tableScroll = this.$refs.tableScroll
      let AllWidth = 0
      if (!this.showSelect) {
        this.checkBoxWidth = 0
      } else {
        AllWidth += 50
      }
      if (!this.showHandle) {
        this.handleWith = 0
      } else {
        AllWidth += 150
      }
      // this.tableContentWith = tableScroll.offsetWidth - this.checkBoxWidth - this.handleWith
      this.tableContentWith = tableScroll.offsetWidth
      this.columns.forEach(item => {
        AllWidth += item.width
      })
      if (this.orderNumber) {
        AllWidth += 68
      }
      if (AllWidth > tableScroll.offsetWidth) {
        this.setWithd = AllWidth + 'px'
        this.showFixed = true
      } else {
        this.setWithd = '100%'
        this.showFixed = false
      }
    },
    // 判断是否可用
    isDisAbled(index) {
      return this.data[index] ? (this.data[index].disable || this.data[index].status === '0') : false
    },
    // 分页变动
    changePage(page) {
      this.currentPage = page.currentPage
      this.currentPageSize = page.pageSize
      this.$emit('change-page', page)
    },
    // 全选或者全不选
    isAllSelect(isSelect) {
      const _this = this
      if (this.data.length === 0) {
        return
      }
      if (isSelect) {
        this.data.forEach((item, index) => {
          // let disable = !!(item.disable || item.status === '0')
          if (this.checkedItems.indexOf(index) < 0) {
            _this.checkedItems.push(index)
          }
        })
      } else {
        _this.checkedItems = []
      }
    },
    // 全选操作
    checkedAllItem() {
      this.isAllSelect(this.checkedAll)
      this.isIndeterminate = false
    },
    // 单选操作
    checkedSingleItem(value) {
      let checkedCount = this.checkedItems.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.activeDateCount
    },
    // 划词提示
    selectText(isSelect) {
      if (isSelect) {
        let txt = ''
        if (document.selection) {
          txt = document.selection.createRange().text
        } else {
          txt = window.getSelection() + ''
        }
        console.log(txt)
      }
    },
    // 滚动表格
    scrollTable(e) {
      const _this = this
      let timer = null
      clearInterval(timer)
      timer = setTimeout(() => {
        if (this.titleFixed === 'fixed') {
          _this.$refs.cHead.style.transform = 'translateZ(0.01px)'
          _this.$refs.cHead.style.transform = 'translateX(' + -(e.target.scrollLeft) + 'px)'
          if (_this.selectFixed) {
            _this.$refs.tFixedLeft.style.transform = 'translateY(' + -(e.target.scrollTop) + 'px)'
          }
          if (_this.handleFixed) {
            _this.$refs.tFixedRight.style.transform = 'translateY(' + -(e.target.scrollTop) + 'px)'
          }
        }
      }, 10)
    },
    // 计算排序
    calculateOrderNumber(index) {
      let page = this.currentPage - 1
      let pageSize = this.currentPageSize
      if (page) {
        return (page * pageSize) + (index + 1)
      } else {
        return index + 1
      }
    },
    // 显示图片
    showTableImage(value, index, key) {
      if (/http/.test(value)) {
        let num = this.isDisAbled(index) ? 0.6 : 1
        return `<img style="width:36px; height: 36px; opacity: ${num}" src="${value}">`
      } else if (key === 'status') {
        return value === '0' ? '禁用' : '启用'
      } else {
        return value
      }
    },
    // 配置点击单元格
    clickTd(data, item) {
      if (item.click && (data.status !== '0' || data.status !== 0)) {
        this.$emit('td-' + item.key, data)
      }
    }
  },
  created() {
    this.currentPageSize = this.pagination.pageSizes ? this.pagination.pageSizes[0] : this.pageSizes[0]
  },
  mounted() {
    if (this.$refs.tableScroll) {
      this.initTableWidth()
      window.addEventListener('resize', this.initTableWidth)
    } else {
      window.removeEventListener('resize', this.initTableWidth)
    }
    this.$refs.cScroll.addEventListener('scroll', this.scrollTable)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTableWidth)
  },
  watch: {
    checkedItems: function (val) {
      let arr = this.data
      let select = []
      let num = 0
      arr.forEach((item, index) => {
        // if(item.status === '1' && !item.disable) {
        //   num += 1
        // }
        num += 1
      })
      if (val.length !== num) {
        this.checkedAll = false
      } else {
        this.checkedAll = true
      }
      for (var i = 0, len = val.length; i < len; i++) {
        select.push(arr[val[i]])
      }
      this.$emit('select-change', select)
    },
    data: {
      handler(val) {
        this.isAllSelect(false)
      },
      deep: true
    }
  }
}

</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

table {
  border-collapse: collapse;
  tr {
    box-sizing: border-box;
    overflow: hidden;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  tr:nth-of-type(2n) {
    td {
      background: #fafafa;
    }
  }
  tr:nth-of-type(2n + 1) {
    td {
      background: #fff;
    }
  }
}

td,
th {
  border: 1px solid #ddd;
  box-sizing: border-box;
  padding: 0 6px;
}

th {
  border-bottom: 0;
  text-align: center;
  background: #fafafa;
}

td {
  overflow: hidden;
  img {
    width: 36px;
    height: 36px;
  }
}

#tableComponent {
  width: 100%; // overflow: hidden;
  position: relative;
  font-size: 14px;
}

.selectLable {
  i {
    font-size: 18px;
  }
  input {
    display: none;
  }
  & > div {
    justify-content: center;
  }
}

.titleHeight {
  background: #fafafa;
}

.content {
  position: relative;
}

.table-fixed-left {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 50px;
  .table-header {
    z-index: 1;
  }
  td {
    text-align: center;
  }
}

.showSelect {
  margin-left: 50px;
}

.showHandle {
  margin-right: 150px;
}

.table-scroll {
  overflow: scroll;
  overflow-y: hidden;
  .table-header {
    z-index: 1;
  }
  .tbSelect {
    text-align: center;
  }
  td,
  th {
    border-right: 0;
  }
  tr.textDisable {
    color: #dddddd;
  }
}

.table-fixed-right {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  .table-header {
    z-index: 1;
  }
  .table-body {
    background: #ffffff;
    tr:hover {
      background: red;
    }
    td {
      text-align: center;
    }
    span:hover {
      text-decoration: underline;
    }
  }
}

.mouseover {
  td {
    background: #ffffbb !important;
  }
}

.selectTr {
  td {
    background: #ffffbb;
  }
}

.trDisable {
  color: #ccc;
}

.textleft {
  text-align: left;
}

.textright {
  text-align: right;
}

.textcenter {
  text-align: center;
}

.page {
  display: flex;
  justify-content: flex-end;
}

.handleAction {
  color: #5a82be;
  text-align: center;
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.crossWord {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
