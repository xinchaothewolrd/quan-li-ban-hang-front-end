// Sidebar.jsx
import React, { useState, useMemo } from "react";
import { Layout, Menu, Divider } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  TagsOutlined,
  BarChartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState(["product-management"]);

  // Map current path to selected menu key
 const selectedKeys = useMemo(() => {
  const path = location.pathname;

  if (path === "/admin") return ["dashboard"];
  if (path.startsWith("/admin/products")) return ["products"];
  if (path.startsWith("/admin/categories")) return ["categories"];
  if (path.startsWith("/admin/staff")) return ["staff-management"];
  if (path.startsWith("/admin/customers")) return ["customer-management"];
  if (path.startsWith("/admin/promotions")) return ["promotion-management"];
  if (path.startsWith("/admin/reports")) return ["revenue-report"];

  return [];
}, [location.pathname]);


  const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: (
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Dashboard
      </NavLink>
    ),
  },
  {
    key: "product-management",
    icon: <AppstoreOutlined />,
    label: "Quản lý sản phẩm",
    children: [
      {
        key: "products",
        label: (
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Sản phẩm
          </NavLink>
        ),
      },
      {
        key: "categories",
        label: (
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Loại sản phẩm
          </NavLink>
        ),
      },
    ],
  },
  {
    key: "staff-management",
    icon: <TeamOutlined />,
    label: (
      <NavLink
        to="/admin/staff"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Quản lý nhân viên
      </NavLink>
    ),
  },
  {
    key: "customer-management",
    icon: <UserOutlined />,
    label: (
      <NavLink
        to="/admin/customers"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Quản lý khách hàng
      </NavLink>
    ),
  },
  {
    key: "promotion-management",
    icon: <TagsOutlined />,
    label: (
      <NavLink
        to="/admin/promotions"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Quản lý khuyến mãi
      </NavLink>
    ),
  },
  {
    key: "revenue-report",
    icon: <BarChartOutlined />,
    label: (
      <NavLink
        to="/admin/reports"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        Báo cáo doanh thu
      </NavLink>
    ),
  },
];


  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Sider
      width={250}
      collapsedWidth={80}
      trigger={null}
      collapsible
      className="alphabank-sidebar"
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#1E2A38",
        borderRight: "1px solid #2D3E50",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-container">
          <div className="logo-full">
            <div className="logo-icon">A</div>
            <span className="logo-text">Admin đẹp trai</span>
          </div>
        </div>
      </div>

      <Divider className="sidebar-divider" />

      {/* Navigation header */}
      <div className="nav-section">
        <div className="nav-label">Navigation</div>
      </div>

      {/* Menu with NavLink labels */}
      <Menu
        mode="inline"
        theme="dark"
        items={menuItems}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
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