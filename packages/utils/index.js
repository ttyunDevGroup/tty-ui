/**
 * 封装操作localStorage的对象，包含设置（set）、获取（get）、删除（remove）、清空（clear）等方法
 */
export const localStore = {
  /**
   * 设置localStorage的方法
   * @param {String} key - 键，必传
   * @param {Object | String | Number | Boolean} value - 值，必传
   * @param {Number} time - 过期时间（单位秒），选传，默认值0（不过期）
   */
  set(key, value, time = 0) {
    let expiringDate = time === 0 ? 0 : (
      new Date().getTime() + time * 1000)
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    value = JSON.stringify({
      data: value,
      time: expiringDate
    })
    window.localStorage.setItem(key, value)
  },
  /**
   * 获取localStorage的方法
   * @param {String} key - 键，必传
   * @return {Object | String}
   */
  get(key) {
    let ls = window.localStorage.getItem(key)
    if (!ls) {
      return
    } else {
      let store = JSON.parse(ls)
      let value = store.data
      let time = +store.time
      if ((
          time !== 0) && (
          new Date().getTime() - time > 0)) {
        window.localStorage.removeItem(key)
        return undefined
      } else {
        if (value.indexOf('obj-') === 0) {
          value = value.slice(4)
          return JSON.parse(value)
        } else if (value.indexOf('str-') === 0) {
          return value.slice(4)
        }
      }
    }
  },
  /**
   * 删除localStorage的方法
   * @param {String} key - 键，必传
   */
  remove(key) {
    if (!key) {
      return
    }
    window.localStorage.removeItem(key)
  },
  /**
   * 清空localStorage的方法
   */
  clear() {
    window.localStorage.clear()
  }
}

/**
 * 封装操作sessionStorage的对象，包含设置（set）、获取（get）、删除（remove）、清空（clear）等方法
 */
export const sessionStore = {
  /**
   * 设置sessionStorage的方法
   * @param {String} key - 键，必传
   * @param {Object | String | Number | Boolean} value - 值，必传
   */
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
      value = 'obj-' + value
    } else {
      value = 'str-' + value
    }
    window.sessionStorage.setItem(key, value)
  },
  /**
   * 获取sessionStorage的方法
   * @param {String} key - 键，必传
   * @return {Object | String}
   */
  get(key) {
    var value = window.sessionStorage.getItem(key)
    if (!value) {
      return
    }
    if (value.indexOf('obj-') === 0) {
      value = value.slice(4)
      return JSON.parse(value)
    } else if (value.indexOf('str-') === 0) {
      return value.slice(4)
    }
  },

  /**
   * 删除sessionStorage的方法
   * @param {String} key - 键，必传
   */
  remove(key) {
    if (!key) {
      return
    }
    window.sessionStorage.removeItem(key)
  },

  /**
   * 清空sessionStorage的方法
   */
  clear() {
    window.sessionStorage.clear()
  }
}

/**
 * 封装操作cookie的对象，包含设置（set）、获取（get）、删除（remove）、清空（clear）等方法
 */
export const cookieStore = {
  /**
   * 设置cookie的方法
   */
  set(name, value, iDay) {
    let oDate = new Date()
    let host = location.host
    let domain
    iDay = iDay || 30
    oDate.setDate(oDate.getDate() + iDay) // 设置Date对象内部时间，iDay表示几天后。
    domain = host.substring(host.indexOf('.'), host.length)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate.toUTCString() + ';path=/;domain=' + domain
  },

  /**
   * 获取cookie的方法
   */
  get(name) {
    var arr = document.cookie.split('; ') // cookie是以键值对形式存在，用“分号空格” 隔开的，比如 a=1; b=2 ; c=3;
    for (var i = 0, len = arr.length; i < len; i++) {
      var arr2 = arr[i].split('=')
      if (arr2[0] === name) {
        return decodeURIComponent(arr2[1])
      }
    }
    return '' // 遍历完都没找到cookie,返回空字符串
  },

  /**
   * 删除某个cookie的方法
   */
  remove(name) {
    this.set(name, '', -1) // 设置一个过去的时间即可
  },

  /**
   * 清空cookie的方法
   */
  clear() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    }
  }
}

/**
 * 浏览器类型判断
 * @return {Object} - 返回浏览器类型对象
 */
export const browser = (
  () => {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === 'qq' // 是否QQ
    }
  })()

/**
 * 去除字符串两端空格
 * @param {String} str - 需要处理的字符串
 */
export const strTrim = (str) => {
  const reg = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g')
  return str.replace(reg, '')
}

/**
 * 获取值
 * @param {Object} object - 查找对象
 * @param {String} prop - 查找属性
 */
export const getValueByPath = function (object, prop) {
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
}

/**
 * 判断是否是VNode
 * @param {Object} node
 * @returns Boolean
 */
export const isVNode = function (node) {
  return typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

/**
 * 树状结构数组扁平化
 * @param {Array} Arr  传入的树状结构的数组
 * @param {key} key 需要平扁化的 key
 * @returns Boolean
 */
export const flattenTree = function (Arr, key) {
  let arr = []

  function cycle(data) {
    let i = 0
    let len = data.length
    for (; i < len; i++) {
      let obj = {}
      for (let k in data[i]) {
        if (k !== key) {
          obj[k] = data[i][k]
        } else {
          if (data[i][k].length > 0) {
            cycle(data[i][k])
          }
        }
      }
      arr.push(obj)
    }
  }
  cycle(Arr)
  return arr
}
