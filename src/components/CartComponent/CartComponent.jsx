import { useState, useEffect, useCallback } from 'react';

const CartComponent = ({ cart, order }) => {
  if (!cart) {
    return;
  }

  const [orders, setOrders] = useState(cart.getOrdersFromCart());

  useEffect(() => {
    cart.addOrderToCart(order);
    setTimeout(() => setOrders(cart.getOrdersFromCart()), 300);
  }, [order]);

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
    </section>
  );
};

export default CartComponent;
