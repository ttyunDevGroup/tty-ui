let domUtils = {
  events: {
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    FOCUS: 'focus',
    BLUR: 'blur',
    CLICK: 'click',
    INPUT: 'input',
    KEY_DOWN: 'keydown',
    KEY_UP: 'keyup',
    KEY_PRESS: 'keypress'
  },
  triggers: {
    CLICK: 'click',
    HOVER: 'hover',
    FOCUS: 'focus',
    HOVER_FOCUS: 'hover-focus',
    OUTSIDE_CLICK: 'outside-click',
    MANUAL: 'manual'
  },
  placements: {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  },
  on: function (element, event, handler) {
    element.addEventListener(event, handler)
  },
  off: function (element, event, handler) {
    element.removeEventListener(event, handler)
  },
  removeFromDom: function (element) {
    try {
      element.parentNode.removeChild(element)
    } catch (e) {
      // Silent
    }
  },
  addClass: function (element, className) {
    if (element.className) {
      var classes = element.className.split(' ')
      if (classes.indexOf(className) < 0) {
        classes.push(className)
        element.className = classes.join(' ')
      }
    } else {
      element.className = className
    }
  },
  removeClass: function (element, className) {
    if (element.className) {
      var classes = element.className.split(' ')
      var newClasses = []
      for (var i = 0, l = classes.length; i < l; i++) {
        if (classes[i] !== className) {
          newClasses.push(classes[i])
        }
      }
      element.className = newClasses.join(' ')
    }
  },
  hasClass: function (element, className) {
    var classes = element.className.split(' ')
    for (var i = 0, l = classes.length; i < l; i++) {
      if (classes[i] === className) {
        return true
      }
    }
    return false
  },
  hasScrollbar: function (element) {
    return element.scrollHeight > element.clientHeight
  },
  getViewportSize: function () {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    return {
      width: width,
      height: height
    }
  },
  savedScreenSize: null,
  scrollbarWidth: null,
  getScrollbarWidth: function (recalculate) {
    recalculate = recalculate || false
    var screenSize = this.getViewportSize()
      // return directly when already calculated & not force recalculate & screen size not changed
    if (this.scrollbarWidth !== null && !recalculate &&
      screenSize.height === this.savedScreenSize.height && screenSize.width === this.savedScreenSize.width) {
      return this.scrollbarWidth
    }
    if (document.readyState === 'loading') {
      return null
    }
    var div1 = document.createElement('div')
    var div2 = document.createElement('div')
    div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px'
    div1.style.overflow = 'scroll'
    div2.style.overflow = 'hidden'
    document.body.appendChild(div1)
    document.body.appendChild(div2)
    this.scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight)
    document.body.removeChild(div1)
    document.body.removeChild(div2)
      // save new screen size
    this.savedScreenSize = screenSize
    return this.scrollbarWidth
  },
  toggleBodyOverflow: function (enable) {
    if (enable) {
      document.body.style.paddingRight = null
    } else {
      if (this.hasScrollbar(document.documentElement)) {
        document.body.style.paddingRight = this.getScrollbarWidth() + 'px'
      }
    }
  },
  setDropdownPosition(dropdown, trigger, options = {}) {
    let doc = document.documentElement
    let containerScrollLeft = (
      window.pageXOffset || doc.scrollLeft) - (
      doc.clientLeft || 0)
    let containerScrollTop = (
      window.pageYOffset || doc.scrollTop) - (
      doc.clientTop || 0)
    let rect = trigger.getBoundingClientRect()
    let dropdownRect = dropdown.getBoundingClientRect()
    dropdown.style.right = 'auto'
    dropdown.style.bottom = 'auto'
    if (options.menuRight) {
      dropdown.style.left = containerScrollLeft + rect.left + rect.width - dropdownRect.width + 'px'
    } else {
      dropdown.style.left = containerScrollLeft + rect.left + 'px'
    }
    if (options.dropup) {
      dropdown.style.top = containerScrollTop + rect.top - dropdownRect.height - 4 + 'px'
    } else {
      dropdown.style.top = containerScrollTop + rect.top + rect.height + 'px'
    }
  },
  ensureElementMatchesFunction() {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          let matches = (
            this.document || this.ownerDocument).querySelectorAll(s)
          let i = matches.length
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1
        }
    }
  },
  setTooltipPosition(tooltip, trigger, placement, auto, appendToSelector) {
    let container
    let containerScrollTop
    let containerScrollLeft
    if (typeof appendToSelector === 'undefined' || appendToSelector === 'body') {
      container = document.body
      let doc = document.documentElement
      containerScrollLeft = (
        window.pageXOffset || doc.scrollLeft) - (
        doc.clientLeft || 0)
      containerScrollTop = (
        window.pageYOffset || doc.scrollTop) - (
        doc.clientTop || 0)
    } else {
      container = document.querySelector(appendToSelector)
      containerScrollLeft = container.scrollLeft
      containerScrollTop = container.scrollTop
    }
    // auto adjust placement
    if (auto) {
      let placements = [domUtils.placements.TOP, domUtils.placements.RIGHT, domUtils.placements.BOTTOM, domUtils.placements.LEFT]
      if (!this.isAvailableAtPosition(trigger, tooltip, placement)) {
        for (let i = 0, l = placements.length; i < l; i++) {
          for (let j = 0; j < l; j++) {
            this.removeClass(tooltip, placements[j])
          }
          this.addClass(tooltip, placements[i])
          if (this.isAvailableAtPosition(trigger, tooltip, placements[i])) {
            placement = placements[i]
            break
          }
        }
      }
    }
    // fix left and top for tooltip
    let rect = trigger.getBoundingClientRect()
    let tooltipRect = tooltip.getBoundingClientRect()
    if (placement === domUtils.placements.BOTTOM) {
      tooltip.style.top = containerScrollTop + rect.top + rect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    } else if (placement === domUtils.placements.LEFT) {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left - tooltipRect.width + 'px'
    } else if (placement === domUtils.placements.RIGHT) {
      tooltip.style.top = containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2 + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width + 'px'
    } else {
      tooltip.style.top = containerScrollTop + rect.top - tooltipRect.height + 'px'
      tooltip.style.left = containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2 + 'px'
    }
  },
  isAvailableAtPosition(trigger, popup, placement) {
    let triggerRect = trigger.getBoundingClientRect()
    let popupRect = popup.getBoundingClientRect()
    let viewPortSize = domUtils.getViewportSize()
    let available
    switch (placement) {
    case domUtils.placements.TOP:
      available = triggerRect.top >= popupRect.height
      break
    case domUtils.placements.RIGHT:
      {
        let widthAvailable = triggerRect.right + popupRect.width <= viewPortSize.width
        let heightAvailable = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2
        available = widthAvailable && heightAvailable
        break
      }
    case domUtils.placements.BOTTOM:
      available = triggerRect.bottom + popupRect.height <= viewPortSize.height
      break
    case domUtils.placements.LEFT:
      {
        let widthAvailable = triggerRect.left - popupRect.width >= 0
        let heightAvailable = triggerRect.top + triggerRect.height / 2 >= popupRect.height / 2
        available = widthAvailable && heightAvailable
        break
      }
    }
    return available
  }
}
export default domUtils
