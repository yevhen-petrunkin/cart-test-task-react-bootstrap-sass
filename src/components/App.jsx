import './App.scss';

import Cart from '../classes/Cart';
import ProductList from '../classes/ProductList';

import { useEffect, useState, useCallback } from 'react';

import ProductGallery from './ProductGallery/ProductGallery';
import Navbar from './Navbar/Navbar';

const App = () => {
  const [productsData, setProductsData] = useState(null);
  const [products, setProducts] = useState([]);
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

      setProductsData(productList);
      setProducts(productList.getProducts());
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
    async name => {
      setDelOrderName(name);

      await new Promise(resolve => setTimeout(resolve, 200));

      setDelOrderName(null);
    },
    [setDelOrderName]
  );

  const handleReset = useCallback(() => {
    productsData.resetProductNumbers();
    const updatedProducts = [...productsData.getProducts()];
    setProducts(updatedProducts);
  }, [products, setProducts, productsData]);

  return (
    <>
      <header className="fixed-top p-3 bg-primary">
        <Navbar
          cart={cart}
          order={order}
          delOrder={delOrderName}
          handleDelete={handleDeleteOrder}
          handleReset={handleReset}
        />
      </header>

      <main className="bg-warning">
        <section className="container showcase">
          <h1 className="h1 text-center text-uppercase">
            Осінній розпродаж ігор!
          </h1>
          <ProductGallery
            products={products}
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
