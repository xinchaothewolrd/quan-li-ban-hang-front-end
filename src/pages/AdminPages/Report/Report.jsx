import React, { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Radio,
  DatePicker,
  Space,
  Progress,
  Tag,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  RiseOutlined,
  TrophyOutlined,
  FireOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

// Dữ liệu mẫu chi tiết hơn
const generateData = () => {
  const daily = [];
  const weekly = [];
  const monthly = [];

  // Dữ liệu theo ngày (30 ngày)
  for (let i = 0; i < 30; i++) {
    const date = dayjs().subtract(29 - i, "day").format("DD/MM");
    daily.push({
      date,
      revenue: Math.floor(Math.random() * 5000000) + 5000000,
      orders: Math.floor(Math.random() * 20) + 15,
      newCustomers: Math.floor(Math.random() * 10) + 5,
    });
  }

  // Dữ liệu theo tuần (12 tuần)
  for (let i = 0; i < 12; i++) {
    weekly.push({
      week: `Tuần ${i + 1}`,
      revenue: Math.floor(Math.random() * 30000000) + 30000000,
      orders: Math.floor(Math.random() * 100) + 100,
      newCustomers: Math.floor(Math.random() * 50) + 30,
    });
  }

  // Dữ liệu theo tháng (12 tháng)
  const months = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
  for (let i = 0; i < 12; i++) {
    monthly.push({
      month: months[i],
      revenue: Math.floor(Math.random() * 100000000) + 100000000,
      orders: Math.floor(Math.random() * 400) + 400,
      newCustomers: Math.floor(Math.random() * 200) + 150,
    });
  }

  return { daily, weekly, monthly };
};

const allData = generateData();

const orderStatus = [
  { name: "Đã giao hàng", value: 60, color: "#52c41a" },
  { name: "Đang giao", value: 25, color: "#1890ff" },
  { name: "Đang xử lý", value: 10, color: "#faad14" },
  { name: "Đã hủy", value: 5, color: "#ff4d4f" },
];

const topProducts = [
  { name: "iPhone 17 Pro Max", sold: 234, revenue: 685860000 },
  { name: "MacBook Pro M3", sold: 156, revenue: 717840000 },
  { name: "iPad Air", sold: 189, revenue: 358911000 },
  { name: "AirPods Pro 2", sold: 445, revenue: 311055000 },
  { name: "Apple Watch Ultra", sold: 178, revenue: 177822000 },
];

const Report = () => {
  const [viewMode, setViewMode] = useState("day");
  const [dateRange, setDateRange] = useState(null);

  const currentData = useMemo(() => {
    switch (viewMode) {
      case "day":
        return allData.daily;
      case "week":
        return allData.weekly;
      case "month":
        return allData.monthly;
      default:
        return allData.daily;
    }
  }, [viewMode]);

  const dateKey = viewMode === "day" ? "date" : viewMode === "week" ? "week" : "month";

  // Tính toán thống kê
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const totalNewCustomers = currentData.reduce((sum, item) => sum + item.newCustomers, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  const growthRate = currentData.length > 1
    ? ((currentData[currentData.length - 1].revenue - currentData[0].revenue) / currentData[0].revenue * 100)
    : 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#1890ff" }}>
              📊 Báo cáo Doanh thu
            </h1>
            <p style={{ color: "#8c8c8c", margin: "8px 0 0 0" }}>
              Theo dõi và phân tích doanh thu kinh doanh
            </p>
          </div>
          
          <Space wrap>
            <Radio.Group
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="day">Theo ngày</Radio.Button>
              <Radio.Button value="week">Theo tuần</Radio.Button>
              <Radio.Button value="month">Theo tháng</Radio.Button>
            </Radio.Group>
            
            <RangePicker
              size="large"
              value={dateRange}
              onChange={setDateRange}
              style={{ borderRadius: "8px" }}
            />
          </Space>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Tổng doanh thu</span>}
              value={totalRevenue}
              valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
              prefix={<DollarOutlined />}
              suffix="₫"
            />
            <div style={{ marginTop: "12px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              <RiseOutlined /> {growthRate > 0 ? "+" : ""}{growthRate.toFixed(1)}% so với kỳ trước
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              boxShadow: "0 4px 12px rgba(240, 147, 251, 0.3)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Tổng đơn hàng</span>}
              value={totalOrders}
              valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
              prefix={<ShoppingCartOutlined />}
            />
            <div style={{ marginTop: "12px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              Trung bình {Math.floor(totalOrders / currentData.length)} đơn/{viewMode === "day" ? "ngày" : viewMode === "week" ? "tuần" : "tháng"}
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              boxShadow: "0 4px 12px rgba(79, 172, 254, 0.3)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Khách hàng mới</span>}
              value={totalNewCustomers}
              valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
              prefix={<UserAddOutlined />}
            />
            <div style={{ marginTop: "12px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              Tăng trưởng tốt 🎉
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              boxShadow: "0 4px 12px rgba(250, 112, 154, 0.3)",
            }}
          >
            <Statistic
              title={<span style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Giá trị TB/Đơn</span>}
              value={avgOrderValue}
              valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
              prefix={<TrophyOutlined />}
              suffix="₫"
            />
            <div style={{ marginTop: "12px", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
              Hiệu suất cao ⭐
            </div>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 1 */}
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                📈 Biểu đồ Doanh thu
              </span>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={dateKey} style={{ fontSize: "12px" }} />
                <YAxis style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value) => [value.toLocaleString() + " ₫", "Doanh thu"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#667eea"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                🎯 Trạng thái Đơn hàng
              </span>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={orderStatus}
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: "#999", strokeWidth: 1 }}
                >
                  {orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} đơn`, "Số lượng"]} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 2 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                👥 Khách hàng Mới
              </span>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey={dateKey} style={{ fontSize: "12px" }} />
                <YAxis style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [value, "Khách hàng mới"]}
                />
                <Line
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#00f2fe"
                  strokeWidth={3}
                  dot={{ fill: "#00f2fe", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                🔥 Top Sản phẩm Bán chạy
              </span>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <div style={{ padding: "12px 0" }}>
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 12px",
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <Tag color={index === 0 ? "gold" : index === 1 ? "silver" : "default"}>
                        #{index + 1}
                      </Tag>
                      <span style={{ fontWeight: "600", fontSize: "14px" }}>
                        {product.name}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#8c8c8c" }}>
                      Đã bán: {product.sold} • {product.revenue.toLocaleString()} ₫
                    </div>
                  </div>
                  <FireOutlined style={{ fontSize: "24px", color: index === 0 ? "#ff4d4f" : "#999" }} />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card
            title={
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                📊 Hiệu suất Kinh doanh
              </span>
            }
            bordered={false}
            style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={6}>
                <div>
                  <div style={{ marginBottom: "8px", fontSize: "14px", color: "#8c8c8c" }}>
                    Tỷ lệ hoàn thành đơn
                  </div>
                  <Progress
                    percent={95}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    strokeWidth={12}
                    format={(percent) => `${percent}%`}
                  />
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div>
                  <div style={{ marginBottom: "8px", fontSize: "14px", color: "#8c8c8c" }}>
                    Tỷ lệ khách hàng quay lại
                  </div>
                  <Progress
                    percent={78}
                    strokeColor={{
                      '0%': '#f093fb',
                      '100%': '#f5576c',
                    }}
                    strokeWidth={12}
                  />
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div>
                  <div style={{ marginBottom: "8px", fontSize: "14px", color: "#8c8c8c" }}>
                    Đánh giá trung bình
                  </div>
                  <Progress
                    percent={92}
                    strokeColor={{
                      '0%': '#fa709a',
                      '100%': '#fee140',
                    }}
                    strokeWidth={12}
                    format={(percent) => `${(percent / 20).toFixed(1)}⭐`}
                  />
                </div>
              </Col>
              <Col xs={24} md={6}>
                <div>
                  <div style={{ marginBottom: "8px", fontSize: "14px", color: "#8c8c8c" }}>
                    Tốc độ giao hàng
                  </div>
                  <Progress
                    percent={88}
                    strokeColor={{
                      '0%': '#4facfe',
                      '100%': '#00f2fe',
                    }}
                    strokeWidth={12}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Report;