import './ProductGallery.scss';
import ProductComponent from '../ProductComponent/ProductComponent';

const ProductGallery = ({ products, handleOrder, delOrder, handleDelete }) => {
  if (products === null || products === undefined) {
    return;
  }

  return (
    <ul className="mt-3 w-100 d-flex flex-wrap justify-content-between gap-4 p-0 gallery">
      {products.map(product => (
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
