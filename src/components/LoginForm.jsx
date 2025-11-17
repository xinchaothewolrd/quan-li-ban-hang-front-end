// LoginForm.jsx
import React from "react";
import { Form, Input, Button } from "antd";

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Login success:", values);
    // TODO: gọi API login ở đây
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;