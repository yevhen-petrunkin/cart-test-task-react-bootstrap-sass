import './CartComponent.scss';
import { useState, useEffect } from 'react';

const CartComponent = ({
  cart,
  order,
  handleDelete,
  delOrder,
  handleReset,
  toggle,
}) => {
  if (!cart) {
    return;
  }

  const [orders, setOrders] = useState(cart.getOrdersFromCart());

  const onReset = async () => {
    await cart.resetCart();
    await handleReset();
    setOrders(cart.getOrdersFromCart());
  };

  useEffect(() => {
    const addOrderToCartAsync = async () => {
      await cart.addOrderToCart(order);
      setOrders(cart.getOrdersFromCart());
    };

    addOrderToCartAsync();
  }, [order, cart, setOrders]);

  useEffect(() => {
    if (delOrder) {
      const deleteOrderFromCartAsync = async () => {
        await cart.deleteOrderFromCart(delOrder);
        setOrders(cart.getOrdersFromCart());
      };

      deleteOrderFromCartAsync();
    }
  }, [delOrder, cart, setOrders]);

  if (!toggle) {
    return;
  }

  return (
    <section className="position-absolute bg-light p-3 rounded shadow cart">
      <h2 className="h3 ">Ваш продуктовий кошик:</h2>
      <ul className="list-group mt-3">
        {orders.map(order => (
          <li
            key={order.name}
            className="list-group-item d-flex align-items-center px-3 gap-3 fs-6 cart__item"
          >
            <p>{order.name}</p>
            <p>{order.number} шт.</p>
            <p>{order.aggrPrice} UAH</p>
            <button
              className="btn text-danger text-decoration-underline"
              type="button"
              onClick={() => {
                handleDelete(order.name);
              }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
      <div className="d-flex flex-column gap-3 mt-3 fs-6 fw-bold">
        <p className="d-flex gap-3">
          Всього товарів:
          <span className="text-primary">
            {cart.getTotalProductNumber()}
          </span>{' '}
          шт.
        </p>
        <p className="d-flex gap-3">
          Загальна сума:
          <span className="text-primary">{cart.getTotalPrice()}</span> UAH
        </p>
        <button
          className="btn btn-danger"
          type="button"
          onClick={onReset}
          disabled={orders.length === 0}
        >
          Очистити кошик
        </button>
      </div>
    </section>
  );
};

export default CartComponent;
