import { urlFor } from '../../client';
import { useState, useCallback } from 'react';

const placeholder = './assets/images/placeholder.jpg';

const ProductComponent = ({ product, handleOrder }) => {
  const [productNumber, setProductNumber] = useState(
    product.getProductNumber()
  );

  const handleIncrease = useCallback(() => {
    product.increaseProductNumber();
    setProductNumber(product.getProductNumber());

    handleOrder(product.getProductOrder());
  }, [product, setProductNumber, handleOrder]);

  const handleDecrease = useCallback(() => {
    product.decreaseProductNumber();
    setProductNumber(product.getProductNumber());

    handleOrder(product.getProductOrder());
  }, [product, setProductNumber, handleOrder]);

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
        {productNumber}
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
          onClick={handleDecrease}
          disabled={productNumber <= 0}
        >
          -
        </button>
      </div>
    </li>
  );
};

export default ProductComponent;
