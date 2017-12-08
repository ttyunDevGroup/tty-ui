<template>
  <div :class="[
    type === 'textarea' ? 'b-textarea' : 'b-input',
    {
      'b-input-group': $slots.prepend || $slots.append,
      'b-input-group--append': $slots.append,
      'b-input-group--prepend': $slots.prepend,
      'input-group-inner': icon || $slots.icon
    }
  ]" class="clearfix" :style="{ width: width }">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="b-input-group__prepend hover-layer" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input v-if="type !== 'textarea'" class="b-input__inner form-control" :class="[size ? 'input-' + size : '']" v-bind="$props" :autocomplete="autoComplete" :value="currentValue" ref="input" @input="handleInput" @focus="handleFocus" @blur="handleBlur">
      <!-- input 图标 -->
      <slot name="icon">
        <i class="b-input__icon iconfont input-group-inner-addon" :class="[
            'icon-' + icon,
            onIconClick ? 'is-clickable' : '',
            size ? 'input-' + size : ''
          ]" v-if="icon" @click="handleIconClick">
        </i>
      </slot>
      <i class="b-input__icon b-icon-loading" v-if="validating"></i>
      <!-- 后置元素 -->
      <div class="b-input-group__append hover-layer" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea v-else class="form-control" :value="currentValue" @input="handleInput" ref="textarea" v-bind="$props" :style="textareaStyle" @focus="handleFocus" @blur="handleBlur"></textarea>
  </div>
</template>
<script>
  import Emitter from '../../mixins/emitter'
  import calcTextareaHeight from './calcTextareaHeight'
  import domUtils from '../../utils/domUtils'

  export default {
    name: 'TInput',
    componentName: 'TInput',
    mixins: [Emitter],
    data() {
      return {
        currentValue: this.value,
        textareaCalcStyle: {}
      }
    },
    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      width: String,
      resize: String,
      autofocus: Boolean,
      icon: String,
      readonly: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      onIconClick: Function
    },
    computed: {
      validating() {
        return this.$parent.validateState === 'validating'
      },
      textareaStyle() {
        return Object.assign({}, this.textareaCalcStyle, {
          resize: this.resize
        })
      }
    },
    watch: {
      'value' (val, oldValue) {
        this.setCurrentValue(val)
      }
    },
    methods: {
      handleBlur(event) {
        this.$emit('blur', event)
        if(this.validateEvent) {
          this.dispatch('BFormItem', 'b.form.blur', [this.currentValue])
        }
      },
      inputSelect() {
        this.$refs.input.select()
      },
      /* 处理IE浏览器下，readonly时，按下Backspace按钮会回退上一浏览页面问题 */
      preventIEBackspace() {
        let inputEl = this.$refs.input
        if(inputEl) {
          let callback = (event) => {
            if(event.keyCode === 8) {
              event.preventDefault()
            }
          }
          if(this.readonly) {
            domUtils.on(inputEl, domUtils.events.KEY_DOWN, callback)
          } else {
            domUtils.off(inputEl, domUtils.events.KEY_DOWN, callback)
          }
        }
      },
      resizeTextarea() {
        if(this.$isServer) return
        var {
          autosize,
          type
        } = this
        if(!autosize || type !== 'textarea') return
        const minRows = autosize.minRows
        const maxRows = autosize.maxRows
        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
      },
      handleFocus(event) {
        this.$emit('focus', event)
      },
      handleInput(event) {
        const value = event.target.value
        this.$emit('input', value)
        this.setCurrentValue(value)
        this.$emit('change', value)
      },
      handleIconClick(event) {
        if(this.onIconClick) {
          this.onIconClick(event)
        }
        this.$emit('click', event)
      },
      setCurrentValue(value) {
        if(value === this.currentValue) return
        this.$nextTick(_ => {
          this.resizeTextarea()
        })
        this.currentValue = value
        if(this.validateEvent) {
          this.dispatch('BFormItem', 'b.form.change', [value])
        }
      }
    },
    created() {
      this.$on('inputSelect', this.inputSelect)
    },
    mounted() {
      this.preventIEBackspace()
      this.resizeTextarea()
    }
  }
</script>