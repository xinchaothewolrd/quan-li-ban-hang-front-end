import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar chiếm chiều rộng cố định */}
      <div style={{ width: 240 }}>
        <Sidebar />
      </div>

      {/* Nội dung chính chiếm phần còn lại */}
      <main style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;