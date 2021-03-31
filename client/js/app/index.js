let neg = new NegociationController()
let negociation = new Proxy(new Negociation(new Date(), 2, 3), {
    get(target, key) {
        console.log(target[key])
    }
})
