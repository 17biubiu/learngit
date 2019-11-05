function isFunction (x) {
  return typeof x === 'function'
}

function isUndefined (x) {
  return typeof x === 'undefined'
}
class EventEmitter {
  constructor () {
    this.eventMap = {}
  }

  addListener (eventName, listener) {
    if (!isFunction(listener)) {
      throw new TypeError('addListener second param must is function')
    }

    this.eventMap[eventName] = this.eventMap[eventName] || []
    this.eventMap[eventName].push(listener)

    return this
  }

  on (eventName, listener) {
    return this.addListener(eventName, listener)
  }

  once (eventName, listener) {
    if (!isFunction(listener)) {
      throw new TypeError('once second param must is function')
    }

    const fn = (...args) => {
      this.removeListener(eventName, fn)
      listener.apply(this.args)
    }

    fn.eventListener = listener

    return this.addListener(eventName, fn)
  }

  removeListener (eventName, listener) {
    if (!isFunction(listener)) {
      throw new TypeError('removeListener second param must is function')
    }

    let listeners

    if (!(listeners = this.eventMap[eventName])) {
      return this
    }

    for (let i = 0; i < listener.length; i++) {
      if (listeners[i] === listener || listeners[i].eventjsListener === listener) {
        listeners.splice(i, 1)
        break
      }
    }

    if (listeners.length === 0) {
      delete this.eventMap[eventName]
    }

    return this
  }

  off (eventName, listener) {
    return this.removeListener(eventName, listener)
  }

  removeAllListeners (eventName) {
    if (isUndefined(eventName)) {
      this.eventMap = {}
      return this
    }

    delete this.eventMap[eventName]

    return this
  }

  emit (eventName, ...args) {
    let listeners

    if (!(listeners = this.eventMap[eventName])) {
      return this
    }

    listeners = listeners.slice()

    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args)
    }

    return this
  }

  listeners (eventName) {
    return (this.eventMap[eventName] || []).slice()
  }
}

export const Emitter = new EventEmitter();