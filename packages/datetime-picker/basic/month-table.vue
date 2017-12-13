<template>
  <table @click="handleMonthTableClick" class="t-month-table">
    <tbody>
    <tr>
      <td :class="getCellStyle(0)">
        <span class="cell">一月</span>
      </td>
      <td :class="getCellStyle(1)">
        <span class="cell">二月</span>
      </td>
      <td :class="getCellStyle(2)">
        <span class="cell">三月</span>
      </td>
      <td :class="getCellStyle(3)">
        <span class="cell">四月</span>
      </td>
    </tr>
    <tr>
      <td :class="getCellStyle(4)">
        <span class="cell">五月</span>
      </td>
      <td :class="getCellStyle(5)">
        <span class="cell">六月</span>
      </td>
      <td :class="getCellStyle(6)">
        <span class="cell">七月</span>
      </td>
      <td :class="getCellStyle(7)">
        <span class="cell">八月</span>
      </td>
    </tr>
    <tr>
      <td :class="getCellStyle(8)">
        <span class="cell">九月</span>
      </td>
      <td :class="getCellStyle(9)">
        <span class="cell">十月</span>
      </td>
      <td :class="getCellStyle(10)">
        <span class="cell">十一</span>
      </td>
      <td :class="getCellStyle(11)">
        <span class="cell">十二</span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
  import domUtils from '../../utils/domUtils'
  export default {
    props: {
      disabledDate: {},
      date: {},
      month: {
        type: Number
      }
    },
    methods: {
      getCellStyle(month) {
        const style = {}
        var year = this.date.getFullYear()
        var date = new Date(0)
        date.setFullYear(year)
        date.setMonth(month)
        date.setHours(0)
        var nextMonth = new Date(date)
        nextMonth.setMonth(month + 1)
        var flag = false
        if (typeof this.disabledDate === 'function') {
          while (date < nextMonth) {
            if (this.disabledDate(date)) {
              date = new Date(date.getTime() + 8.64e7)
              flag = true
            } else {
              flag = false
              break
            }
          }
        }
        style.disabled = flag
        style.current = this.month === month
        return style
      },
      handleMonthTableClick(event) {
        const target = event.target
        if (target.tagName !== 'SPAN') return
        if (domUtils.hasClass(target.parentNode, 'disabled')) return
        const column = target.parentNode.cellIndex
        const row = target.parentNode.parentNode.rowIndex
        const month = row * 4 + column
        this.$emit('pick', month)
      }
    }
  }
</script>