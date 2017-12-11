/*
 * @Author: 姜海华 
 * @Date: 2017-11-08 18:57:06 
 * @Last Modified by: 姜海华
 * @Last Modified time: 2017-11-20 15:44:11
 */
<template>
  <div class="t-select" v-clickoutside="handleClose">
    <div class="t-select__tags" v-if="multiple" @click.stop="toggleMenu" ref="tags" :style="{ 'max-width': inputWidth - 35 + 'px' }">
      <transition-group @after-leave="resetInputHeight">
        <t-tag v-for="item in selected" :key="getValueKey(item)" :closable="!disabled" :hit="item.hitState" @close="deleteTag($event, item)" close-transition>
          <span class="t-select__tags-text">{{ item.currentLabel }}</span>
        </t-tag>
      </transition-group>
      <!-- <input
        type="text"
        class="b-select__input"
        :disabled="disabled"
        @focus="handleFocus"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        :debounce="remote ? 300 : 0"
        v-if="filterable"
        ref="input"> -->
    </div>
    <t-input ref="reference" v-model="selectedLabel" type="text" :placeholder="currentPlaceholder" :name="name" :size="size" :width="width" :disabled="disabled" readonly :validate-event="false" @focus="handleFocus" @click="handleIconClick" @mousedown.native="handleMouseDown" @keyup.native="debouncedOnInputChange" @keydown.native.down.prevent="navigateOptions('next')" @keydown.native.up.prevent="navigateOptions('prev')" @keydown.native.enter.prevent="selectOption" @keydown.native.esc.stop.prevent="visible = false" @keydown.native.tab="visible = false" @paste.native="debouncedOnInputChange" @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false" :icon="iconClass"></t-input>
    <transition name="b-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <t-select-dropdown ref="popper" v-show="visible">
        <div type="text" class="t-select-query" v-if="filterable">
          <i class="t-icon-search icon-search"></i>
          <input type="text" class="t-select-query__input" @keydown.enter.stop.prevent="doFilter" v-model="query" :debounce="remote ? 300 : 0" ref="input">
          <div class="t-query-button" :class="{'active': query}" @click="doFilter">检索</div>
        </div>
        <t-scrollbar tag="ul" wrap-class="t-select-dropdown__wrap" view-class="t-select-dropdown__list" v-show="options.length > 0 && !loading">
          <slot></slot>
        </t-scrollbar>
        <p class="t-select-dropdown__empty" v-if="emptyText">{{ emptyText }}</p>
        <div class="t-select-create__option" v-if="allowCreate">
          <slot name="footer">
            <button type="button" class="t-select-create__btn btn btn-default" @click="createMethod">{{createButtonText}}</button>
          </slot>
        </div>
      </t-select-dropdown>
    </transition>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter'
import TInput from '../../input'
import TSelectDropdown from './select-dropdown'
import TOption from './option'
import TTag from '../../tag/tag'
import TScrollbar from '../../scrollbar'
import debounce from 'throttle-debounce/debounce'
import Clickoutside from '../../utils/directives/clickoutside'
import domUtils from '../../utils/domUtils'
import { addResizeListener, removeResizeListener } from '../../utils/resize-event'
import scrollIntoView from '../../utils/scroll-into-view'
import { getValueByPath } from '../../utils'

