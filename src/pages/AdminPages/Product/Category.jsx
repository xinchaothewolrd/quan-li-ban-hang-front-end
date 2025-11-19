// Categories.jsx
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from "antd";

const initialData = [
  { key: "1", name: "iPhone", description: "Dòng điện thoại thông minh của Apple" },
  { key: "2", name: "MacBook", description: "Laptop cao cấp của Apple" },
  { key: "3", name: "iPad", description: "Máy tính bảng của Apple" },
  { key: "4", name: "Tai Nghe", description: "AirPods và các loại tai nghe" },
  { key: "5", name: "Apple Watch", description: "Đồng hồ thông minh của Apple" },
  { key: "6", name: "Phụ kiện", description: "Các phụ kiện đi kèm" },
];

const Category = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  // Mở modal thêm/sửa
  const showModal = (record = null) => {
    setEditingCategory(record);
    setIsModalOpen(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  // Xử lý thêm/sửa
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCategory) {
        // Sửa
        setData((prev) =>
          prev.map((item) =>
            item.key === editingCategory.key ? { ...item, ...values } : item
          )
        );
      } else {
        // Thêm
        const newKey = (data.length + 1).toString();
        setData([...data, { key: newKey, ...values }]);
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      form.resetFields();
    });
  };

  // Xử lý xóa
  const handleDelete = (key) => {
    setData((prev) => prev.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Tên loại sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý loại sản phẩm</h2>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Thêm loại sản phẩm
      </Button>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={editingCategory ? "Sửa loại sản phẩm" : "Thêm loại sản phẩm"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên loại sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên loại sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;