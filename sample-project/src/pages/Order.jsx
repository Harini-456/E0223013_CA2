import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Orders = () => {
  const { orders, dispatch } = useContext(AppContext);
  const [search, setSearch] = useState("");

  const updateStatus = (id) => {
    dispatch({ type: "DELIVER_ORDER", payload: id });
  };

  if (!orders || orders.length === 0) {
    return <h2>Loading...</h2>;
  }


  const validOrders = orders.filter((order) => {
    return (
      order.items &&
      order.items.length > 0 &&
      order.totalAmount &&
      order.totalAmount > 0
    );
  });

  // ✅ Step 2: improved search filter (customer + restaurant)
  const filteredOrders = validOrders.filter((order) =>
    (
      (order.customerName || "Unknown") +
      " " +
      (order.restaurant || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Orders</h1>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search by customer or restaurant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "250px"
        }}
      />

      {/* ORDERS LIST */}
      {filteredOrders.map((order) => (
        <div
          key={order.orderId}
          data-testid="order-item"
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p><b>ID:</b> {order.orderId}</p>
          <p><b>Customer:</b> {order.customerName || "Unknown"}</p>
          <p><b>Restaurant:</b> {order.restaurant}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <button onClick={() => updateStatus(order.orderId)}>
            {order.status === "Delivered"
              ? "Mark Undelivered"
              : "Mark Delivered"}
          </button>
        </div>
      ))}

      {/* NO RESULTS MESSAGE */}
      {filteredOrders.length === 0 && (
        <p>No matching orders found</p>
      )}
    </div>
  );
};

export default Orders;