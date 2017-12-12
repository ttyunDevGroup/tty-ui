<template>
  <div
    class="t-switch"
    :class="{ 'is-disabled': disabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="disabled"
    @click="switchValue"
  >
    <input
      class="t-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @keydown.enter="switchValue"
    >
    <span
      :class="['t-switch__label', 't-switch__labb--left', checked ? 'is-active' : '']"
      v-show="checked"
      v-if="showText && (activeIconClass || activeText)">
      <i class="iconfont" :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="checked">{{ activeText }}</span>
    </span>    
    <span class="t-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
      <span class="t-switch__button" :style="{ transform }"></span>
    </span>
    <span
      :class="['t-switch__label', 't-switch__labb--right', !checked ? 'is-active' : '']"
      v-show="!checked"
      v-if="showText && (inactiveIconClass || inactiveText)">
      <i class="iconfont" :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="!checked">{{ inactiveText }}</span>
    </span>
  </div>
</template>
<script>

export default {
  name: 'TSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    showText: { type: Boolean, default: false },
    activeText: { type: String, default: '开' },
    inactiveText: { type: String, default: '关' },
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      coreWidth: this.width
    }
  },
  created() {
    if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
      this.$emit('input', this.inactiveValue)
    }
  },
  computed: {
    checked() {
      return this.value === this.activeValue
    },
    transform() {
      return this.checked ? `translate3d(${this.coreWidth - 22}px, 0, 0)` : ''
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor()
      }
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('input', !this.checked ? this.activeValue : this.inactiveValue)
      this.$emit('change', !this.checked ? this.activeValue : this.inactiveValue)
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked
      })
    },
    setBackgroundColor() {
      let newColor = this.checked ? this.activeColor : this.inactiveColor
      this.$refs.core.style.borderColor = newColor
      this.$refs.core.style.backgroundColor = newColor
    },
    switchValue() {
      this.$refs.input.click()
    }
  },
  mounted() {
    /* istanbul ignore if */
    this.coreWidth = this.width || 40
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor()
    }
    this.$refs.input.checked = this.checked
  }
}
</script>
