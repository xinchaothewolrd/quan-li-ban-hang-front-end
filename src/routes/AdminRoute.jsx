import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/AdminPages/Dashboard/Dashboard";
import Category from "../pages/AdminPages/Product/Category";
import Product from "../pages/AdminPages/Product/Product";
import Staff from "../pages/AdminPages/Staff/Staff";
import Customer from "../pages/AdminPages/Customer/Customer";
import Promotion from "../pages/AdminPages/Promotion/Promotion";
import Report from "../pages/AdminPages/Report/Report";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<Category />} />
        <Route path="products" element={<Product />} />
        <Route path="staff" element={<Staff />} />
        <Route path="customers" element={<Customer />} />
        <Route path="promotions" element={<Promotion />} />
        <Route path="reports" element={<Report />} />
      </Route>
    </Routes>
  );
}