import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Stats = () => {
  const { orders } = useContext(AppContext);


  const validOrders = orders.filter((order) => {
    return (
      order.items &&
      order.items.length > 0 &&
      order.totalAmount &&
      order.totalAmount > 0 &&
      order.status
    );
  });

 
  const totalOrders = validOrders.reduce((count) => {
    return count + 1;
  }, 0);


  const deliveredOrders = validOrders.reduce((count, order) => {
    return order.status === "Delivered" ? count + 1 : count;
  }, 0);


  const cancelledOrders = validOrders.reduce((count, order) => {
    return order.status === "Cancelled" ? count + 1 : count;
  }, 0);

  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Stats Dashboard</h2>

      <div data-testid="total-orders">
        Total Orders: {totalOrders}
      </div>

      <div data-testid="delivered-orders">
        Delivered Orders: {deliveredOrders}
      </div>

      <div data-testid="cancelled-orders">
        Cancelled Orders: {cancelledOrders}
      </div>
    </div>
  );
};

export default Stats;