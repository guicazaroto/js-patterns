class ProxyFactory {
  static create(object, keys, action) {
    return new Proxy(object, {
      get(target, key) {
        if(keys.includes(key) &&  ProxyFactory.isFunction(target[key])) {
          return function () {
            Reflect.apply(target[key], target, arguments)
            action(target)
          }
        }
        return Reflect.get(target, key)
      },
      set (target, key, value) {
        if(keys.includes(key)) {
          action(target)
        }
        return Reflect.set(target, key, value)
      }
    })
  }

  static isFunction (structure) {
    return typeof(structure) == typeof(Function)
  }
}