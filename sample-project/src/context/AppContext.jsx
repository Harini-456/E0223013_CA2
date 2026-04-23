import { createContext, useEffect, useReducer } from "react";

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return action.payload;

    case "DELIVER_ORDER":
  return state.map(order =>
    order.orderId === action.payload
      ? {
          ...order,
          status: order.status === "Delivered" ? "Pending" : "Delivered"
        }
      : order
  );

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tokenRes = await fetch(
          "https://t4e-testserver.onrender.com/api/public/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              studentId: "E0223013",
              set: "setA",
              password: "495490"
            })
          }
        );

        const tokenData = await tokenRes.json();
        const { token, dataUrl } = tokenData;

        const dataRes = await fetch(
          `https://t4e-testserver.onrender.com/api${dataUrl}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const finalData = await dataRes.json();

        dispatch({
          type: "SET_ORDERS",
          payload: finalData.data.orders
        });

      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const validOrders = state.filter(order =>
    order.items &&
    order.items.length > 0 &&
    order.items.every(i => i.quantity > 0) &&
    order.totalAmount > 0
  );

  return (
    <AppContext.Provider value={{ orders: validOrders, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};