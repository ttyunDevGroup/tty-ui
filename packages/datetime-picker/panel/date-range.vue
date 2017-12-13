<template>
  <transition name="b-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div v-show="visible" :style="{ width: width + 'px' }" class="t-picker-panel t-date-range-picker" :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]">
      <div class="t-picker-panel__body-wrapper">
        <slot name="sidebar" class="t-picker-panel__sidebar"></slot>
        <div class="t-picker-panel__sidebar" v-if="shortcuts">
          <button type="button" class="t-picker-panel__shortcut" v-for="shortcut in shortcuts" @click="handleShortcutClick(shortcut)">{{shortcut.text}}</button>
        </div>
        <div class="t-picker-panel__body">
          <div class="t-date-range-picker__time-header" v-if="showTime">
            <span class="t-date-range-picker__editors-wrap">
              <span class="t-date-range-picker__time-picker-wrap">
                <t-input
                  size="small"
                  ref="minInput"
                  placeholder="开始日期"
                  class="t-date-range-picker__editor"
                  :value="minVisibleDate"
                  @input.native="handleDateInput($event, 'min')"
                  @change.native="handleDateChange($event, 'min')"></t-input>
              </span>
            <span class="t-date-range-picker__time-picker-wrap">
                <t-input
                  size="small"
                  placeholder="开始时间"
                  class="t-date-range-picker__editor"
                  :value="minVisibleTime"
                  @focus="minTimePickerVisible = !minTimePickerVisible"
                  @change.native="handleTimeChange($event, 'min')"></t-input>
                <time-picker
                  :picker-width="minPickerWidth"
                  ref="minTimePicker"
                  :date="minDate"
                  @pick="handleMinTimePick"
                  :visible="minTimePickerVisible">
                </time-picker>
              </span>
            </span>
            <span class="iconfont icon-next"></span>
            <span class="t-date-range-picker__editors-wrap is-right">
              <span class="t-date-range-picker__time-picker-wrap">
                <t-input
                  size="small"
                  placeholder="结束日期"
                  class="t-date-range-picker__editor"
                  :value="maxVisibleDate"
                  :readonly="!minDate"
                  @input.native="handleDateInput($event, 'max')"
                  @change.native="handleDateChange($event, 'max')"></t-input>
              </span>
            <span class="t-date-range-picker__time-picker-wrap">
                <t-input
                  size="small"
                  ref="maxInput"
                  placeholder="结束时间"
                  class="t-date-range-picker__editor"
                  :value="maxVisibleTime"
                  @focus="minDate && (maxTimePickerVisible = !maxTimePickerVisible)"
                  :readonly="!minDate"
                  @change.native="handleTimeChange($event, 'max')"></t-input>
                <time-picker
                  :picker-width="maxPickerWidth"
                  ref="maxTimePicker"
                  :date="maxDate"
                  @pick="handleMaxTimePick"
                  :visible="maxTimePickerVisible"></time-picker>
              </span>
            </span>
          </div>
          <div class="t-picker-panel__content t-date-range-picker__content is-left">
            <div class="t-date-range-picker__header">
              <button type="button" @click="prevYear" class="t-picker-panel__icon-btn iconfont icon-first"></button>
              <button type="button" @click="prevMonth" class="t-picker-panel__icon-btn iconfont icon-front"></button>
              <div>{{ leftLabel }}</div>
            </div>
            <date-table selection-mode="range" :date="date" :year="leftYear" :month="leftMonth" :min-date="minDate" :max-date="maxDate" :range-state="rangeState" :disabled-date="disabledDate" @changerange="handleChangeRange" :first-day-of-week="firstDayOfWeek" @pick="handleRangePick"></date-table>
          </div>
          <div class="t-picker-panel__content t-date-range-picker__content is-right">
            <div class="t-date-range-picker__header">
              <button type="button" @click="nextYear" class="t-picker-panel__icon-btn iconfont icon-last"></button>
              <button type="button" @click="nextMonth" class="t-picker-panel__icon-btn iconfont icon-next"></button>
              <div>{{ rightLabel }}</div>
            </div>
            <date-table selection-mode="range" :date="rightDate" :year="rightYear" :month="rightMonth" :min-date="minDate" :max-date="maxDate" :range-state="rangeState" :disabled-date="disabledDate" @changerange="handleChangeRange" :first-day-of-week="firstDayOfWeek" @pick="handleRangePick"></date-table>
          </div>
        </div>
      </div>
      <div class="t-picker-panel__footer" v-if="showTime">
        <a class="t-picker-panel__link-btn" @click="handleClear">清空</a>
        <button type="button" class="t-picker-panel__btn" @click="handleConfirm()" :disabled="btnDisabled">确定</button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { nextMonth, prevMonth, toDate, formatDate, parseDate } from '../util'
  import TimePicker from './time'
  import DateTable from '../basic/date-table'
  import TInput from '../../input'
  export default {
    components: {
      TimePicker,
      DateTable,
      TInput
    },
    computed: {
      btnDisabled() {
        return !(this.minDate && this.maxDate && !this.selecting)
      },
      leftLabel() {
        return this.date.getFullYear() + ' 年 ' + (this.date.getMonth() + 1) + ' 月'
      },
      rightLabel() {
        return this.rightDate.getFullYear() + ' 年 ' + (this.rightDate.getMonth() + 1) + ' 月'
      },
      leftYear() {
        return this.date.getFullYear()
      },
      leftMonth() {
        return this.date.getMonth()
      },
      rightYear() {
        return this.rightDate.getFullYear()
      },
      rightMonth() {
        return this.rightDate.getMonth()
      },
      minVisibleDate() {
        return this.minDate ? formatDate(this.minDate) : ''
      },
      maxVisibleDate() {
        return(this.maxDate || this.minDate) ? formatDate(this.maxDate || this.minDate) : ''
      },
      minVisibleTime() {
        return this.minDate ? formatDate(this.minDate, 'HH:mm:ss') : ''
      },
      maxVisibleTime() {
        return(this.maxDate || this.minDate) ? formatDate(this.maxDate || this.minDate, 'HH:mm:ss') : ''
      },
      rightDate() {
        const newDate = new Date(this.date)
        const month = newDate.getMonth()
        newDate.setDate(1)
        if(month === 11) {
          newDate.setFullYear(newDate.getFullYear() + 1)
          newDate.setMonth(0)
        } else {
          newDate.setMonth(month + 1)
        }
        return newDate
      }
    },
    data() {
      return {
        popperClass: '',
        minPickerWidth: 0,
        maxPickerWidth: 0,
        date: new Date(),
        minDate: '',
        maxDate: '',
        rangeState: {
          endDate: null,
          selecting: false,
          row: null,
          column: null
        },
        showTime: false,
        shortcuts: '',
        value: '',
        visible: '',
        disabledDate: '',
        firstDayOfWeek: 7,
        minTimePickerVisible: false,
        maxTimePickerVisible: false,
        width: 0
      }
    },
    watch: {
      showTime(val) {
        if(!val) return
        this.$nextTick(_ => {
          const minInputElm = this.$refs.minInput.$el
          const maxInputElm = this.$refs.maxInput.$el
          if(minInputElm) {
            this.minPickerWidth = minInputElm.getBoundingClientRect().width + 10
          }
          if(maxInputElm) {
            this.maxPickerWidth = maxInputElm.getBoundingClientRect().width + 10
          }
        })
      },
      minDate() {
        this.$nextTick(() => {
          if(this.maxDate && this.maxDate < this.minDate) {
            const format = 'HH:mm:ss'
            this.$refs.maxTimePicker.selectableRange = [
              [
                parseDate(formatDate(this.minDate, format), format),
                parseDate('23:59:59', format)
              ]
            ]
          }
        })
      },
      minTimePickerVisible(val) {
        if(val) this.$nextTick(() => this.$refs.minTimePicker.ajustScrollTop())
      },
      maxTimePickerVisible(val) {
        if(val) this.$nextTick(() => this.$refs.maxTimePicker.ajustScrollTop())
      },
      value(newVal) {
        if(!newVal) {
          this.minDate = null
          this.maxDate = null
        } else if(Array.isArray(newVal)) {
          this.minDate = newVal[0] ? toDate(newVal[0]) : null
          this.maxDate = newVal[1] ? toDate(newVal[1]) : null
          if(this.minDate) this.date = new Date(this.minDate)
          this.handleConfirm(true)
        }
      }
    },
    methods: {
      handleClear() {
        this.minDate = null
        this.maxDate = null
        this.handleConfirm(false)
      },
      handleDateInput(event, type) {
        const value = event.target.value
        const parsedValue = parseDate(value, 'yyyy-MM-dd')
        if(parsedValue) {
          if(typeof this.disabledDate === 'function' &&
            this.disabledDate(new Date(parsedValue))) {
            return
          }
          const target = new Date(type === 'min' ? this.minDate : this.maxDate)
          if(target) {
            target.setFullYear(parsedValue.getFullYear())
            target.setMonth(parsedValue.getMonth(), parsedValue.getDate())
          }
        }
      },
      handleChangeRange(val) {
        this.minDate = val.minDate
        this.maxDate = val.maxDate
        this.rangeState = val.rangeState
      },
      handleDateChange(event, type) {
        const value = event.target.value
        const parsedValue = parseDate(value, 'yyyy-MM-dd')
        if(parsedValue) {
          const target = new Date(type === 'min' ? this.minDate : this.maxDate)
          if(target) {
            target.setFullYear(parsedValue.getFullYear())
            target.setMonth(parsedValue.getMonth(), parsedValue.getDate())
          }
          if(type === 'min') {
            if(target < this.maxDate) {
              this.minDate = new Date(target.getTime())
            }
          } else {
            if(target > this.minDate) {
              this.maxDate = new Date(target.getTime())
              if(this.minDate && this.minDate > this.maxDate) {
                this.minDate = null
              }
            }
          }
        }
      },
      handleTimeChange(event, type) {
        const value = event.target.value
        const parsedValue = parseDate(value, 'HH:mm:ss')
        if(parsedValue) {
          const target = new Date(type === 'min' ? this.minDate : this.maxDate)
          if(target) {
            target.setHours(parsedValue.getHours())
            target.setMinutes(parsedValue.getMinutes())
            target.setSeconds(parsedValue.getSeconds())
          }
          if(type === 'min') {
            if(target < this.maxDate) {
              this.minDate = new Date(target.getTime())
            }
          } else {
            if(target > this.minDate) {
              this.maxDate = new Date(target.getTime())
            }
          }
          this.$refs[type + 'TimePicker'].value = target
          this[type + 'TimePickerVisible'] = false
        }
      },
      handleRangePick(val, close = true) {
        if(this.maxDate === val.maxDate && this.minDate === val.minDate) {
          return
        }
        this.onPick && this.onPick(val)
        this.maxDate = val.maxDate
        this.minDate = val.minDate
        if(!close || this.showTime) return
        this.handleConfirm()
      },
      changeToToday() {
        this.date = new Date()
      },
      handleShortcutClick(shortcut) {
        if(shortcut.onClick) {
          shortcut.onClick(this)
        }
      },
      resetView() {
        this.minTimePickerVisible = false
        this.maxTimePickerVisible = false
      },
      setTime(date, value) {
        let oldDate = new Date(date.getTime())
        let hour = value.getHours()
        let minute = value.getMinutes()
        let second = value.getSeconds()
        oldDate.setHours(hour)
        oldDate.setMinutes(minute)
        oldDate.setSeconds(second)
        return new Date(oldDate.getTime())
      },
      handleMinTimePick(value, visible, first) {
        this.minDate = this.minDate || new Date()
        if(value) {
          this.minDate = this.setTime(this.minDate, value)
        }
        if(!first) {
          this.minTimePickerVisible = visible
        }
      },
      handleMaxTimePick(value, visible, first) {
        if(!this.maxDate) {
          const now = new Date()
          if(now >= this.minDate) {
            this.maxDate = new Date()
          }
        }
        if(this.maxDate && value) {
          this.maxDate = this.setTime(this.maxDate, value)
        }
        if(!first) {
          this.maxTimePickerVisible = visible
        }
      },
      prevMonth() {
        this.date = prevMonth(this.date)
      },
      nextMonth() {
        this.date = nextMonth(this.date)
      },
      nextYear() {
        const date = this.date
        date.setFullYear(date.getFullYear() + 1)
        this.resetDate()
      },
      prevYear() {
        const date = this.date
        date.setFullYear(date.getFullYear() - 1)
        this.resetDate()
      },
      handleConfirm(visible = false) {
        this.$emit('pick', [this.minDate, this.maxDate], visible)
      },
      resetDate() {
        this.date = new Date(this.date)
      }
    }
  }
</script>