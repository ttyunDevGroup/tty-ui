<template>
  <div>
    <div ref="backdrop" class="t-modal-backdrop" :class="{fade: transitionDuration>0}"></div>
    <div ref="modal"
         class="t-modal"
         :class="{fade:transitionDuration>0}"
         tabindex="-1"
         role="dialog"
         @click="backdropClicked">
      <div ref="dialog" class="t-modal-dialog" :style="{width: width}" :class="[modalSizeClass, modalAlignClass]" role="document">
        <div class="t-modal-content">
          <div class="t-modal-header" v-if="header">
            <slot name="header">
              <button type="button" class="close" aria-label="Close" @click="toggle(false)">
                <i class="t-icon-close" aria-hidden="true"></i>
              </button>
              <h4 class="t-modal-title">
                <slot name="title">{{title}}{{size}}</slot>
              </h4>
            </slot>
          </div>
          <div class="t-modal-body">
            <slot></slot>
          </div>
          <div class="t-modal-footer" v-if="footer">
            <slot name="footer">
              <t-button v-if="showCancelButton" width="120"  @click="cancelFun">
                <span>{{cancelText}}</span>
              </t-button>
              &nbsp;
              <t-button width="120" type="primary" v-if="showConfirmButton" @click="okFun" data-action="auto-focus">
                <span>{{okText}}</span>
              </t-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../utils/domUtils'
import TButton from '../../button/index'
const MODAL_OPEN = 'modal-open'
const IN = 'in'
export default {
  name: 'TModal',
  componentName: 'TModal',
  components: {
    TButton
  },
  props: {
    value: {
      type: Boolean,
      'default': false
    },
    title: {
      type: String
    },
    width: {
      type: String
    },
    size: {
      type: String
    },
    backdrop: {
      type: Boolean,
      'default': false
    },
    footer: {
      type: Boolean,
      'default': true
    },
    header: {
      type: Boolean,
      'default': true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    transitionDuration: {
      type: Number,
      'default': 150
    },
    autoFocus: {
      type: Boolean,
      'default': false
    },
    keyboard: {
      type: Boolean,
      'default': true
    },
    verticalAlign: String,
    showConfirmButton: {
      type: Boolean,
      'default': true
    },
    showCancelButton: {
      type: Boolean,
      'default': true
    }
  },
  data() {
    return {
      msg: '',
      timeoutId: 0
    }
  },
  computed: {
    modalSizeClass() {
      return {
        't-modal-lg': this.size === 'lg',
        't-modal-sm': this.size === 'sm'
      }
    },
    modalAlignClass() {
      return {
        'modal-align-top': this.verticalAlign === 'top',
        'modal-align-middle': this.verticalAlign === 'middle',
        'modal-align-bottom': this.verticalAlign === 'bottom'
      }
    }
  },
  watch: {
    value(v) {
      this.$toggle(v)
    }
  },
  mounted() {
    utils.removeFromDom(this.$refs.backdrop)
    utils.on(window, utils.events.KEY_UP, this.onKeyPress)
    if (this.value) {
      this.$toggle(true)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeoutId)
    utils.removeFromDom(this.$refs.backdrop)
    utils.off(window, utils.events.KEY_UP, this.onKeyPress)
  },
  methods: {
    onKeyPress(event) {
      if (this.keyboard && this.value && event.keyCode === 27) {
        this.toggle(false)
      }
    },
    toggle(show, msg) {
      this.msg = msg
      this.$emit('input', show)
    },
    $toggle(show) {
      let backdrop = this.$refs.backdrop
      let modal = this.$refs.modal
      clearTimeout(this.timeoutId)
      if (show) {
        document.body.appendChild(backdrop)
        modal.style.display = 'block'
        modal.scrollTop = 0
        backdrop.offsetHeight // force repaint
        utils.toggleBodyOverflow(false)
        utils.addClass(backdrop, IN)
        utils.addClass(modal, IN)
        utils.addClass(document.body, MODAL_OPEN)
        this.timeoutId = setTimeout(() => {
          if (this.autoFocus) {
            let btn = this.$el.querySelector('[data-action="auto-focus"]')
            if (btn) {
              btn.focus()
            }
          }
          this.$emit('show')
          this.timeoutId = 0
        }, this.transitionDuration)
      } else {
        utils.removeClass(backdrop, IN)
        utils.removeClass(modal, IN)
        this.timeoutId = setTimeout(() => {
          modal.style.display = 'none'
          utils.removeFromDom(backdrop)
          utils.removeClass(document.body, MODAL_OPEN)
          utils.toggleBodyOverflow(true)
          this.$emit('hide', this.msg || 'dismiss')
          this.msg = ''
          this.timeoutId = 0
        }, this.transitionDuration)
      }
    },
    backdropClicked(event) {
      if (this.backdrop && this.$refs.modal === event.target) {
        this.toggle(false)
      }
    },
    cancelFun() {
      this.toggle(false, 'cancel')
      this.$emit('cancel-click')
    },
    okFun: function () {
      this.toggle(false, 'ok')
      this.$emit('ok-click')
    }
  }
}
</script>
