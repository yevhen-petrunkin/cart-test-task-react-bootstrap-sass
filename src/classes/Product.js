class Product {
  constructor({ title = 'Unknown Game', imgUrl, price = 0, currency = 'UAH' }) {
    this._productName = title;
    this._imgUrl = imgUrl;
    this._currency = currency;
    this._price = price;
    this._number = 0;
  }

  getProductName() {
    return this._productName;
  }

  getProductImgUrl() {
    return this._imgUrl;
  }

  getProductPrice() {
    return this._price;
  }

  getProductCurrency() {
    return this._currency;
  }

  getProductNumber() {
    return this._number;
  }

  getAggrPrice() {
    return this._price * this._number;
  }

  getProductOrder() {
    return {
      name: this._productName,
      number: this._number,
      aggrPrice: this.getAggrPrice(),
    };
  }

  setProductNumber(number) {
    if (typeof number !== 'number') {
      console.log('Incorrect incoming data type.');
      return;
    }

    this._number = number;
  }

  increaseProductNumber() {
    this._number += 1;
  }

  decreaseProductNumber() {
    if ((this._number = 0)) {
      return;
    }
    this._number -= 1;
  }

  resetProductNumber() {
    this._number = 0;
  }
}

export default Product;
