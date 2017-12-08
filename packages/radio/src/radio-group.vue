<template>
  <div class="t-radio-group">
    <slot></slot>
  </div>
</template>
<script>
  import Emitter from '../../mixins/emitter'
  export default {
    name: 'TRadioGroup',
    componentName: 'TRadioGroup',
    mixins: [Emitter],
    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean,
      width: String
    },
    watch: {
      value(value) {
        this.$emit('change', value)
        this.dispatch('TFormItem', 't.form.change', [this.value])
      }
    }
  }
</script>
