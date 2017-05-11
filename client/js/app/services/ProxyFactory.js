class ProxyFactory {

  static create(object, ...actions) {
    return new Proxy(new NegotiationList(), {

      get(target, prop, receiver) {
        const objectFind = actions.find(methodToTrap);
        if (objectFind) {
          return function () {
            Reflect.apply(target[prop], target, arguments)
            objectFind.action(arguments[0]);
          }
        }
        return Reflect.get(target, prop, receiver);

        function methodToTrap(item) {
          return item.prop === prop && ProxyFactory._IsFunction(target[prop]);
        }
      },

      set(target, prop, value, receiver) {
        const objectFind = actions.find(methodToTrap);
        if (objectFind) {
          target[prop] = value;
          objectFind.action(target);
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
