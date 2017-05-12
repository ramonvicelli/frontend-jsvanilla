class ProxyFactory {

  static create(object, ...traps) {
    return new Proxy(object, {

      get(target, prop, receiver) {
        const trap = traps.find(methodToTrap);
        if (trap) {
          return function () {
            Reflect.apply(target[prop], target, arguments)
            trap.action(arguments[0]);
          }
        }
        return Reflect.get(target, prop, receiver);

        function methodToTrap(item) {
          return item.prop === prop && ProxyFactory._IsFunction(target[prop]);
        }
      },

      set(target, prop, value, receiver) {
        const trap = traps.find(methodToTrap);
        if (trap) {
          target[prop] = value;
          trap.action(target);
        }

        return Reflect.set(target, prop, value, receiver);

        function methodToTrap(item) {
          return item.prop === prop;
        }
      }
    })
  }

  static _IsFunction(func) {
    return typeof func === typeof Function;
  }
}
