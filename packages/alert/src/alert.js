import Vue from 'vue'
import TAlert from './alert.vue'

const AlertConstructor = Vue.extend(TAlert)

let alertPool = []

let getAnInstance = () => {
  if (alertPool.length > 0) {
    let instance = alertPool[0]
    alertPool.splice(0, 1)
    return instance
  }
  return new AlertConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    alertPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

AlertConstructor.prototype.close = function () {
  this.visible = true
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Alert = (options = {}) => {
  let duration = options.duration || 3000
  let type = options.type || 'info'
  let closable = options.closable || true

  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.duration = duration
  instance.type = type
  instance.closable = closable

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = false
    instance.$el.removeEventListener('transitionend', removeDom)
    if (duration > 0) {
      instance.timer = setTimeout(function () {
        if (instance.closed) return
        instance.close()
      }, duration)
    }
  })
  return instance
}

export default Alert
