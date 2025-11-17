// Sidebar.jsx
import React, { useState } from "react";
import { Layout, Menu, Divider } from "antd";
import {
  DashboardOutlined,
  BankOutlined,
  UserOutlined,
  GlobalOutlined,
  TeamOutlined,
  SwapOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(["bank-accounts"]);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "bank-accounts",
      icon: <BankOutlined />,
      label: "Bank Accounts",
      children: [
        {
          key: "local-currency",
          label: "Local Currency Accounts",
        },
        {
          key: "foreign-currency",
          label: "Foreign Currency Accounts",
        },
        {
          key: "beneficiaries",
          label: "Beneficiaries",
        },
      ],
    },
    {
      key: "transfers",
      icon: <SwapOutlined />,
      label: "Transfers",
    },
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Sider
      width={280}
      collapsedWidth={80}
      trigger={null}
      collapsible
      className="alphabank-sidebar"
      style={{
        height: "100vh", // chiều cao toàn màn hình
        position: "fixed", // cố định vị trí
        left: 0,
        top: 0,
        bottom: 0,
        background: "#1E2A38",
        borderRight: "1px solid #2D3E50",
        zIndex: 1000, // đảm bảo nằm trên nội dung
      }}
    >
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-container">
            <div className="logo-full">
              <div className="logo-icon">A</div>
              <span className="logo-text">Alphabank</span>
            </div>
        </div>
      </div>

      <Divider className="sidebar-divider" />

      {/* Navigation Header */}
      <div className="nav-section">
        <div className="nav-label">Navigation</div>
      </div>

      {/* Main Menu */}
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
        className="sidebar-menu"
        expandIcon={({ isOpen }) => (
          <CaretDownOutlined
            style={{
              fontSize: "12px",
              transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.2s",
            }}
          />
        )}
      />
    </Sider>
  );
};

export default Sidebar;
