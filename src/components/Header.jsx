// Header.jsx
import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#001529",
      }}
    >
      {/* Logo */}
      <div
        style={{
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          marginRight: "40px",
        }}
      >
        MyLogo
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1 }}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Trang chủ",
          },
          {
            key: "2",
            icon: <InfoCircleOutlined />,
            label: "Giới thiệu",
          },
          {
            key: "3",
            icon: <PhoneOutlined />,
            label: "Liên hệ",
          },
        ]}
      />
    </Header>
  );
};

export default AppHeader;