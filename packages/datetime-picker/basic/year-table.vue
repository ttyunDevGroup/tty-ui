<template>
  <table @click="handleYearTableClick" class="t-year-table">
    <tbody>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 0)">
        <span class="cell">{{ startYear }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 1)">
        <span class="cell">{{ startYear + 1 }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 2)">
        <span class="cell">{{ startYear + 2 }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 3)">
        <span class="cell">{{ startYear + 3 }}</span>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 4)">
        <span class="cell">{{ startYear + 4 }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 5)">
        <span class="cell">{{ startYear + 5 }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 6)">
        <span class="cell">{{ startYear + 6 }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 7)">
        <span class="cell">{{ startYear + 7 }}</span>
      </td>
    </tr>
    <tr>
      <td class="available" :class="getCellStyle(startYear + 8)">
        <span class="cell">{{ startYear + 8 }}</span>
      </td>
      <td class="available" :class="getCellStyle(startYear + 9)">
        <span class="cell">{{ startYear + 9 }}</span>
      </td>
      <td></td>
      <td></td>
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
      year: {}
    },
    computed: {
      startYear() {
        return Math.floor(this.year / 10) * 10
      }
    },
    methods: {
      getCellStyle(year) {
        const style = {}
        var date = new Date(0)
        date.setFullYear(year)
        date.setHours(0)
        var nextYear = new Date(date)
        nextYear.setFullYear(year + 1)
        var flag = false
        if (typeof this.disabledDate === 'function') {
          while (date < nextYear) {
            if (this.disabledDate(date)) {
              date = new Date(date.getTime() + 8.64e7)
            } else {
              break
            }
          }
          if ((date - nextYear) === 0) flag = true
        }
        style.disabled = flag
        style.current = Number(this.year) === year
        return style
      },
      nextTenYear() {
        this.$emit('pick', Number(this.year) + 10, false)
      },
      prevTenYear() {
        this.$emit('pick', Number(this.year) - 10, false)
      },
      handleYearTableClick(event) {
        const target = event.target
        if (target.tagName === 'SPAN') {
          if (domUtils.hasClass(target.parentNode, 'disabled')) return
          const year = target.textContent || target.innerText
          this.$emit('pick', Number(year))
        }
      }
    }
  }
</script>