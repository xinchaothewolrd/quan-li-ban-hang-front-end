import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import { Search, Plus, Edit2, Trash2, Eye, X, Mail, Phone, Briefcase, Calendar } from 'lucide-react';

const { Option } = Select;

const initialData = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    phone: "0901234567",
    gender: "Nam",
    position: "Quản lý",
    age: 35,
    image: "https://i.pravatar.cc/150?img=12",
    status: "active",
    department: "Kinh doanh"
  },
  {
    key: "2",
    name: "Trần Thị B",
    email: "thib@example.com",
    phone: "0912345678",
    gender: "Nữ",
    position: "Nhân viên",
    age: 28,
    image: "https://i.pravatar.cc/150?img=45",
    status: "active",
    department: "Marketing"
  },
  {
    key: "3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    gender: "Nam",
    position: "Trưởng phòng",
    age: 32,
    image: "https://i.pravatar.cc/150?img=33",
    status: "active",
    department: "Nhân sự"
  },
  {
    key: "4",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    gender: "Nữ",
    position: "Nhân viên",
    age: 25,
    image: "https://i.pravatar.cc/150?img=47",
    status: "inactive",
    department: "IT"
  },
];

const Staff = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [detailStaff, setDetailStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [form] = Form.useForm();

  const showModal = (record = null) => {
    setEditingStaff(record);
    setIsModalOpen(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingStaff) {
        setData((prev) =>
          prev.map((item) =>
            item.key === editingStaff.key ? { ...item, ...values } : item
          )
        );
        message.success("Cập nhật nhân viên thành công!");
      } else {
        const newKey = (data.length + 1).toString();
        setData([...data, { key: newKey, status: "active", ...values }]);
        message.success("Thêm nhân viên thành công!");
      }
      setIsModalOpen(false);
      setEditingStaff(null);
      form.resetFields();
    });
  };

  const handleDelete = (key) => {
    setData((prev) => prev.filter((item) => item.key !== key));
    message.success("Đã xóa nhân viên!");
  };

  const showDetail = (record) => {
    setDetailStaff(record);
    setIsDetailOpen(true);
  };

  const filteredData = data.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDepartment = filterDepartment === "all" || item.department === filterDepartment;
    return matchSearch && matchDepartment;
  });

  const departments = [...new Set(data.map(item => item.department))];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Quản lý Nhân viên</h1>
          <p style={styles.subtitle}>Quản lý và theo dõi thông tin nhân viên</p>
        </div>
        <button style={styles.addButton} onClick={() => showModal()}>
          <Plus size={20} />
          <span>Thêm nhân viên</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div style={styles.statIcon}>👥</div>
          <div>
            <div style={styles.statNumber}>{data.length}</div>
            <div style={styles.statLabel}>Tổng nhân viên</div>
          </div>
        </div>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
          <div style={styles.statIcon}>✅</div>
          <div>
            <div style={styles.statNumber}>{data.filter(s => s.status === 'active').length}</div>
            <div style={styles.statLabel}>Đang hoạt động</div>
          </div>
        </div>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
          <div style={styles.statIcon}>📊</div>
          <div>
            <div style={styles.statNumber}>{departments.length}</div>
            <div style={styles.statLabel}>Phòng ban</div>
          </div>
        </div>
        <div style={{...styles.statCard, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
          <div style={styles.statIcon}>⭐</div>
          <div>
            <div style={styles.statNumber}>{data.filter(s => s.position.includes('Quản lý') || s.position.includes('Trưởng')).length}</div>
            <div style={styles.statLabel}>Quản lý</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterSection}>
        <div style={styles.searchBox}>
          <Search size={20} color="#999" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          style={styles.filterSelect}
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="all">Tất cả phòng ban</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Staff Grid */}
      <div style={styles.gridContainer}>
        {filteredData.map((staff) => (
          <div key={staff.key} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.avatarWrapper}>
                <img src={staff.image} alt={staff.name} style={styles.avatar} />
                <div style={{
                  ...styles.statusBadge,
                  backgroundColor: staff.status === 'active' ? '#10b981' : '#ef4444'
                }}></div>
              </div>
              <div style={styles.cardActions}>
                <button style={styles.iconButton} onClick={() => showDetail(staff)}>
                  <Eye size={16} />
                </button>
                <button style={styles.iconButton} onClick={() => showModal(staff)}>
                  <Edit2 size={16} />
                </button>
                <button 
                  style={{...styles.iconButton, color: '#ef4444'}} 
                  onClick={() => {
                    if (window.confirm('Bạn có chắc muốn xóa nhân viên này?')) {
                      handleDelete(staff.key);
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div style={styles.cardBody}>
              <h3 style={styles.cardName}>{staff.name}</h3>
              <div style={styles.positionBadge}>{staff.position}</div>
              
              <div style={styles.infoList}>
                <div style={styles.infoItem}>
                  <Mail size={14} color="#666" />
                  <span>{staff.email}</span>
                </div>
                <div style={styles.infoItem}>
                  <Phone size={14} color="#666" />
                  <span>{staff.phone}</span>
                </div>
                <div style={styles.infoItem}>
                  <Briefcase size={14} color="#666" />
                  <span>{staff.department}</span>
                </div>
                <div style={styles.infoItem}>
                  <Calendar size={14} color="#666" />
                  <span>{staff.age} tuổi • {staff.gender}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🔍</div>
          <h3 style={styles.emptyTitle}>Không tìm thấy nhân viên</h3>
          <p style={styles.emptyText}>Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
        </div>
      )}

      {/* Modal Add/Edit */}
      <Modal
        title={<div style={styles.modalTitle}>{editingStaff ? "✏️ Sửa thông tin" : "➕ Thêm nhân viên mới"}</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
      >
        <Form form={form} layout="vertical">
          <div style={styles.formRow}>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              style={{flex: 1}}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Tuổi"
              name="age"
              style={{width: '150px'}}
            >
              <InputNumber size="large" style={{ width: "100%" }} />
            </Form.Item>
          </div>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input size="large" />
          </Form.Item>
          
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input size="large" />
          </Form.Item>
          
          <div style={styles.formRow}>
            <Form.Item label="Giới tính" name="gender" style={{flex: 1}}>
              <Select size="large">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="Chức vụ" name="position" style={{flex: 1}}>
              <Input size="large" />
            </Form.Item>
          </div>
          
          <Form.Item label="Phòng ban" name="department">
            <Select size="large">
              <Option value="Kinh doanh">Kinh doanh</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Nhân sự">Nhân sự</Option>
              <Option value="IT">IT</Option>
              <Option value="Kế toán">Kế toán</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="Hình ảnh (URL)" name="image">
            <Input size="large" placeholder="https://example.com/avatar.jpg" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Detail */}
      {detailStaff && (
        <div 
          style={{
            ...styles.detailModal,
            display: isDetailOpen ? 'flex' : 'none'
          }}
          onClick={() => setIsDetailOpen(false)}
        >
          <div style={styles.detailContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onClick={() => setIsDetailOpen(false)}
            >
              <X size={24} />
            </button>
            
            <div style={styles.detailHeader}>
              <div style={styles.detailAvatarWrapper}>
                <img src={detailStaff.image} alt={detailStaff.name} style={styles.detailAvatar} />
                <div style={{
                  ...styles.detailStatusBadge,
                  backgroundColor: detailStaff.status === 'active' ? '#10b981' : '#ef4444'
                }}>
                  {detailStaff.status === 'active' ? 'Đang hoạt động' : 'Tạm nghỉ'}
                </div>
              </div>
              <h2 style={styles.detailName}>{detailStaff.name}</h2>
              <div style={styles.detailPosition}>{detailStaff.position}</div>
            </div>
            
            <div style={styles.detailBody}>
              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Thông tin liên hệ</h3>
                <div style={styles.detailInfo}>
                  <div style={styles.detailLabel}>📧 Email</div>
                  <div style={styles.detailValue}>{detailStaff.email}</div>
                </div>
                <div style={styles.detailInfo}>
                  <div style={styles.detailLabel}>📱 Số điện thoại</div>
                  <div style={styles.detailValue}>{detailStaff.phone}</div>
                </div>
              </div>
              
              <div style={styles.detailSection}>
                <h3 style={styles.detailSectionTitle}>Thông tin cá nhân</h3>
                <div style={styles.detailInfo}>
                  <div style={styles.detailLabel}>👤 Giới tính</div>
                  <div style={styles.detailValue}>{detailStaff.gender}</div>
                </div>
                <div style={styles.detailInfo}>
                  <div style={styles.detailLabel}>🎂 Tuổi</div>
                  <div style={styles.detailValue}>{detailStaff.age} tuổi</div>
                </div>
                <div style={styles.detailInfo}>
                  <div style={styles.detailLabel}>🏢 Phòng ban</div>
                  <div style={styles.detailValue}>{detailStaff.department}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    color: '#64748b',
    margin: 0,
    fontSize: '14px'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    padding: '25px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s',
    cursor: 'pointer'
  },
  statIcon: {
    fontSize: '40px'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  statLabel: {
    fontSize: '13px',
    opacity: 0.9
  },
  filterSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px'
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '2px solid transparent',
    transition: 'all 0.3s'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    backgroundColor: 'transparent'
  },
  filterSelect: {
    padding: '12px 20px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '15px',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    minWidth: '200px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  cardHeader: {
    padding: '25px 25px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  avatarWrapper: {
    position: 'relative'
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '16px',
    objectFit: 'cover',
    border: '4px solid #f1f5f9'
  },
  statusBadge: {
    position: 'absolute',
    bottom: '-5px',
    right: '-5px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '3px solid white'
  },
  cardActions: {
    display: 'flex',
    gap: '8px'
  },
  iconButton: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  cardBody: {
    padding: '20px 25px 25px'
  },
  cardName: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1e293b'
  },
  positionBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '20px'
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#475569'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: 'white',
    borderRadius: '16px',
    marginTop: '20px'
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '10px'
  },
  emptyText: {
    color: '#64748b',
    fontSize: '16px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  formRow: {
    display: 'flex',
    gap: '15px'
  },
  detailModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    backdropFilter: 'blur(5px)'
  },
  detailContent: {
    backgroundColor: 'white',
    borderRadius: '24px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    zIndex: 10
  },
  detailHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '60px 40px 40px',
    textAlign: 'center',
    color: 'white'
  },
  detailAvatarWrapper: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '20px'
  },
  detailAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '6px solid rgba(255,255,255,0.3)',
    objectFit: 'cover'
  },
  detailStatusBadge: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    border: '3px solid white'
  },
  detailName: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  },
  detailPosition: {
    fontSize: '16px',
    opacity: 0.9
  },
  detailBody: {
    padding: '40px'
  },
  detailSection: {
    marginBottom: '30px'
  },
  detailSectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e2e8f0'
  },
  detailInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  detailLabel: {
    color: '#64748b',
    fontSize: '15px'
  },
  detailValue: {
    color: '#1e293b',
    fontSize: '15px',
    fontWeight: '600'
  }
};

export default Staff;