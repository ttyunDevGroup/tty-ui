<template>
  <label class="t-radio" :style="{ width: defineWidth }">
    <span class="t-radio-input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }"
    >
      <span class="t-radio-inner"></span>
      <input
        class="t-radio-original"
        :value="label"
        type="radio"
        v-model="model"
        :name="name"
        :disabled="isDisabled">
    </span>
    <span class="t-radio-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  import Emitter from '../../mixins/emitter'
  export default {
    name: 'TRadio',
    componentName: 'TRadio',
    mixins: [Emitter],
    props: {
      value: {},
      label: {},
      disabled: Boolean,
      name: String,
      width: String
    },
    data() {
      return {
      }
    },
    computed: {
      isGroup() {
        let parent = this.$parent
        while(parent) {
          if(parent.$options.componentName !== 'TRadioGroup') {
            parent = parent.$parent
          } else {
            this._radioGroup = parent
            return true
          }
        }
        return false
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set(val) {
          if(this.isGroup) {
            this.dispatch('TRadioGroup', 'input', [val])
          } else {
            this.$emit('input', val)
          }
        }
      },
      isDisabled() {
        return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled
      },
      defineWidth() {
        return this.isGroup ? this._radioGroup.width || this.width : this.width
      }
    }
  }
</script>