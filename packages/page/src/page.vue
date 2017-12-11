/**
* @file 分页组件
* @author 何文林
* @date 2017/9/8
*/
<template>
  <nav aria-label="Page navigation" class="t-page">
    <div class="showPageNum">
      <span style="padding-right: 6px;">每页</span>
      <t-select v-model="pageSize" width="70px" @change="toDownSelectItem" :size="size">
        <t-option v-for="item in pageSizes" :key="item" :label="item" :value="item"></t-option>
      </t-select>
      <span style="padding-left: 6px;">条数据</span>
    </div>
    <div class="totalNum">共<span>{{total}}</span>条数据</div>
    <ul class="pagination" :class="paginationSize">
      <li :class="{'disabled':value<=1}" v-if="directionLinks" @click="onPageChange(value-1)" data-action="prev-page">
        <a role="button prevbtn">
          <span aria-hidden="true">上一页</span>
        </a>
      </li>
      <li v-if="sliceStart>0" @click="toPage(1)" data-action="prev-group">
        <a role="button">...</a>
      </li>
      <li v-for="item in sliceArray" :key="item" @click="onPageChange(item+1)" class="pagination-page"
          :class="{'active': value==item+1}">
        <a role="button">{{item + 1}}</a>
      </li>
      <li v-if="sliceStart<totalPage-maxSize" @click="toPage(0)" data-action="next-group">
        <a role="button">...</a>
      </li>
      <li :class="{'disabled':value>=totalPage}" v-if="directionLinks" @click="onPageChange(value+1)"
          data-action="next-page">
        <a role="button">
          <span aria-hidden="true">下一页</span>
        </a>
      </li>
    </ul>
    <div class="passPage">
      第 <input type="text" class="form-control" :class="'input-' + size" v-model="passPage">页
      <input class="btn btn-default" :class="'btn-' + size" type="button" value="跳转" @click="toPassPage">
    </div>
  </nav>
</template>

<script>
import { TSelect, TOption } from '../../select'
export default {
  name: 'TPage',
  componentName: 'TPage',
  components: {
    TSelect,
    TOption
  },
  props: {
    value: {
      type: Number
    },
    boundaryLinks: {
      type: Boolean,
      'default': false
    },
    directionLinks: {
      type: Boolean,
      'default': true
    },
    size: {
      type: String,
      'default': 'sm'
    },
    maxSize: {
      type: Number,
      'default': 5
    },
    total: {
      type: Number
    },
    pageSizes: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      sliceStart: 0,
      passPage: '',
      pageSize: 0
    }
  },
  watch: {
    value(value) {
      if (value > this.sliceStart + this.maxSize) {
        if (value > this.totalPage - this.maxSize) {
          this.sliceStart = this.totalPage - this.maxSize
        } else {
          this.sliceStart = value - 1
        }
      } else if (value < this.sliceStart + 1) {
        if (value - this.maxSize > 0) {
          this.sliceStart = value - this.maxSize
        } else {
          this.sliceStart = 0
        }
      }
    }
  },
  computed: {
    totalPage() {
      let remainder = this.total % this.pageSize
      let quotient = this.total / this.pageSize
      return remainder ? Math.ceil(quotient) : quotient
    },
    paginationSize() {
      return this.size ? `pagination-${this.size}` : ``
    },
    pageArray() {
      let newArray = []
      for (let i = 0; i < this.totalPage; i++) {
        newArray.push(i)
      }
      return newArray
    },
    sliceArray() {
      let afterSlice = this.pageArray.slice()
      return afterSlice.slice(this.sliceStart, this.sliceStart + this.maxSize)
    }
  },
  created() {
    this.pageSize = this.pageSizes && this.pageSizes[0]
  },
  methods: {
    onPageChange(page) {
      if (page > 0 && page <= this.totalPage) {
        this.$emit('input', page)
        this.$emit('change', {
          currentPage: page,
          pageSize: this.pageSize
        })
      }
    },
    toPage(pre) {
      let start = pre ? this.sliceStart - this.maxSize : this.sliceStart + this.maxSize
      if (start < 0) {
        this.sliceStart = 0
      } else if (start > this.totalPage - this.maxSize) {
        this.sliceStart = this.totalPage - this.maxSize
      } else {
        this.sliceStart = start
      }
    },
    toPassPage() {
      if (Number(this.passPage)) {
        this.onPageChange(Number(this.passPage))
        this.$emit('input', Number(this.passPage))
        this.$emit('change', {
          currentPage: Number(this.passPage),
          pageSize: this.pageSize
        })
      } else {
        console.log('输入正确的页码')
      }
    },
    toDownSelectItem() {
      let currentPageNum = this.value > this.totalPage ? 1 : this.value
      this.$emit('change', {
        currentPage: currentPageNum,
        pageSize: this.pageSize
      })
    }
  }
}
</script>
<style scoped>
.form-control{
  padding: 0
}
</style>
