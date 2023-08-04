import Cart from '../classes/Cart';
import ProductList from '../classes/ProductList';

import { useEffect, useState, useCallback } from 'react';

import ProductGallery from './ProductGallery/ProductGallery';
import CartComponent from './CartComponent/CartComponent';
import CartBtn from './CartBtn/CartBtn';

const App = () => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [order, setOrder] = useState(null);
  const [delOrderName, setDelOrderName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cartData = new Cart();
      cartData.checkCartInLocalStorage();
      setCart(cartData);

      const productList = new ProductList();

      await productList.fetchProducts();
      productList.alignProductNumbersWithCart(cartData.getOrdersFromCart());
      setTimeout(() => setProducts(productList), 200);
    };

    fetchData();
  }, []);

  const handleOrder = useCallback(
    order => {
      setOrder(order);
    },
    [setOrder]
  );

  const handleDeleteOrder = useCallback(
    name => {
      setDelOrderName(name);
      setTimeout(() => setDelOrderName(null), 200);
    },
    [setDelOrderName]
  );

  const handleReset = useCallback(() => {
    products.resetProductNumbers();
  }, [products]);

  return (
    <>
      <header>
        <nav>
          <CartBtn />

          <CartComponent
            cart={cart}
            order={order}
            delOrder={delOrderName}
            handleDelete={handleDeleteOrder}
            handleReset={handleReset}
          />
        </nav>
      </header>

      <main>
        <section>
          <h1>Осінній розпродаж ігор!</h1>
          <ProductGallery
            productListData={products}
            handleOrder={handleOrder}
            delOrder={delOrderName}
            handleDelete={handleDeleteOrder}
          />
        </section>
      </main>
    </>
  );
};

export default App;
