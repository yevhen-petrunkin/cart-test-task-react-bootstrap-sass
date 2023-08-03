import ProductComponent from '../ProductComponent/ProductComponent';

const ProductGallery = ({ productListData, handleOrder }) => {
  return (
    <ul>
      {productListData &&
        productListData
          .getProducts()
          .map(product => (
            <ProductComponent
              key={product.getProductName()}
              product={product}
              handleOrder={handleOrder}
            />
          ))}
    </ul>
  );
};

export default ProductGallery;
