import React from "react";
import { Layout } from "antd";
import AppHeader from "../components/Header";
import { Outlet } from "react-router-dom";



const CustomerLayout = () => (
  <>
      <AppHeader />
      <main className="min-h-[80vh] p-4">
        <Outlet />
      </main>
    </>
);

export default CustomerLayout;