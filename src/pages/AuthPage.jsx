import { Tabs } from "antd";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";


const AuthPage = () => {
  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <Tabs defaultActiveKey="login" centered>
        <Tabs.TabPane tab="Đăng nhập" key="login">
          <LoginForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đăng ký" key="register">
          <RegisterForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AuthPage;