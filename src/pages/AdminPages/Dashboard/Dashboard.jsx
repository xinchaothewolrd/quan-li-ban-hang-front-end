// Dashboard.jsx
import React from "react";
import { Layout, Menu, Breadcrumb, Card, Row, Col } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider, Footer } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header style={{ color: "white", fontSize: "20px" }}>
        My Dashboard
      </Header>

      <Layout>

        {/* Nội dung chính */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Users" bordered={false}>
                  120 Active Users
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Revenue" bordered={false}>
                  $12,000 This Month
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Tasks" bordered={false}>
                  35 Pending Tasks
                </Card>
              </Col>
            </Row>
          </Content>

          {/* Footer */}
          <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} MyCompany Dashboard
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;