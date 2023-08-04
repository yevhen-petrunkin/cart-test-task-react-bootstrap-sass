import { urlFor } from '../../client';
import { useState, useEffect, useCallback } from 'react';

const placeholder = './assets/images/placeholder.jpg';

const ProductComponent = ({ product, handleOrder, delOrder, handleDelete }) => {
  const handleIncrease = useCallback(() => {
    product.increaseProductNumber();
    handleOrder(product.getProductOrder());
  }, [product, handleOrder]);

  const handleDecrease = useCallback(() => {
    product.decreaseProductNumber();
    handleOrder(product.getProductOrder());
  }, [product, handleOrder]);

  useEffect(() => {
    if (!delOrder) {
      return;
    }

    if (delOrder.toLowerCase() === product.getProductName().toLowerCase()) {
      product.resetProductNumber();
    }
  }, [delOrder, product]);

  return (
    <li>
      <div>
        <img
          src={urlFor(product.getProductImgUrl()) || placeholder}
          alt="image"
          width="200px"
          height="300px"
        />
      </div>
      <p>
        <span>Name: </span>
        {product.getProductName()}
      </p>
      <p>
        <span>Quantity: </span>
        {product.getProductNumber()}
      </p>
      <p>
        <span>Price: </span>
        {product.getProductPrice()} {product.getProductCurrency()}
      </p>

      <div>
        <button type="button" onClick={handleIncrease}>
          +
        </button>
        <button
          type="button"
          onClick={() => {
            product.getProductNumber() <= 1
              ? handleDelete(product.getProductName())
              : handleDecrease();
          }}
          disabled={product.getProductNumber() <= 0}
        >
          -
        </button>
      </div>
    </li>
  );
};

export default ProductComponent;
