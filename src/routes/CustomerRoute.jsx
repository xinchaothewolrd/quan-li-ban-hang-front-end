import { Route, Routes } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import AuthPage from "../pages/AuthPage";

function CustomerRoute() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        {/* relative path */}
        <Route path="login" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default CustomerRoute;