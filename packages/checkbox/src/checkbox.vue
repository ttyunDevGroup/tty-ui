<template>
  <label v-if="defineTpye === 'button'" class="t-checkbox-button" :class="{'is-checked': isChecked,'is-disabled': disabled}">
    <input
        v-if="trueLabel || falseLabel"
        class="t-checkbox-original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange">
    <input
        v-else
        class="t-checkbox-original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
    <span class="t-checkbox-button-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default && showLabel">{{label}}</template>
    </span>
  </label>
  <label v-else class="t-checkbox" :style="{ width: defineWidth }">
    <span class="t-checkbox-input"
      :class="{
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate
      }"
    >
      <span class="t-checkbox-inner"></span>
      <input
        v-if="trueLabel || falseLabel"
        class="t-checkbox-original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange">
      <input
        v-else
        class="t-checkbox-original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
    </span>
    <span class="t-checkbox-label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default && showLabel">{{label}}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '../../mixins/emitter'
export default {
  name: 'TCheckbox',
  componentName: 'TCheckbox',
  mixins: [Emitter],
  data() {
    return {
      selfModel: false
    }
  },
  computed: {
    model: {
      get() {
        return this.isGroup
          ? this.store
          : this.value !== undefined ? this.value : this.selfModel
      },
      set(val) {
        if (this.isGroup) {
          let isLimitExceeded = false
          if (
            this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min
          ) {
            isLimitExceeded = true
          }

          if (
            this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max
          ) {
            isLimitExceeded = true
          }

          if (!isLimitExceeded) {
            this.dispatch('TCheckboxGroup', 'input', [val])
          }
        } else {
          this.$emit('input', val)
          this.selfModel = val
        }
      }
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel
      }
    },
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'TCheckboxGroup') {
          parent = parent.$parent
        } else {
          this._checkboxGroup = parent
          return true
        }
      }
      return false
    },
    defineTpye() {
      return this.isGroup ? this._checkboxGroup.type || this.type : this.type
    },
    defineWidth() {
      return this.isGroup
        ? this._checkboxGroup.width || this.width
        : this.width
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    }
  },
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    showLabel: {
      type: Boolean,
      default: true
    },
    type: String,
    width: String
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label)
      } else {
        this.model = this.trueLabel || true
      }
    },
    handleChange(ev) {
      this.$emit('change', ev)
      if (this.isGroup) {
        this.$nextTick(_ => {
          this.dispatch('TCheckboxGroup', 'change', [
            this._checkboxGroup.value,
            this._checkboxGroup.index
          ])
        })
      }
    }
  },
  created() {
    this.checked && this.addToStore()
  }
}
</script>
