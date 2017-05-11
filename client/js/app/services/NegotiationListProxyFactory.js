class NegotiationListProxyFactory {

  static create(context, object) {
    return new Proxy(new NegotiationList(), {

      get(target, prop, receiver) {
        if ('add' === prop && typeof target[prop] === typeof Function) {
          return function () {
            Reflect.apply(target[prop], target, arguments)
            context._negotiatioView.update(arguments[0]);
          }
        }

        if ('removeAll' === prop && typeof target[prop] === typeof Function) {
          return function () {
            Reflect.apply(target[prop], target, arguments)
            context._negotiatioView.clean();
          }
        }

        return Reflect.get(target, prop, receivers);
      }
    })
  }
}
