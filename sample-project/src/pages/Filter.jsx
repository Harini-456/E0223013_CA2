import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Filter = () => {
  const { orders } = useContext(AppContext);

  const validOrders = orders.filter(order =>
    order.items &&
    order.items.length > 0 &&
    order.items.every(i => i.quantity > 0) &&
    order.totalAmount > 0
  );

  return (
    <div>
      <h2>Valid Orders</h2>

      {validOrders.map(o => (
        <p key={o.orderId}>
          {o.customerName} - ₹{o.totalAmount}
        </p>
      ))}
    </div>
  );
};

export default Filter;