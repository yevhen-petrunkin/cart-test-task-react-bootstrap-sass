class Cart {
  constructor() {
    this._orders = [];
    this._totalNum = 0;
    this._totalPrice = 0;
  }

  calcTotalProductNumber() {
    if (!this._orders.length) {
      this._totalNum = 0;
      return;
    }

    this._totalNum = this._orders.reduce(
      (aggr, order) => (aggr += order.number),
      0
    );
  }

  calcTotalPrice() {
    if (!this._orders.length) {
      this._totalPrice = 0;
      return;
    }

    this._totalPrice = this._orders.reduce(
      (aggr, order) => (aggr += order.aggrPrice),
      0
    );
  }

  getOrdersFromCart() {
    return this._orders;
  }

  getTotalProductNumber() {
    this.calcTotalProductNumber();
    return this._totalNum;
  }

  getTotalPrice() {
    this.calcTotalPrice();
    return this._totalPrice;
  }

  saveCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this._orders));
  }

  checkCartInLocalStorage() {
    const retrievedOrders = localStorage.getItem('cart');

    if (!retrievedOrders) {
      return;
    }

    this._orders = [...JSON.parse(retrievedOrders)];
    this.calcTotalProductNumber();
    this.calcTotalPrice();
  }

  deleteCartFromLocalStorage() {
    localStorage.removeItem('cart');
  }

  addOrderToCart(order) {
    if (!order || typeof order !== 'object') {
      console.log('Incorrect incoming data type.');
      return;
    }

    if (
      !order.hasOwnProperty('name') ||
      !order.hasOwnProperty('number') ||
      !order.hasOwnProperty('aggrPrice')
    ) {
      console.log('Insufficient incoming data.');
      return;
    }

    const filteredOrders = this._orders.filter(
      ({ name }) => name.toLowerCase() !== order.name.toLowerCase()
    );

    this._orders = [...filteredOrders];
    this._orders.push(order);
    this.deleteCartFromLocalStorage();
    this.saveCartInLocalStorage();
  }

  deleteOrderFromCart(name) {
    if (!this._orders.length) {
      console.log('The cart is empty.');
      return;
    }

    if (!name || typeof name !== 'string') {
      console.log('Incorrect incoming data type.');
      return;
    }

    const isSuchOrder = this._orders.some(
      order => name.toLowerCase() === order.name.toLowerCase()
    );

    if (!isSuchOrder) {
      console.log('There is no such order in the cart.');
      return;
    }

    const filteredOrders = this._orders.filter(
      order => name.toLowerCase() !== order.name.toLowerCase()
    );
    this._orders = [...filteredOrders];
    this.saveCartInLocalStorage();
  }

  resetCart() {
    this._orders = [];
    this._totalNum = 0;
    this._totalPrice = 0;
    this.deleteCartFromLocalStorage();
  }
}

export default Cart;
