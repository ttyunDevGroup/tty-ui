<template>
  <div class="t-option-tree">
    <t-tree :data="optionTreeData" :props="optionTreeProps" :node-key="nodeKey" :default-expanded-keys="defaultExpandedKeys" :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree"></t-tree>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter'
import { getValueByPath } from '../../utils'
import TTree from '../../tree'
export default {
  mixins: [Emitter],
  name: 'TOptionTree',
  componentName: 'TOptionTree',
  components: {
    TTree
  },
  props: {
    treeData: {
      type: Array
    },
    treeProps: Object,
    nodeKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      value: '',
      label: '',
      index: -1,
      groupDisabled: false,
      hitState: false,
      defaultExpandedKeys: []
    }
  },
  computed: {
    optionTreeData() {
      return this.treeData
    },
    optionTreeProps() {
      return this.treeProps
    },
    isObject() {
      return Object.prototype.toString.call(this.value).toLowerCase() === '[object object]'
    },
    currentLabel() {
      return this.label || (this.isObject ? '' : this.value)
    },
    currentValue() {
      return this.value || this.label || ''
    },
    parent() {
      let result = this.$parent
      while (!result.isSelect) {
        result = result.$parent
      }
      return result
    },
    itemSelected() {
      if (!this.parent.multiple) {
        return this.isEqual(this.value, this.parent.value)
      } else {
        return this.contains(this.parent.value, this.value)
      }
    },
    limitReached() {
      if (this.parent.multiple) {
        return !this.itemSelected && this.parent.value.length >= this.parent.multipleLimit && this.parent.multipleLimit > 0
      } else {
        return false
      }
    },
    labelKey() {
      return this.treeProps.label || 'label'
    },
    childrenKey() {
      return this.treeProps.children || 'children'
    }
  },
  watch: {
    currentLabel() {
      if (!this.parent.remote) this.dispatch('TSelect', 'setSelected')
    },
    value() {
      if (!this.parent.remote) this.dispatch('TSelect', 'setSelected')
    }
  },
  methods: {
    isEqual(a, b) {
      if (!this.isObject) {
        return a === b
      } else {
        const valueKey = this.parent.valueKey
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
      }
    },
    contains(arr = [], target) {
      if (!this.isObject) {
        return arr.indexOf(target) > -1
      } else {
        const valueKey = this.parent.valueKey
        return arr.some(item => {
          return getValueByPath(item, valueKey) === getValueByPath(target, valueKey)
        })
      }
    },
    handleGroupDisabled(val) {
      this.groupDisabled = val
    },
    hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.parent.hoverIndex = this.parent.options.indexOf(this)
      }
    },
    handleNodeClick(data) {
      if (!data[this.childrenKey] || !data[this.childrenKey].length) {
        this.value = data[this.nodeKey]
        this.label = data[this.labelKey]
        this.dispatch('TSelect', 'handleOptionClick', this)
      }
    },
    filterNode(value, data, node) {
      if (!value) return true
      return (!data[this.childrenKey] || (data[this.childrenKey] && !data[this.childrenKey].length)) && new RegExp(value, 'i').test(data[this.labelKey])
    },
    queryChange(query) { // query 里如果有正则中的特殊字符，需要先将这些字符转义
      let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1')
      this.$refs.tree.filter(parsedQuery)
    },
    setCurrentKey(value) {
      if(this.treeData.length) {
        this.$refs.tree.setCurrentKey(value)
        let currentNode = this.$refs.tree.getCurrentNode()
        this.value = currentNode[this.nodeKey]
        this.label = currentNode[this.labelKey]
        this.defaultExpandedKeys = [this.value]
      }
    },
    resetIndex() {
      this.$nextTick(() => {
        this.index = this.parent.options.indexOf(this)
      })
    }
  },
  created() {
    this.parent.options.push(this)
    this.parent.cachedOptions.push(this)
    this.parent.optionsCount++
    this.parent.filteredOptionsCount++
    this.index = this.parent.options.indexOf(this)
    this.$on('queryChange', this.queryChange)
    this.$on('setCurrentKey', this.setCurrentKey)
    this.$on('handleGroupDisabled', this.handleGroupDisabled)
    this.$on('resetIndex', this.resetIndex)
  },
  beforeDestroy() {
    this.dispatch('TSelect', 'onOptionDestroy', this)
  }
}
</script>
