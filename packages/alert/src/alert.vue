<template>
  <transition name="t-alert-fade">
    <div role="alert" :class="alertClass" v-show="realShow">
      <button type="button" class="t-close" aria-label="Close" v-if="closable" @click="closeAlert"><span aria-hidden="true">&times;</span></button>
      <slot>
        <template v-if="message">{{message}}</template>
      </slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'TAlert',
    componentName: 'TAlert',
    props: {
      show: {
        Boolean,
        default: false
      },
      closable: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 3000
      },
      type: {
        type: String,
        default: 'warning'
      },
      message: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        timeout: 0,
        visible: true
      }
    },
    computed: {
      realShow() {
        return this.show === this.visible
      },
      alertClass() {
        if (!this.type) {
          this.type = 'info'
        }
        return `t-alert t-alert-${this.type}`
      }
    },
    watch: {
      'realShow'(newVal, oldVal) {
        if (newVal && this.duration > 0) {
          this.timeout = setTimeout(this.closeAlert, this.duration)
        }
      }
    },
    methods: {
      closeAlert() {
        clearTimeout(this.timeout)
        this.visible = !this.show
        this.$emit('close')
      }
    },
    destroyed() {
      clearTimeout(this.timeout)
    }
  }
</script>