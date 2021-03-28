class Bind {
  constructor(model, view, props) {
    const proxy = ProxyFactory.create(
      model,
      props,
      m => view.handler(m)
    )

    view.handler(proxy)
  
    return proxy
  }
}