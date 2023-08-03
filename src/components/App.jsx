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

  console.log('New Order: ', order);

  useEffect(() => {
    const fetchData = async () => {
      const cardData = new Cart();
      cardData.checkCartInLocalStorage();
      setCart(cardData);

      const productList = new ProductList();

      console.log(productList);
      await productList.fetchProducts();
      productList.alignProductNumbersWithCart(cardData.getOrdersFromCart());
      setProducts(productList);
    };

    fetchData();
  }, []);

  const handleNumberChange = useCallback(
    order => {
      setOrder(order);
    },
    [setOrder]
  );

  return (
    <>
      <header>
        <nav>
          <CartBtn />

          <CartComponent cart={cart} order={order} />
        </nav>
      </header>

      <main>
        <section>
          <h1>Осінній розпродаж ігор!</h1>
          <ProductGallery
            productListData={products}
            handleOrder={handleNumberChange}
          />
        </section>
      </main>
    </>
  );
};

export default App;
