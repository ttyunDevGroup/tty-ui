<template>
  <ul class="b-select-group__wrap">
    <li class="b-select-group__title" v-show="visible">{{ label }}</li>
    <li>
      <ul class="b-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
  import Emitter from '@/utils/mixins/emitter'
  export default {
    mixins: [Emitter],
    name: 'BOptionGroup',
    componentName: 'BOptionGroup',
    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        visible: true
      }
    },
    watch: {
      disabled(val) {
        this.broadcast('BOption', 'handleGroupDisabled', val)
      }
    },
    methods: {
      queryChange() {
        this.visible = this.$children && Array.isArray(this.$children) && this.$children.some(option => option.visible === true)
      }
    },
    created() {
      this.$on('queryChange', this.queryChange)
    },
    mounted() {
      if(this.disabled) {
        this.broadcast('BOption', 'handleGroupDisabled', this.disabled)
      }
    }
  }
</script>
