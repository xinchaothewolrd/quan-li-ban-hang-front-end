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
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['bank-accounts']);

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
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Sider
      width={280}
      collapsedWidth={80}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="alphabank-sidebar"
      style={{
        background: '#1E2A38',
        borderRight: '1px solid #2D3E50'
      }}
    >
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-container">
          {!collapsed ? (
            <div className="logo-full">
              <div className="logo-icon">A</div>
              <span className="logo-text">Alphabank</span>
            </div>
          ) : (
            <div className="logo-collapsed">
              <div className="logo-icon">A</div>
            </div>
          )}
        </div>
        
        <div 
          className="collapse-trigger"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
              fontSize: '12px',
              transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s'
            }} 
          />
        )}
      />
    </Sider>
  );
};

export default Sidebar;