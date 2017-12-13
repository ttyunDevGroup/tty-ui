<template>
  <transition name="b-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div v-show="visible" :style="{
        width: width + 'px'
      }" class="t-picker-panel t-date-picker" :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]">
      <div class="t-picker-panel__body-wrapper">
        <slot name="sidebar" class="t-picker-panel__sidebar"></slot>
        <div class="t-picker-panel__sidebar" v-if="shortcuts">
          <button type="button" class="t-picker-panel__shortcut" v-for="shortcut in shortcuts" @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</button>
        </div>
        <div class="t-picker-panel__body">
          <div class="t-date-picker__time-header" v-if="showTime">
            <span class="t-date-picker__editor-wrap">
              <t-input
                placeholder="选择日期"
                :value="visibleDate"
                size="small"
                @change.native="visibleDate = $event.target.value"></t-input>
            </span>
            <span class="t-date-picker__editor-wrap">
              <t-input
                ref="input"
                @focus="timePickerVisible = !timePickerVisible"
                placeholder="选择时间"
                :value="visibleTime"
                size="small"
                @change.native="visibleTime = $event.target.value"></t-input>
              <time-picker
                ref="timepicker"
                :date="date"
                :picker-width="pickerWidth"
                @pick="handleTimePick"
                :visible="timePickerVisible"
                @mounted="$refs.timepicker.format=timeFormat">
              </time-picker>
            </span>
          </div>
          <div class="t-date-picker__header" v-show="currentView !== 'time'">
            <button type="button" @click="prevYear" class="t-picker-panel__icon-btn t-date-picker__prev-btn iconfont icon-first">
            </button>
            <button type="button" @click="prevMonth" v-show="currentView === 'date'" class="t-picker-panel__icon-btn t-date-picker__prev-btn iconfont icon-front">
            </button>
            <span @click="showYearPicker" class="t-date-picker__header-label">{{ yearLabel }}</span>
            <span @click="showMonthPicker" v-show="currentView === 'date'" class="t-date-picker__header-label" :class="{ active: currentView === 'month' }">{{month + 1}} 月</span>
            <button type="button" @click="nextYear" class="t-picker-panel__icon-btn t-date-picker__next-btn iconfont icon-last">
            </button>
            <button type="button" @click="nextMonth" v-show="currentView === 'date'" class="t-picker-panel__icon-btn t-date-picker__next-btn iconfont icon-next">
            </button>
          </div>

          <div class="t-picker-panel__content">
            <date-table v-show="currentView === 'date'" @pick="handleDatePick" :year="year" :month="month" :date="date" :week="week" :selection-mode="selectionMode" :first-day-of-week="firstDayOfWeek" :disabled-date="disabledDate">
            </date-table>
            <year-table ref="yearTable" :year="year" :date="date" v-show="currentView === 'year'" @pick="handleYearPick" :disabled-date="disabledDate">
            </year-table>
            <month-table :month="month" :date="date" v-show="currentView === 'month'" @pick="handleMonthPick" :disabled-date="disabledDate">
            </month-table>
          </div>
        </div>
      </div>

      <div class="t-picker-panel__footer" v-show="footerVisible && currentView === 'date'">
        <a class="t-picker-panel__link-btn" @click="changeToNow">此刻</a>
        <button type="button" class="t-picker-panel__btn" @click="confirm">确定</button>
      </div>
    </div>
  </transition>
</template>

