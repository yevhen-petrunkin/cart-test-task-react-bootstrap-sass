import { useState, useEffect } from 'react';

const CartComponent = ({
  cart,
  order,
  handleDelete,
  delOrder,
  handleReset,
}) => {
  if (!cart) {
    return;
  }

  const [orders, setOrders] = useState(cart.getOrdersFromCart());

  const onReset = () => {
    cart.resetCart();
    handleReset(cart);
    setTimeout(() => {
      setOrders(cart.getOrdersFromCart());
    }, 200);
  };

  useEffect(() => {
    cart.addOrderToCart(order);
    setTimeout(() => {
      setOrders(cart.getOrdersFromCart());
    }, 200);
  }, [order, cart, setOrders]);

  useEffect(() => {
    if (!delOrder) {
      return;
    }
    cart.deleteOrderFromCart(delOrder);
    setTimeout(() => {
      setOrders(cart.getOrdersFromCart());
    }, 200);
  }, [delOrder, cart, setOrders]);

  return (
    <section>
      <h2>Personal Cart</h2>
      <ul>
        {orders.map(order => (
          <li key={order.name}>
            <p>
              <span>Game: </span>
              {order.name}
            </p>
            <p>
              <span>Quantity: </span>
              {order.number}
            </p>
            <p>
              <span>Cost: </span>
              {order.aggrPrice}
            </p>
            <button
              type="button"
              onClick={() => {
                handleDelete(order.name);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p>
        <span>Total Games: </span>
        {cart.getTotalProductNumber()}
      </p>
      <p>
        <span>Total Price: </span>
        {cart.getTotalPrice()}
      </p>
      <button type="button" onClick={onReset}>
        Reset Cart
      </button>
    </section>
  );
};

export default CartComponent;
