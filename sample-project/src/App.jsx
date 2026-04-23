import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Orders from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Filter from "./pages/Filter";
import Stats from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;