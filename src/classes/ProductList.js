import Product from './Product';

import { client } from '../client';

class ProductList {
  constructor() {
    this._products = [];
  }

  getProducts() {
    return (this._products = this._products);
  }

  fetchProducts = async () => {
    const query = '*[_type == "products"]';

    try {
      const response = await client.fetch(query);

      if (!response) {
        return;
      }

      this._products = await response.map(
        ({ title, imgUrl, price, currency }) =>
          new Product({ title, imgUrl, price, currency })
      );
    } catch (error) {
      console.error(error);
    }
  };

  resetProductNumbers() {
    this._products = this._products.map(product => {
      product.resetProductNumber();
      return product;
    });
  }

  resetOrderByName(name) {
    const index = this._products.findIndex(
      product => name.toLowerCase() === product.getProductName().toLowerCase()
    );

    if ((index = -1)) {
      console.log('There is no such order to delete.');
      return;
    }

    this._products[index].resetProductNumber();
  }

  alignProductNumbersWithCart(orders) {
    if (!orders || !orders.length) {
      this.resetProductNumbers();
      return;
    }

    this._products = this._products.map(product => {
      orders.forEach(order => {
        if (
          order.name.toLowerCase() === product.getProductName().toLowerCase()
        ) {
          product.setProductNumber(order.number);
        }
      });
      return product;
    });
  }
}

export default ProductList;