<script>
  import { formatDate, parseDate, getWeekNumber } from '../util'
  import TInput from '../../input'
  import TimePicker from './time'
  import YearTable from '../basic/year-table'
  import MonthTable from '../basic/month-table'
  import DateTable from '../basic/date-table'
  export default {
    watch: {
      showTime(val) {
        /* istanbul ignore if */
        if(!val) return
        this.$nextTick(_ => {
          const inputElm = this.$refs.input.$el
          if(inputElm) {
            this.pickerWidth = inputElm.getBoundingClientRect().width + 10
          }
        })
      },
      value(newVal) {
        if(!newVal) return
        newVal = new Date(newVal)
        if(!isNaN(newVal)) {
          if(typeof this.disabledDate === 'function' &&
            this.disabledDate(new Date(newVal))) {
            return
          }
          this.date = newVal
          this.year = newVal.getFullYear()
          this.month = newVal.getMonth()
          this.$emit('pick', newVal, false)
        }
      },
      timePickerVisible(val) {
        if(val) this.$nextTick(() => this.$refs.timepicker.ajustScrollTop())
      },
      selectionMode(newVal) {
        if(newVal === 'month') {
          /* istanbul ignore next */
          if(this.currentView !== 'year' || this.currentView !== 'month') {
            this.currentView = 'month'
          }
        } else if(newVal === 'week') {
          this.week = getWeekNumber(this.date)
        }
      },
      date(newVal) {
        this.year = newVal.getFullYear()
        this.month = newVal.getMonth()
        if(this.selectionMode === 'week') this.week = getWeekNumber(newVal)
      }
    },
    methods: {
      handleClear() {
        this.date = this.$options.defaultValue ? new Date(this.$options.defaultValue) : new Date()
        this.$emit('pick')
      },
      resetDate() {
        this.date = new Date(this.date)
      },
      showMonthPicker() {
        this.currentView = 'month'
      },
      showYearPicker() {
        this.currentView = 'year'
      },
      prevMonth() {
        this.month--
          if(this.month < 0) {
            this.month = 11
            this.year--
          }
      },
      nextMonth() {
        this.month++
          if(this.month > 11) {
            this.month = 0
            this.year++
          }
      },
      nextYear() {
        if(this.currentView === 'year') {
          this.$refs.yearTable.nextTenYear()
        } else {
          this.year++
            this.date.setFullYear(this.year)
          this.resetDate()
        }
      },
      prevYear() {
        if(this.currentView === 'year') {
          this.$refs.yearTable.prevTenYear()
        } else {
          this.year--
            this.date.setFullYear(this.year)
          this.resetDate()
        }
      },
      handleShortcutClick(shortcut) {
        if(shortcut.onClick) {
          shortcut.onClick(this)
        }
      },
      handleTimePick(picker, visible, first) {
        if(picker) {
          let oldDate = new Date(this.date.getTime())
          let hour = picker.getHours()
          let minute = picker.getMinutes()
          let second = picker.getSeconds()
          oldDate.setHours(hour)
          oldDate.setMinutes(minute)
          oldDate.setSeconds(second)
          this.date = new Date(oldDate.getTime())
        }
        if(!first) {
          this.timePickerVisible = visible
        }
      },
      handleMonthPick(month) {
        this.month = month
        const selectionMode = this.selectionMode
        if(selectionMode !== 'month') {
          this.date.setMonth(month)
          this.currentView = 'date'
          this.resetDate()
        } else {
          this.date.setMonth(month)
          this.year && this.date.setFullYear(this.year)
          this.resetDate()
          const value = new Date(this.date.getFullYear(), month, 1)
          this.$emit('pick', value)
        }
      },
      handleDatePick(value) {
        if(this.selectionMode === 'day') {
          if(!this.showTime) {
            this.$emit('pick', new Date(value.getTime()))
          }
          this.date.setFullYear(value.getFullYear())
          this.date.setMonth(value.getMonth(), value.getDate())
        } else if(this.selectionMode === 'week') {
          this.week = value.week
          this.$emit('pick', value.date)
        }
        this.resetDate()
      },
      handleYearPick(year, close = true) {
        this.year = year
        if(!close) return
        this.date.setFullYear(year)
        if(this.selectionMode === 'year') {
          this.$emit('pick', new Date(year, 0, 1))
        } else {
          this.currentView = 'month'
        }
        this.resetDate()
      },
      changeToNow() {
        this.date.setTime(+new Date())
        this.$emit('pick', new Date(this.date.getTime()))
        this.resetDate()
      },
      confirm() {
        this.date.setMilliseconds(0)
        this.$emit('pick', this.date)
      },
      resetView() {
        if(this.selectionMode === 'month') {
          this.currentView = 'month'
        } else if(this.selectionMode === 'year') {
          this.currentView = 'year'
        } else {
          this.currentView = 'date'
        }
        if(this.selectionMode !== 'week') {
          this.year = this.date.getFullYear()
          this.month = this.date.getMonth()
        }
      }
    },
    components: {
      TimePicker,
      YearTable,
      MonthTable,
      DateTable,
      TInput
    },
    mounted() {
      if(this.date && !this.year) {
        this.year = this.date.getFullYear()
        this.month = this.date.getMonth()
      }
    },
    data() {
      return {
        popperClass: '',
        pickerWidth: 0,
        date: this.$options.defaultValue ? new Date(this.$options.defaultValue) : new Date(),
        value: '',
        showTime: false,
        selectionMode: 'day',
        shortcuts: '',
        visible: false,
        currentView: 'date',
        disabledDate: '',
        firstDayOfWeek: 7,
        year: null,
        month: null,
        week: null,
        showWeekNumber: false,
        timePickerVisible: false,
        width: 0,
        format: ''
      }
    },
    computed: {
      footerVisible() {
        return this.showTime
      },
      visibleTime: {
        get() {
          return formatDate(this.date, this.timeFormat)
        },
        set(val) {
          if(val) {
            const date = parseDate(val, this.timeFormat)
            if(date) {
              date.setFullYear(this.date.getFullYear())
              date.setMonth(this.date.getMonth())
              date.setDate(this.date.getDate())
              this.date = date
              this.$refs.timepicker.value = date
              this.timePickerVisible = false
            }
          }
        }
      },
      visibleDate: {
        get() {
          return formatDate(this.date, this.dateFormat)
        },
        set(val) {
          const date = parseDate(val, this.dateFormat)
          if(!date) {
            return
          }
          if(typeof this.disabledDate === 'function' && this.disabledDate(date)) {
            return
          }
          date.setHours(this.date.getHours())
          date.setMinutes(this.date.getMinutes())
          date.setSeconds(this.date.getSeconds())
          this.date = date
          this.resetView()
        }
      },
      yearLabel() {
        const year = this.year
        if(!year) return ''
        const yearTranslation = '年'
        if(this.currentView === 'year') {
          const startYear = Math.floor(year / 10) * 10
          if(yearTranslation) {
            return startYear + ' ' + yearTranslation + ' - ' + (startYear + 9) + ' ' + yearTranslation
          }
          return startYear + ' - ' + (startYear + 9)
        }
        return this.year + ' ' + yearTranslation
      },
      timeFormat() {
        if(this.format && this.format.indexOf('ss') === -1) {
          return 'HH:mm'
        } else {
          return 'HH:mm:ss'
        }
      },
      dateFormat() {
        if(this.format) {
          return this.format.replace('HH:mm', '').replace(':ss', '').trim()
        } else {
          return 'yyyy-MM-dd'
        }
      }
    }
  }
</script>