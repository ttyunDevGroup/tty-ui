<template>
  <ul class="t-select-group__wrap">
    <li class="t-select-group__title" v-show="visible">{{ label }}</li>
    <li>
      <ul class="t-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script>
  import Emitter from '../../mixins/emitter'
  export default {
    mixins: [Emitter],
    name: 'TOptionGroup',
    componentName: 'TOptionGroup',
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
        this.broadcast('TOption', 'handleGroupDisabled', val)
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
        this.broadcast('TOption', 'handleGroupDisabled', this.disabled)
      }
    }
  }
</script>
