import React from 'react';
import { Typography } from 'antd'; // Dùng các component của AntD

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>Chào mừng đến với Trang Dashboard</Title>
      <p>Đây là trang chủ của hệ thống.</p>
    </div>
  );
};

export default Dashboard;