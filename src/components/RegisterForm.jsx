// RegisterForm.jsx
import React from "react";
import { Form, Input, Button } from "antd";

const RegisterForm = () => {
  const onFinish = (values) => {
    console.log("Register success:", values);
    // TODO: gọi API register ở đây
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Form.Item
        label="Tên người dùng"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
      >
        <Input placeholder="Nhập tên người dùng" />
      </Form.Item>

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

      <Form.Item
        label="Xác nhận mật khẩu"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Vui lòng xác nhận mật khẩu!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Nhập lại mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;