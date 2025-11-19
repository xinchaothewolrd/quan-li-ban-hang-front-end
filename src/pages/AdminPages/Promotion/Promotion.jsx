import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  DatePicker,
  InputNumber,
  Space,
  Tag,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Checkbox,
  Empty,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TagsOutlined,
  PercentageOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const initialPromotions = [
  {
    key: "1",
    name: "Giảm giá Tết",
    code: "TET2025",
    dateRange: ["2025-01-01", "2025-01-15"],
    discount: 10,
    status: "active",
  },
  {
    key: "2",
    name: "Black Friday",
    code: "BF2025",
    dateRange: ["2025-11-25", "2025-11-30"],
    discount: 20,
    status: "active",
  },
  {
    key: "3",
    name: "Giảm giá cuối năm",
    code: "YEAR2025",
    dateRange: ["2024-12-20", "2024-12-31"],
    discount: 15,
    status: "expired",
  },
];

const sampleProducts = [
  { key: "p1", name: "iPhone 17", price: 29990000, category: "Điện thoại" },
  { key: "p2", name: "MacBook Pro", price: 45990000, category: "Laptop" },
  { key: "p3", name: "iPad Air", price: 18990000, category: "Máy tính bảng" },
  { key: "p4", name: "Apple Watch", price: 9990000, category: "Đồng hồ" },
  { key: "p5", name: "AirPods Pro", price: 6990000, category: "Tai nghe" },
  { key: "p6", name: "Samsung Galaxy S24", price: 25990000, category: "Điện thoại" },
];