export default {
  mixins: [Emitter],
  name: 'TSelect',
  componentName: 'TSelect',
  computed: {
    iconClass() {
      let criteria = this.clearable && !this.disabled && this.inputHovering && !this.multiple && this.value !== undefined && this.value !== ''
      return criteria ? 'close' : 'zhankai'
    },
    debounce() {
      return this.remote ? 300 : 0
    },
    emptyText() {
      if (this.loading) {
        return this.loadingText || '加载中'
      } else {
        if (this.filterable && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || '无匹配数据'
        }
        if (this.options.length === 0) {
          return this.noDataText || '无数据'
        }
      }
      return null
    }
  },
  components: {
    TInput,
    TSelectDropdown,
    TOption,
    TTag,
    TScrollbar
  },
  directives: {
    Clickoutside
  },
  props: {
    name: String,
    value: {
      required: true
    },
    size: String,
    width: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    createButtonText: { type: String, default: '添加' },
    createMethod: Function,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default() {
        return '请输入关键词'
      }
    },
    defaultFirstOption: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      options: [],
      cachedOptions: [],
      selected: this.multiple ? [] : {},
      isSelect: true,
      inputWidth: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      optionsAllDisabled: false,
      inputHovering: false,
      currentPlaceholder: ''
    }
  },
  watch: {
    disabled() {
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },
    placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val
    },
    value(val) {
      if (this.multiple) {
        this.resetInputHeight()
        if (val.length > 0 || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = ''
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder
        }
      }
      this.setSelected()
      this.$emit('change', val)
      this.dispatch('TFormItem', 't.form.change', val)
    },
    visible(val) {
      if (!val) {
        this.$refs.reference.$el.querySelector('input').blur()
        this.handleIconHide()
        this.broadcast('TSelectDropdown', 'destroyPopper')
        if (this.$refs.input) {
          this.$refs.reference.$el.querySelector('input').blur()
        }
        setTimeout(() => {
          this.query = ''
          this.doFilter()
        }, 500)
        this.selectedLabel = ''
        this.resetHoverIndex()
        this.$nextTick(() => {
          if (this.$refs.input && this.$refs.input.value === '' && this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder
          }
        })
        if (!this.multiple) {
          if (this.selected) {
            this.selectedLabel = this.selected.currentLabel
            // if (this.filterable) this.query = this.selectedLabel
          }
        }
      } else {
        this.handleIconShow()
        this.broadcast('TSelectDropdown', 'updatePopper')
        if (this.filterable) {
          // this.query = this.selectedLabel
          if (this.multiple) {
            this.$refs.input.focus()
          } else {
            if (!this.remote) {
              this.broadcast('TOption', 'queryChange', '')
              this.broadcast('TOptionGroup', 'queryChange')
              this.broadcast('TOptionTree', 'queryChange', '')
            }
            // this.broadcast('BInput', 'inputSelect')
          }
        }
      }
      this.$emit('visible-change', val)
    },
    options(val) {
      if (this.multiple) {
        this.resetInputHeight()
      }
      let inputs = this.$el.querySelectorAll('input')
      if ([].indexOf.call(inputs, document.activeBement) === -1) {
        this.setSelected()
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption()
      }
    }
  },
  methods: {
    handleIconHide() {
      let icon = this.$el.querySelector('.b-input__icon')
      if (icon) {
        domUtils.removeClass(icon, 'is-reverse')
      }
    },
    handleIconShow() {
      let icon = this.$el.querySelector('.b-input__icon')
      if (icon && !domUtils.hasClass(icon, 'b-icon-circle-close')) {
        domUtils.addClass(icon, 'is-reverse')
      }
    },
    scrollToOption(option) {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el
      if (this.$refs.popper && target) {
        const menu = this.$refs.popper.$el.querySelector('.t-select-dropdown__wrap')
        scrollIntoView(menu, target)
      }
    },
    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected))
    },
    getOption(value) {
      let option
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i]
        const isEqual = isObject ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey) : String(cachedOption.value) === String(value)
        if (isEqual) {
          option = cachedOption
          break
        }
      }
      if (option) return option
      const label = !isObject ? value : ''
      let newOption = {
        value: value,
        currentLabel: label
      }
      if (this.multiple) {
        newOption.hitState = false
      }
      return newOption
    },
    setSelected() {
      if (!this.multiple) {
        if (this.$el.querySelectorAll('.b-tree').length) {
          this.broadcast('BOptionTree', 'setCurrentKey', this.value)
        }
        let option = this.getOption(this.value)
        this.selectedLabel = option.currentLabel
        this.selected = option

        return
      }
      let result = []
      if (Array.isArray(this.value)) {
        this.value.forEach(value => {
          result.push(this.getOption(value))
        })
      }
      this.selected = result
      this.$nextTick(() => {
        this.resetInputHeight()
      })
    },
    handleFocus() {
      this.visible = true
    },
    handleIconClick(event) {
      if (this.iconClass.indexOf('close') > -1) {
        this.deleteSelected(event)
      } else {
        this.toggleMenu()
      }
    },
    handleMouseDown(event) {
      if (event.target.tagName !== 'INPUT') return
      if (this.visible) {
        this.handleClose()
        event.preventDefault()
      }
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy()
      this.dropdownUl = null
    },
    handleClose() {
      this.visible = false
    },
    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return
      const option = this.selected[this.selected.length - 1]
      if (!option) return
      if (hit === true || hit === false) {
        option.hitState = hit
        return hit
      }
      option.hitState = !option.hitState
      return option.hitState
    },
    deletePrevTag(e) {
      if (e.target.value.length <=
        0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice()
        value.pop()
        this.$emit('input', value)
      }
    },
    managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder
      }
    },
    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false)
      this.resetInputHeight()
    },
    resetInputHeight() {
      this.$nextTick(() => {
        if (!this.$refs.reference) return
        // let inputChildNodes = this.$refs.reference.$el.childNodes
        // let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        // input.style.height = Math.max(this.$refs.tags.clientHeight + 6, sizeMap[this.size] || 30) + 'px'
        if (this.visible && this.emptyText !== false) {
          this.broadcast('TSelectDropdown', 'updatePopper')
        }
      })
    },
    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected)
        } else {
          if (this.selected.length > 0) {
            this.hoverIndex = Math.min.apply(null, this.selected.map(item => this.options.indexOf(item)))
          } else {
            this.hoverIndex = -1
          }
        }
      }, 300)
    },
    handleOptionSelect(option) {
      if (this.multiple) {
        const value = this.value.slice()
        const optionIndex = this.getValueIndex(value, option.value)
        if (optionIndex > -1) {
          value.splice(optionIndex, 1)
        } else if (this.multipleLimit <=
          0 || value.length < this.multipleLimit) {
          value.push(option.value)
        }
        this.$emit('input', value)
        // if (option.created) {
        //   this.query = ''
        // }
        if (this.filterable) this.$refs.input.focus()
      } else {
        this.$emit('input', option.value)
        this.visible = false
      }
      this.$nextTick(() => this.scrollToOption(option))
    },
    getValueIndex(arr = [], value) {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]'
      if (!isObject) {
        return arr.indexOf(value)
      } else {
        const valueKey = this.valueKey
        let index = -1
        arr.some((item, i) => {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
            index = i
            return true
          }
          return false
        })
        return index
      }
    },
    toggleMenu() {
      if (this.filterable && this.query === '' && this.visible) {
        return
      }
      if (!this.disabled) {
        this.visible = !this.visibles
        if (this.visible && this.$children[0].$refs.input) {
          this.$children[0].$refs.input.focus()
        }
      }
    },
    navigateOptions(direction) {
      if (!this.visible) {
        this.visible = true
        return
      }
      if (this.options.length === 0 || this.filteredOptionsCount === 0) return
      this.optionsAllDisabled = this.options.length === this.options.filter(item => item.disabled === true).length
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0
          }
          if (this.options[this.hoverIndex].disabled === true || this.options[this.hoverIndex].groupDisabled === true || !this.options[this.hoverIndex].visible) {
            this.navigateOptions('next')
          }
        }
        if (direction === 'prev') {
          this.hoverIndex--
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1
          }
          if (this.options[this.hoverIndex].disabled === true || this.options[this.hoverIndex].groupDisabled === true || !this.options[this.hoverIndex].visible) {
            this.navigateOptions('prev')
          }
        }
      }
      this.$nextTick(() => this.scrollToOption(this.options[this.hoverIndex]))
    },
    selectOption() {
      if (this.options[this.hoverIndex]) {
        this.handleOptionSelect(this.options[this.hoverIndex])
      }
    },
    deleteSelected(event) {
      event.stopPropagation()
      this.$emit('input', '')
      this.visible = false
      this.$emit('clear')
    },
    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag)
      if (index > -1 && !this.disabled) {
        const value = this.value.slice()
        value.splice(index, 1)
        this.$emit('input', value)
        this.$emit('remove-tag', tag)
      }
      event.stopPropagation()
    },
    doFilter() {
      let val = this.query
      if (val === null || val === undefined) {
        return this.$nextTick(() => {
          if (this.visible) {
            this.broadcast('TSelectDropdown', 'updatePopper')
          }
        })
      }
      this.hoverIndex = -1
      if (this.multiple && this.filterable) {
        this.managePlaceholder()
        this.resetInputHeight()
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1
        this.remoteMethod(val)
        this.broadcast('TOption', 'resetIndex')
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val)
        this.broadcast('TOptionGroup', 'queryChange')
      } else {
        this.filteredOptionsCount = this.optionsCount
        this.broadcast('TOption', 'queryChange', val)
        this.broadcast('TOptionGroup', 'queryChange')
        this.broadcast('TOptionTree', 'queryChange', val)
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption()
      }
    },
    onInputChange() {
      // if (this.filterable) {
      //   this.query = this.selectedLabel
      // }
    },
    onOptionDestroy(option) {
      this.optionsCount--
      this.filteredOptionsCount--
      let index = this.options.indexOf(option)
      if (index > -1) {
        this.options.splice(index, 1)
      }
      this.broadcast('TOption', 'resetIndex')
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    },
    handleResize() {
      this.resetInputWidth()
      if (this.multiple) this.resetInputHeight()
    },
    checkDefaultFirstOption() {
      this.hoverIndex = -1
      for (let i = 0; i !== this.options.length; ++i) {
        const option = this.options[i]
        if (this.query) {
          // pick first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i
            break
          }
        } else {
          // pick currently selected option
          if (option.itemSelected) {
            this.hoverIndex = i
            break
          }
        }
      }
    },
    getValueByPath(object, prop) {
      prop = prop || ''
      const paths = prop.split('.')
      let current = object
      let result = null
      for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i]
        if (!current) break

        if (i === j - 1) {
          result = current[path]
          break
        }
        current = current[path]
      }
      return result
    },
    getValueKey(item) {
      if (Object.prototype.toString.call(item.value).toLowerCase() !== '[object object]') {
        return item.value
      } else {
        return getValueByPath(item.value, this.valueKey)
      }
    }
  },
  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', [])
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '')
    }
    this.debouncedOnInputChange = debounce(this.debounce, () => {
      this.onInputChange()
    })
    this.$on('handleOptionClick', this.handleOptionSelect)
    this.$on('onOptionDestroy', this.onOptionDestroy)
    this.$on('setSelected', this.setSelected)
  },
  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = ''
    }
    addResizeListener(this.$el, this.handleResize)
    if (this.remote && this.multiple) {
      this.resetInputHeight()
    }
    this.$nextTick(() => {
      if (this.$refs.reference && this.$refs.reference.$el) {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
      }
    })
    this.setSelected()
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  }
}
</script>