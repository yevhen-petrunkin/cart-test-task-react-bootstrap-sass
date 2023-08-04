import { urlFor } from '../../client';
import { useEffect, useCallback } from 'react';

import './ProductComponent.scss';

import placeholder from '../../assets/images/placeholder.jpg';

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
    <li
      className={`card ${
        product.getProductNumber() === 0 ? 'bg-light' : 'bg-danger'
      } gallery__card`}
    >
      <div className="position-relative w-100 h-100 ">
        <img
          className="card-img-top w-100 h-100 "
          src={urlFor(product.getProductImgUrl()) || placeholder}
          alt="image"
        />

        <p className="m-0 p-2 position-absolute w-100 h5 text-warning bg-dark  text-center rounded-top gallery__card-name">
          {product.getProductName()}
        </p>

        <p className="m-0 p-2 position-absolute w-100 h5 text-warning bg-dark text-center  gallery__card-price">
          {product.getProductPrice()} {product.getProductCurrency()}
        </p>
      </div>

      <div className="card-body">
        <div className="btn-group w-100 gallery__btn-set">
          <button
            className="btn btn-dark w-50 p-2"
            type="button"
            onClick={handleIncrease}
          >
            +
          </button>

          <p className="alert alert-dark w-100 h-100 d-flex justify-content-center align-items-center gallery__quantity ">
            {product.getProductNumber()} шт.
          </p>

          <button
            className="btn btn-dark w-50 p-2"
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
      </div>
    </li>
  );
};

export default ProductComponent;
