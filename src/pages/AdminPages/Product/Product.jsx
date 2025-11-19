// Product.jsx
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
} from "antd";

const { Option } = Select;

const initialData = [
  {
    key: "1",
    name: "iPhone 17",
    category: "iPhone",
    color: "Đen",
    storage: "256GB",
    price: 29990000,
    image: "https://cdn.xtmobile.vn/vnt_upload/product/09_2025/thumbs/600_iPhone_17_Pro_cam_2.jpg",
    stock: 50,
    description: "Điện thoại iPhone 17 mới nhất",
  },
  {
    key: "2",
    name: "MacBook Pro",
    category: "MacBook",
    color: "Bạc",
    storage: "512GB",
    price: 45990000,
    image: "https://techcare.vn/image/macbook-air-m2-13inch-4-bj2v30u.jpg",
    stock: 20,
    description: "Laptop MacBook Pro hiệu năng cao",
  },
  {
    key: "3",
    name: "iPad Air",
    category: "iPad",
    color: "Xanh",
    storage: "128GB",
    price: 18990000,
    image: "https://cdn.tgdd.vn/Products/Images/522/358105/ipad-pro-m5-cellular-wifi-11-inch-black-thumb-600x600.jpg",
    stock: 35,
    description: "Máy tính bảng iPad Air tiện lợi",
  },
];

const Product = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [form] = Form.useForm();

  // Mở modal thêm/sửa
  const showModal = (record = null) => {
    setEditingProduct(record);
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
      if (editingProduct) {
        setData((prev) =>
          prev.map((item) =>
            item.key === editingProduct.key ? { ...item, ...values } : item
          )
        );
      } else {
        const newKey = (data.length + 1).toString();
        setData([...data, { key: newKey, ...values }]);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      form.resetFields();
    });
  };

  // Xóa sản phẩm
  const handleDelete = (key) => {
    setData((prev) => prev.filter((item) => item.key !== key));
  };

  // Xem chi tiết sản phẩm
  const showDetail = (record) => {
    setDetailProduct(record);
    setIsDetailOpen(true);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá cả",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (src) => <img src={src} alt="product" width={50} />,
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
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý sản phẩm</h2>
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={data} />

      {/* Modal thêm/sửa */}
      <Modal
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}
          >
            <Select>
              <Option value="iPhone">iPhone</Option>
              <Option value="MacBook">MacBook</Option>
              <Option value="iPad">iPad</Option>
              <Option value="Tai Nghe">Tai Nghe</Option>
              <Option value="Apple Watch">Apple Watch</Option>
              <Option value="Phụ kiện">Phụ kiện</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Màu sắc" name="color">
            <Input />
          </Form.Item>
          <Form.Item label="Dung lượng" name="storage">
            <Input />
          </Form.Item>
          <Form.Item label="Giá cả" name="price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Hình ảnh (URL)" name="image">
            <Input />
          </Form.Item>
          <Form.Item label="Số lượng tồn kho" name="stock">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Mô tả chi tiết" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal chi tiết sản phẩm */}
      <Modal
        title="Chi tiết sản phẩm"
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={null}
      >
        {detailProduct && (
          <div>
            <img
              src={detailProduct.image}
              alt={detailProduct.name}
              style={{ width: "100%", marginBottom: 16 }}
            />
            <p><b>Tên sản phẩm:</b> {detailProduct.name}</p>
            <p><b>Loại sản phẩm:</b> {detailProduct.category}</p>
            <p><b>Màu sắc:</b> {detailProduct.color}</p>
            <p><b>Dung lượng:</b> {detailProduct.storage}</p>
            <p><b>Giá cả:</b> {detailProduct.price.toLocaleString()} VND</p>
            <p><b>Tồn kho:</b> {detailProduct.stock}</p>
            <p><b>Mô tả chi tiết:</b> {detailProduct.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Product;