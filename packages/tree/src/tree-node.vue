<template>
  <div
    class="t-tree-node"
    @click.stop="handleClick"
    v-show="node.visible"
    :class="{
      'is-expanded': expanded,
      'is-current': tree.store.leafMode ? tree.store.currentNode === node && !node.childNodes.length : tree.store.currentNode === node,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
  >
    <div class="t-tree-node__content"
          :date="tree.indent"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 10 + 'px' }">
      <span
        class="t-tree-node__expand-icon"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>
      <t-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
        class="tree-check"
      >
      </t-checkbox>
      <span
        v-if="node.loading"
        class="t-tree-node__loading-icon b-icon-loading">
      </span>
      <node-content :node="node"></node-content>
    </div>
    <t-collapse-transition>
      <div
        class="t-tree-node__children"
        v-if="childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <t-tree-node
          :render-content="renderContent"
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :node="child"
          @node-expand="handleChildNodeExpand">
        </t-tree-node>
      </div>
    </t-collapse-transition>
  </div>
</template>

<script>
import TCollapseTransition from '../utils/collapse-transition'
import { TCheckbox } from '../../checkbox/index'
import Emitter from '../../mixins/emitter'

export default {
  name: 'TTreeNode',
  componentName: 'TTreeNode',
  mixins: [Emitter],
  props: {
    node: {
      default() {
        return {}
      }
    },
    props: {},
    renderContent: Function
  },
  components: {
    TCollapseTransition,
    TCheckbox,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent
        const node = this.node
        const data = node.data
        const store = node.store
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { _self: parent.tree.$vnode.context, node, data, store })
            : <span class="t-tree-node__label">{this.node.label}</span>
        )
      }
    }
  },
  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      showCheckbox: false,
      oldChecked: null,
      oldIndeterminate: null
    }
  },
  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val)
    },

    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate)
    },

    'node.expanded'(val) {
      this.$nextTick(() => { this.expanded = val })
      if (val) {
        this.childNodeRendered = true
      }
    }
  },
  methods: {
    getNodeKey(node, index) {
      const nodeKey = this.tree.nodeKey
      if (nodeKey && node) {
        return node.data[nodeKey]
      }
      return index
    },

    handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate)
      }
      this.oldChecked = checked
      this.indeterminate = indeterminate
    },

    handleClick() {
      const store = this.tree.store
      if (!(store.leafMode && this.node.childNodes.length)) {
        store.setCurrentNode(this.node)
        this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode)
        this.tree.currentNode = this
      }

      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick()
      }
      this.tree.$emit('node-click', this.node.data, this.node, this)
    },

    handleExpandIconClick() {
      if (this.node.isLeaf) return
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    },

    handleCheckChange(ev) {
      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly)
    },

    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('TTreeNode', 'tree-node-expand', node)
      this.tree.$emit('node-expand', nodeData, node, instance)
    }
  },

  created() {
    const parent = this.$parent

    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    

    const tree = this.tree
    if (!tree) {
      console.warn('Can not find node\'s tree.')
    }

    const props = tree.props || {}
    const childrenKey = props['children'] || 'children'

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren()
    })

    this.showCheckbox = tree.showCheckbox
    if (this.node.expanded) {
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        if (this.node !== node) {
          this.node.collapse()
        }
      })
    }
  }
}
</script>