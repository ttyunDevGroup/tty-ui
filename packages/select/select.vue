/*
 * @Author: 姜海华 
 * @Date: 2017-11-08 18:57:06 
 * @Last Modified by: 姜海华
 * @Last Modified time: 2017-11-20 15:44:11
 */
<template>
  <div class="b-select" v-clickoutside="handleClose">
    <div class="b-select__tags" v-if="multiple" @click.stop="toggleMenu" ref="tags" :style="{ 'max-width': inputWidth - 35 + 'px' }">
      <transition-group @after-leave="resetInputHeight">
        <b-tag v-for="item in selected" :key="getValueKey(item)" :closable="!disabled" :hit="item.hitState" @close="deleteTag($event, item)" close-transition>
          <span class="b-select__tags-text">{{ item.currentLabel }}</span>
        </b-tag>
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
    <b-input ref="reference" v-model="selectedLabel" type="text" :placeholder="currentPlaceholder" :name="name" :size="size" :width="width" :disabled="disabled" readonly :validate-event="false" @focus="handleFocus" @click="handleIconClick" @mousedown.native="handleMouseDown" @keyup.native="debouncedOnInputChange" @keydown.native.down.prevent="navigateOptions('next')" @keydown.native.up.prevent="navigateOptions('prev')" @keydown.native.enter.prevent="selectOption" @keydown.native.esc.stop.prevent="visible = false" @keydown.native.tab="visible = false" @paste.native="debouncedOnInputChange" @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false" :icon="iconClass"></b-input>
    <transition name="b-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <b-select-dropdown ref="popper" v-show="visible">
        <div type="text" class="b-select-query" v-if="filterable">
          <i class="iconfont icon-search"></i>
          <input type="text" class="b-select-query__input" @keydown.enter.stop.prevent="doFilter" v-model="query" :debounce="remote ? 300 : 0" ref="input">
          <div class="b-query-button" :class="{'active': query}" @click="doFilter">检索</div>
        </div>
        <b-scrollbar tag="ul" wrap-class="b-select-dropdown__wrap" view-class="b-select-dropdown__list" v-show="options.length > 0 && !loading">
          <slot></slot>
        </b-scrollbar>
        <p class="b-select-dropdown__empty" v-if="emptyText">{{ emptyText }}</p>
        <div class="b-select-create__option" v-if="allowCreate">
          <slot name="footer">
            <button type="button" class="b-select-create__btn btn btn-default" @click="createMethod">{{createButtonText}}</button>
          </slot>
        </div>
      </b-select-dropdown>
    </transition>
  </div>
</template>

<script>
import Emitter from '@/utils/mixins/emitter'
import BInput from '@/components/input'
import BSelectDropdown from './select-dropdown'
import BOption from './option'
import BTag from '@/components/tag/tag'
import BScrollbar from '@/components/scrollbar'
import debounce from 'throttle-debounce/debounce'
import Clickoutside from '@/utils/directives/clickoutside'
import domUtils from '@/utils/domUtils'
import { addResizeListener, removeResizeListener } from '@/utils/resize-event'
import scrollIntoView from '@/utils/scroll-into-view'
import { getValueByPath } from '@/utils'

