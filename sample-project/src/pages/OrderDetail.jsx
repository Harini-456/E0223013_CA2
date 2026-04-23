import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useContext(AppContext);

  // find order using route param
  const order = orders.find(
    (o) => String(o.orderId) === String(id)
  );

  // invalid ID handling
  if (!order) {
    return <h2>Order not found</h2>;
  }

  // subtotal calculation using reduce
  const subtotal = order.items?.reduce((sum, item) => {
    const price = item.price || 0;
    const qty = item.quantity || 0;
    return sum + price * qty;
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>

      <p><b>Order ID:</b> {order.orderId}</p>
      <p><b>Customer:</b> {order.customerName || "Unknown"}</p>
      <p><b>Restaurant:</b> {order.restaurant}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Rating:</b> {order.rating ?? "Not Rated"}</p>

      <h3>Items</h3>

      {order.items && order.items.length > 0 ? (
        order.items.map((item, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <p>
              {item.name} - {item.quantity} × ₹{item.price}
            </p>
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}

      <h3>
        Subtotal: ₹{subtotal}
      </h3>
    </div>
  );
};

export default OrderDetails;