import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRoutes from "../src/routes/CustomerRoute";
import AdminRoutes from "../src/routes/AdminRoute";

function App() {
  return (
        <Routes>
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
  );
}

export default App;