export default {
  mixins: [Emitter],
  name: 'BSelect',
  componentName: 'BSelect',
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
    BInput,
    BSelectDropdown,
    BOption,
    BTag,
    BScrollbar
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
      this.dispatch('BFormItem', 'b.form.change', val)
    },
    visible(val) {
      if (!val) {
        this.$refs.reference.$el.querySelector('input').blur()
        this.handleIconHide()
        this.broadcast('BSelectDropdown', 'destroyPopper')
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
        this.broadcast('BSelectDropdown', 'updatePopper')
        if (this.filterable) {
          // this.query = this.selectedLabel
          if (this.multiple) {
            this.$refs.input.focus()
          } else {
            if (!this.remote) {
              this.broadcast('BOption', 'queryChange', '')
              this.broadcast('BOptionGroup', 'queryChange')
              this.broadcast('BOptionTree', 'queryChange', '')
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
        const menu = this.$refs.popper.$el.querySelector('.b-select-dropdown__wrap')
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
          this.broadcast('BSelectDropdown', 'updatePopper')
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
        this.visible = !this.visible
        if (this.visible) {
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
            this.broadcast('BSelectDropdown', 'updatePopper')
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
        this.broadcast('BOption', 'resetIndex')
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val)
        this.broadcast('BOptionGroup', 'queryChange')
      } else {
        this.filteredOptionsCount = this.optionsCount
        this.broadcast('BOption', 'queryChange', val)
        this.broadcast('BOptionGroup', 'queryChange')
        this.broadcast('BOptionTree', 'queryChange', val)
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
      this.broadcast('BOption', 'resetIndex')
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

<style lang="scss">
.b-select-dropdown {
  position: absolute;
  z-index: 1001;
  margin: 4px 0;
  border: 1px solid #00a53c;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  color: #333;
}

.b-select-dropdown.is-multiple .b-select-dropdown__item {
  padding-left: 32px;
}

.b-select-dropdown.is-multiple .b-select-dropdown__item::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 10px;
  top: 7px;
  z-index: 10;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  background-color: #fff;
  z-index: 1;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}

.b-select-dropdown.is-multiple .b-select-dropdown__item.selected {
  background-color: #ffb;
}

.b-select-dropdown.is-multiple .b-select-dropdown__item.selected.hover {
  background-color: #ff9;
}

.b-select-dropdown.is-multiple .b-select-dropdown__item.selected::before {
  border-color: #00a53c;
}

.b-select-dropdown.is-multiple .b-select-dropdown__item::after {
  content: "";
  display: inline-block;
  position: absolute;
  left: 15px;
  top: 9px;
  z-index: 20;
  width: 4px;
  height: 8px;
  box-sizing: content-box;
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg) scaleY(0);
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
  transform-origin: center;
}

.b-select-dropdown.is-multiple .b-select-dropdown__item.selected::after {
  border-color: #00a53c;
  transform: rotate(45deg) scaleY(1);
}

.b-select-dropdown__empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.b-select-dropdown__wrap {
  max-height: 317px;
}

.b-select-dropdown__list {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.b-select-dropdown__item {
  font-size: 14px;
  padding: 0 10px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.b-select-dropdown__item.hover,
.b-select-dropdown__item:hover {
  background-color: #ffd;
}

.b-select-dropdown__item.selected {
  background-color: #ffb;
}

.b-select-dropdown__item.selected.hover {
  background-color: #ff9;
}

.b-select-dropdown__item.is-disabled {
  color: rgb(191, 217, 203);
  cursor: not-allowed;
}

.b-select-dropdown__item.is-disabled:hover {
  background-color: #fff;
}

.b-select-group {
  margin: 0;
  padding: 0;
}

.b-select-group .b-select-dropdown__item {
  padding-left: 20px;
}

.b-select-group__wrap {
  list-style: none;
  margin: 0;
  padding: 0;
}

.b-select-group__title {
  padding-left: 10px;
  font-size: 12px;
  color: #999;
  height: 30px;
  line-height: 30px;
}

.b-select {
  position: relative;
}

.b-select .form-control[readonly],
.b-select fieldset[disabled] .form-control {
  background-color: #fff;
}

.b-select .form-control[disabled] {
  cursor: not-allowed;
}

.b-select .input-group-inner .form-control[readonly]:focus {
  border-color: #00a53c;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 3px rgba(0, 165, 60, 0.6);
}

.b-select
  .input-group-inner
  .form-control[readonly]
  ~ .input-group-inner-addon {
  color: #666;
  background-color: #fafafa;
  border-color: #ccc;
}

.b-select
  .input-group-inner
  .form-control[readonly]
  ~ .input-group-inner-addon:hover {
  box-shadow: inset 0 0 1000px rgba(0, 0, 0, 0.1);
}

.b-select
  .input-group-inner
  .form-control[readonly]:focus
  ~ .input-group-inner-addon {
  color: #00a53c;
  background-color: #e6f5eb;
  border-color: #00a53c;
}

.b-select .b-input__inner {
  cursor: pointer;
  padding-right: 35px;
}

.b-select .b-input__inner:focus {
  border-color: #00a53c;
}

.b-select .b-input .b-input__icon {
  cursor: pointer;
  &:before {
    display: block;
  }
  &.is-reverse:before {
    transform: rotateZ(180deg);
  }
}

.b-select .b-input.is-disabled .b-input__inner {
  cursor: not-allowed;
}

.b-select > .b-input {
  display: block;
}

.b-select .b-tag__close {
  margin-top: -2px;
}

.b-select .b-tag {
  height: 24px;
  line-height: 24px;
  margin: 3px 0 3px 6px;
}

.b-select__input {
  border: none;
  outline: 0;
  padding: 0;
  color: #666;
  font-size: 14px;
  vertical-align: baseline;
  background-color: transparent;
}

.b-select__close {
  cursor: pointer;
  position: absolute;
  top: 8px;
  z-index: 1000;
  right: 25px;
  color: rgb(191, 217, 203);
  line-height: 18px;
  font-size: 12px;
}

.b-select__close:hover {
  color: rgb(151, 190, 171);
}

.b-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 10;
  top: 0;
}

.b-select__tag {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #00a53c;
}

.b-select__tag .b-icon-close {
  font-size: 12px;
}

.b-select-query {
  position: relative;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ddd;

  .icon-search {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    padding: 0 6px 0 10px;
    font-size: 16px;
    color: #999;
  }

  .b-select-query__input {
    width: 100%;
    height: 100%;
    padding: 0 60px 0 32px;
    border: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    &:focus,
    &:active {
      outline: 0;
    }

    &::-moz-placeholder {
      color: #999;
      opacity: 1;
    }
    &:-ms-input-placeholder {
      color: #999;
    }
    &::-webkit-input-placeholder {
      color: #999;
    }
  }

  .b-query-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding: 0 15px;
    background-color: #fafafa;
    color: #ccc;
    border-left: 1px solid #ddd;
    border-top-right-radius: 4px;

    &.active {
      color: #00a53c;
    }
  }
}

.b-select-create__option {
  .b-select-create__btn {
    width: 100%;
    border-width: 0;
    padding-left: 10px;
    padding-right: 10px;
    color: #00a53c;
    background-color: #e6f5eb;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #f5f5f5;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    text-align: left;
  }
}
</style>