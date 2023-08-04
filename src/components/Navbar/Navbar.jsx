import { useState, useEffect, useCallback } from 'react';
import CartComponent from '../CartComponent/CartComponent';
import CartBtn from '../CartBtn/CartBtn';
import Logo from '../Logo/Logo';

const Navbar = ({ cart, order, delOrder, handleDelete, handleReset }) => {
  if (!cart) {
    return;
  }

  const [number, setNumber] = useState(cart.getTotalProductNumber());
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => {
    setToggle(prev => !prev);
  }, [setToggle]);

  useEffect(() => {
    const getTotalNumberAsync = async () => {
      const newNumber = await cart.getTotalProductNumber();
      console.log('New number', newNumber);

      setNumber(newNumber);
    };

    getTotalNumberAsync();
  }, [order, cart, delOrder, handleDelete, handleReset]);

  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        setToggle(false);
      }
    };
    window.addEventListener('keydown', handleKeydown);
  }, [setToggle]);

  return (
    <nav className="d-flex justify-content-between position-relative">
      <Logo />
      <CartBtn number={number} handleToggle={handleToggle} />
      <CartComponent
        cart={cart}
        order={order}
        delOrder={delOrder}
        handleDelete={handleDelete}
        handleReset={handleReset}
        toggle={toggle}
      />
    </nav>
  );
};

export default Navbar;
