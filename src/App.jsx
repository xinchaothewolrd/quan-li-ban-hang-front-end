import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      {/* Tất cả các trang bên trong đều dùng chung MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Trang chủ (Dashboard) sẽ hiển thị khi path là "/" */}
        <Route index element={<Dashboard />} />

        {/* Trang Quản lý Sản phẩm sẽ hiển thị khi path là "/products" */}

        {/* Thêm các trang khác của bạn ở đây (nhớ tạo file trong /pages) */}
        {/* <Route path="users" element={<UserManagement />} /> */}
      </Route>
    </Routes>
  );
}

export default App;