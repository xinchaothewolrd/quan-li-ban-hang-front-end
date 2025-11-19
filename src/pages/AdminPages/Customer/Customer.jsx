// Customer.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Popconfirm,
  Tag,
} from "antd";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0901234567",
    age: 30,
    gender: "Nam",
    isActive: true,
    history: [
      {
        orderId: "DH001",
        date: "2025-01-10",
        price: 2999000,
        address: "TP.HCM",
        status: "Đã nhận hàng",
      },
      {
        orderId: "DH002",
        date: "2025-02-15",
        price: 1599000,
        address: "TP.HCM",
        status: "Đang giao",
      },
    ],
  },
  {
    key: "2",
    name: "Trần Thị B",
    email: "thib@example.com",
    phone: "0912345678",
    age: 25,
    gender: "Nữ",
    isActive: false,
    history: [
      {
        orderId: "DH003",
        date: "2025-03-01",
        price: 4599000,
        address: "Hà Nội",
        status: "Hủy đơn hàng",
      },
    ],
  },
  // 👉 Tạo thêm khoảng 8 khách hàng mẫu nữa theo cùng cấu trúc
];

const Customer = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [detailCustomer, setDetailCustomer] = useState(null);
  const [form] = Form.useForm();

  // Mở modal thêm/sửa
  const showModal = (record = null) => {
    setEditingCustomer(record);
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
      if (editingCustomer) {
        setData((prev) =>
          prev.map((item) =>
            item.key === editingCustomer.key ? { ...item, ...values } : item
          )
        );
      } else {
        const newKey = (data.length + 1).toString();
        setData([...data, { key: newKey, ...values, history: [] }]);
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
      form.resetFields();
    });
  };

  // Xóa khách hàng
  const handleDelete = (key) => {
    setData((prev) => prev.filter((item) => item.key !== key));
  };

  // Xem chi tiết lịch sử mua hàng
  const showDetail = (record) => {
    setDetailCustomer(record);
    setIsDetailOpen(true);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) =>
        gender === "Nam" ? <Tag color="blue">Nam</Tag> : <Tag color="pink">Nữ</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) =>
        active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
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
          <Button type="link" onClick={() => showDetail(record)}>
            Lịch sử mua hàng
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý khách hàng</h2>
      <Table columns={columns} dataSource={data} />

      {/* Modal thêm/sửa */}
      <Modal
        title={editingCustomer ? "Sửa khách hàng" : "Thêm khách hàng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tuổi" name="age">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái" name="isActive">
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chi tiết lịch sử mua hàng */}
      <Modal
        title="Lịch sử mua hàng"
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={null}
      >
        {detailCustomer && (
          <Table
            dataSource={detailCustomer.history}
            pagination={false}
            columns={[
              { title: "Mã đơn", dataIndex: "orderId", key: "orderId" },
              { title: "Ngày mua", dataIndex: "date", key: "date" },
              {
                title: "Giá",
                dataIndex: "price",
                key: "price",
                render: (price) => `${price.toLocaleString()} VND`,
              },
              { title: "Địa chỉ giao", dataIndex: "address", key: "address" },
              {
                title: "Trạng thái",
                dataIndex: "status",
                key: "status",
                render: (status) => {
                  if (status === "Đã nhận hàng")
                    return <Tag color="green">{status}</Tag>;
                  if (status === "Đang giao")
                    return <Tag color="blue">{status}</Tag>;
                  return <Tag color="red">{status}</Tag>;
                },
              },
            ]}
          />
        )}
      </Modal>
    </div>
  );
};

export default Customer;