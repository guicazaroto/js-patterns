class ProxyFactory {
  static create(object, keys, action) {
    return new Proxy(object, {
      get(target, key, receiver) {
        if(keys.includes(key) &&  ProxyFactory.isFunction(target[key])) {
          return function () {
            const res = Reflect.apply(target[key], target, arguments)
            action(target)
            return res
          }
        }
        return Reflect.get(target, key, receiver)
      },
      set (target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver)
        if(keys.includes(key)) {
          action(target)
        }
        return res
      }
    })
  }

  static isFunction (structure) {
    return typeof(structure) == typeof(Function)
  }
}