const Promotion = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [products] = useState(sampleProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    dateRange: null,
    discount: 10
  });

  const showModal = (record = null) => {
    setEditingPromotion(record);
    setIsModalOpen(true);
    if (record) {
      setFormData({
        name: record.name,
        code: record.code,
        dateRange: [dayjs(record.dateRange[0]), dayjs(record.dateRange[1])],
        discount: record.discount
      });
    } else {
      setFormData({
        name: '',
        code: '',
        dateRange: null,
        discount: 10
      });
    }
  };

  const handleOk = () => {
    if (!formData.name || !formData.code || !formData.dateRange) {
      message.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const newPromotion = {
      ...formData,
      key: editingPromotion ? editingPromotion.key : Date.now().toString(),
      dateRange: formData.dateRange.map((d) => d.format("YYYY-MM-DD")),
      status: "active",
    };

    if (editingPromotion) {
      setPromotions((prev) =>
        prev.map((item) => (item.key === editingPromotion.key ? newPromotion : item))
      );
      message.success("Cập nhật khuyến mãi thành công!");
    } else {
      setPromotions([...promotions, newPromotion]);
      message.success("Thêm khuyến mãi thành công!");
    }
    setIsModalOpen(false);
    setEditingPromotion(null);
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa khuyến mãi này?",
      okText: "Xóa",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: () => {
        setPromotions((prev) => prev.filter((item) => item.key !== key));
        message.success("Đã xóa khuyến mãi!");
      },
    });
  };

  const showApplyModal = (promo) => {
    setSelectedPromotion(promo);
    setSelectedProducts([]);
    setIsApplyModalOpen(true);
  };

  const handleApplyPromotion = () => {
    if (selectedProducts.length === 0) {
      message.warning("Vui lòng chọn ít nhất một sản phẩm!");
      return;
    }
    message.success(`Đã áp dụng mã ${selectedPromotion.code} cho ${selectedProducts.length} sản phẩm!`);
    setIsApplyModalOpen(false);
  };

  const activePromotions = promotions.filter((p) => p.status === "active");
  const totalDiscount = promotions.reduce((sum, p) => sum + p.discount, 0);

  const productColumns = [
    {
      title: "Chọn",
      key: "select",
      width: 60,
      render: (_, record) => (
        <Checkbox
          checked={selectedProducts.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedProducts([...selectedProducts, record.key]);
            } else {
              setSelectedProducts(selectedProducts.filter((k) => k !== record.key));
            }
          }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (p) => (
        <span style={{ fontSize: "15px", fontWeight: "500" }}>
          {p.toLocaleString()} ₫
        </span>
      ),
    },
    {
      title: "Giá sau KM",
      key: "discounted",
      render: (_, record) => {
        if (!selectedPromotion) return "-";
        const discounted = record.price * (1 - selectedPromotion.discount / 100);
        return (
          <Tag color="green" style={{ fontSize: "14px", padding: "4px 12px" }}>
            {discounted.toLocaleString()} ₫
          </Tag>
        );
      },
    },
    {
      title: "Tiết kiệm",
      key: "saved",
      render: (_, record) => {
        if (!selectedPromotion) return "-";
        const saved = record.price * (selectedPromotion.discount / 100);
        return (
          <span style={{ color: "#f5222d", fontWeight: "600" }}>
            -{saved.toLocaleString()} ₫
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#1890ff" }}>
              <GiftOutlined /> Quản lý Khuyến mãi
            </h1>
            <p style={{ color: "#8c8c8c", margin: "8px 0 0 0" }}>
              Tạo và quản lý các chương trình khuyến mãi
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{
              borderRadius: "8px",
              height: "44px",
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            Tạo khuyến mãi mới
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Tổng khuyến mãi</span>}
              value={promotions.length}
              valueStyle={{ color: "#fff", fontSize: "32px" }}
              prefix={<TagsOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Đang hoạt động</span>}
              value={activePromotions.length}
              valueStyle={{ color: "#fff", fontSize: "32px" }}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)" }}>Tổng % giảm</span>}
              value={totalDiscount}
              valueStyle={{ color: "#fff", fontSize: "32px" }}
              suffix={<PercentageOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Promotion Cards */}
      <Row gutter={[16, 16]}>
        {promotions.map((promo) => (
          <Col xs={24} md={12} lg={8} key={promo.key}>
            <Card
              hoverable
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              styles={{
                body: { padding: 0 }
              }}
            >
              <div
                style={{
                  background: promo.status === "active" 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #bbb 0%, #888 100%)",
                  padding: "20px",
                  color: "#fff",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <Tag color={promo.status === "active" ? "green" : "default"} style={{ fontSize: "12px" }}>
                    {promo.status === "active" ? "Đang hoạt động" : "Hết hạn"}
                  </Tag>
                  <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                    {promo.discount}%
                  </div>
                </div>
                <h3 style={{ color: "#fff", fontSize: "20px", margin: "0 0 8px 0" }}>
                  {promo.name}
                </h3>
                <div style={{ opacity: 0.9, fontSize: "16px", fontWeight: "600", letterSpacing: "1px" }}>
                  <TagsOutlined /> {promo.code}
                </div>
              </div>

              <div style={{ padding: "20px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ color: "#8c8c8c", fontSize: "13px", marginBottom: "4px" }}>
                    <CalendarOutlined /> Thời gian áp dụng
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    {promo.dateRange[0]} → {promo.dateRange[1]}
                  </div>
                </div>

                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Button
                    type="primary"
                    icon={<ShoppingOutlined />}
                    onClick={() => showApplyModal(promo)}
                    disabled={promo.status !== "active"}
                    style={{ borderRadius: "6px" }}
                  >
                    Áp dụng
                  </Button>
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => showModal(promo)}
                      style={{ borderRadius: "6px" }}
                    />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(promo.key)}
                      style={{ borderRadius: "6px" }}
                    />
                  </Space>
                </Space>
              </div>
            </Card>
          </Col>
        ))}

        {promotions.length === 0 && (
          <Col span={24}>
            <Card style={{ borderRadius: "12px", textAlign: "center", padding: "60px 20px" }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ fontSize: "16px", color: "#8c8c8c" }}>
                    Chưa có chương trình khuyến mãi nào
                  </span>
                }
              >
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                  Tạo khuyến mãi đầu tiên
                </Button>
              </Empty>
            </Card>
          </Col>
        )}
      </Row>

      {/* Modal Add/Edit */}
      <Modal
        title={
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            {editingPromotion ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi mới"}
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >
        <div style={{ padding: "24px 0" }}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "8px", fontWeight: "500" }}>Tên chương trình *</div>
            <Input
              placeholder="VD: Giảm giá mùa hè"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              size="large"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "8px", fontWeight: "500" }}>Mã khuyến mãi *</div>
            <Input
              placeholder="VD: SUMMER2025"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              size="large"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "8px", fontWeight: "500" }}>Thời gian áp dụng *</div>
            <RangePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              value={formData.dateRange}
              onChange={(dates) => setFormData({ ...formData, dateRange: dates })}
              size="large"
            />
          </div>

          <div>
            <div style={{ marginBottom: "8px", fontWeight: "500" }}>Mức giảm giá (%) *</div>
            <InputNumber
              min={1}
              max={100}
              style={{ width: "100%" }}
              placeholder="Nhập % giảm giá"
              value={formData.discount}
              onChange={(value) => setFormData({ ...formData, discount: value })}
              addonAfter="%"
              size="large"
            />
          </div>
        </div>
      </Modal>

      {/* Modal Apply Promotion */}
      <Modal
        title={
          <div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
              Áp dụng mã khuyến mãi
            </div>
            {selectedPromotion && (
              <Tag color="blue" style={{ fontSize: "14px", padding: "4px 12px" }}>
                {selectedPromotion.code} - Giảm {selectedPromotion.discount}%
              </Tag>
            )}
          </div>
        }
        open={isApplyModalOpen}
        onCancel={() => setIsApplyModalOpen(false)}
        onOk={handleApplyPromotion}
        okText={`Áp dụng (${selectedProducts.length} sản phẩm)`}
        cancelText="Hủy"
        width={900}
      >
        <div style={{ marginBottom: "16px", paddingTop: "16px" }}>
          <Button
            type={selectedProducts.length === products.length ? "default" : "primary"}
            size="small"
            onClick={() => {
              if (selectedProducts.length === products.length) {
                setSelectedProducts([]);
              } else {
                setSelectedProducts(products.map((p) => p.key));
              }
            }}
          >
            {selectedProducts.length === products.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
          </Button>
          <span style={{ marginLeft: "12px", color: "#8c8c8c" }}>
            Đã chọn: {selectedProducts.length}/{products.length} sản phẩm
          </span>
        </div>

        <Table
          columns={productColumns}
          dataSource={products}
          pagination={false}
          scroll={{ y: 400 }}
          size="middle"
        />

        {selectedProducts.length > 0 && selectedPromotion && (
          <Card
            style={{
              marginTop: "16px",
              background: "linear-gradient(135deg, #f6f8fb 0%, #e9f2ff 100%)",
              border: "1px solid #d9e8ff",
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Tổng tiền gốc"
                  value={selectedProducts
                    .map((key) => products.find((p) => p.key === key)?.price || 0)
                    .reduce((a, b) => a + b, 0)}
                  suffix="₫"
                  valueStyle={{ fontSize: "20px" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Tiết kiệm"
                  value={selectedProducts
                    .map((key) => {
                      const product = products.find((p) => p.key === key);
                      return product ? product.price * (selectedPromotion.discount / 100) : 0;
                    })
                    .reduce((a, b) => a + b, 0)}
                  suffix="₫"
                  valueStyle={{ color: "#f5222d", fontSize: "20px" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Tổng thanh toán"
                  value={selectedProducts
                    .map((key) => {
                      const product = products.find((p) => p.key === key);
                      return product
                        ? product.price * (1 - selectedPromotion.discount / 100)
                        : 0;
                    })
                    .reduce((a, b) => a + b, 0)}
                  suffix="₫"
                  valueStyle={{ color: "#52c41a", fontSize: "20px", fontWeight: "bold" }}
                />
              </Col>
            </Row>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default Promotion;