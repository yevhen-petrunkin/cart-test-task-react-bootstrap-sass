import ProductComponent from '../ProductComponent/ProductComponent';

const ProductGallery = ({
  productListData,
  handleOrder,
  delOrder,
  handleDelete,
}) => {
  if (!productListData) {
    return;
  }

  return (
    <ul>
      {productListData.getProducts().map(product => (
        <ProductComponent
          key={product.getProductName()}
          product={product}
          handleOrder={handleOrder}
          delOrder={delOrder}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ProductGallery;
