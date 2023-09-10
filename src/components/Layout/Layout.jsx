import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  FiHome,
  FiUser,
  FiFileText,
  FiShoppingBag,
  FiLogOut,
  FiSettings,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import "./Layout.scss";
import { Link } from "react-router-dom";
import { AdminHooks } from "../../Features";
import { IconButton, useMediaQuery } from "@mui/material";
const { Header, Sider, Content } = Layout;
const AppLayout = ({ children, active }) => {
  const isTablet = useMediaQuery("(max-width:768px)");
  const { useAdminDetails } = AdminHooks;
  const { admin } = useAdminDetails();
  const handleClick = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className={`site-layout-pranet ${isSidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="test">
        <Sider
          width={250}
          theme="light"
          breakpoint="md"
          collapsedWidth="0"
          collapsed={isSidebarCollapsed}
          onCollapse={toggleSidebar}
        >
          <div className="logo d-flex a-center j-center mt-3 mb-3">
            ECOMMERCE.
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={[active]}>
            <Menu.Item key="1" icon={<FiHome />}>
              <Link to={"/"}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FiUser />}>
              <Link to={"/customers"}>Customers</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FiShoppingBag />}>
              <Link to={"/orders"}> Orders </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<FiFileText />}>
              <Link to={"/props"}> Properties</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FiFileText />}>
              <Link to={"/category"}> Categories</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<FiFileText />}>
              <Link to={"/product"}> Products</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<FiSettings />}>
              <Link to={"/settings"}> Settings</Link>
            </Menu.Item>
            <Menu.Item
              key="8"
              icon={<FiLogOut />}
              onClick={() => handleClick()}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      </div>

      <Layout className="site-layout">
        <Header
          className="site-layout-background d-flex a-center j-between"
          style={{ background: "#fff", padding: "0 16px" }}
        >
          <div className="user-info g-15">
            {!isTablet && (
              <IconButton onClick={toggleSidebar}>
                {isSidebarCollapsed ? (
                  <FiArrowRight style={{ fontSize: "2rem" }} />
                ) : (
                  <FiArrowLeft style={{ fontSize: "2rem" }} />
                )}
              </IconButton>
            )}
          </div>
          <div className="user-info d-flex a-center j-end g-15">
            <span className="user-name">{admin?.name}</span>
          </div>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
