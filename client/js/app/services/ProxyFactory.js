class ProxyFactory {

  static create(object, props, action) {
    return new Proxy(object, {

      get(target, prop, receiver) {
        if (props.include(prop) && ProxyFactory._isFunction()) {
          return function () {
            Reflect.apply(target[prop], target, arguments)
            return action(target);
          }
        }

        return Reflect.get(target, prop, receivers);
      },

      set(target, prop, value, receiver) {
        if (props.includes(prop)) {
          target[prop] = value;
          action(target);
        }

        return Reflect.set(target, prop, value, receiver);
      }
    })
  }
  static _IsFunction(func) {
    return typeof func === typeof Function;
  }
}
