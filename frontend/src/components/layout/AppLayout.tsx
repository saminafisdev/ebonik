import "./layout.css";

import { Badge, Button, Drawer, Layout, Menu, theme } from "antd";
import { Input } from "antd";
import type { GetProps, MenuProps } from "antd";
import { Link, Outlet, useLocation } from "react-router";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";
import AccountDropdown from "../AccountDropdown";

const { Header, Content } = Layout;

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const menuItems = [
  { key: "", label: <Link to="/">Home</Link> },
  { key: "categories", label: <Link to="/categories">Categories</Link> },
  { key: "products", label: <Link to="/products">Products</Link> },
  { key: "deals", label: <Link to="/deals">Deals</Link> },
  { key: "about", label: <Link to="/about">About</Link> },
];

export default function AppLayout() {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = useState(location.pathname.split("/")[1]);

  useEffect(() => {
    setCurrent(location.pathname.split("/")[1]);
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {/* Left side: Logo + Menu (desktop) */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            to="/"
            style={{
              color: "#000",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            e<span style={{ color: "#d84a1b" }}>Bonik</span>
          </Link>

          {/* Desktop menu */}
          <div className="desktop-menu">
            <Menu
              onClick={onClick}
              mode="horizontal"
              style={{ flex: 1, minWidth: 0 }}
              selectedKeys={[current]}
              items={menuItems}
            />
          </div>
        </div>

        {/* Right side: Search + Cart + User */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div className="desktop-search">
            <Search
              allowClear
              placeholder="Search shop..."
              size="large"
              onSearch={onSearch}
              enterButton
            />
          </div>

          <Badge count={3} offset={[-5, 5]}>
            <Link to={"/cart"}>
              <Button
                type="text"
                icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
              />
            </Link>
          </Badge>

          <AccountDropdown user={user} />

          {/* Mobile menu toggle */}
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: "20px" }} />}
            className="mobile-toggle"
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Drawer for mobile menu */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Search
            allowClear
            placeholder="Search shop..."
            size="middle"
            onSearch={onSearch}
            style={{ marginBottom: 16 }}
            enterButton
          />
          <Menu
            onClick={onClick}
            mode="inline"
            selectedKeys={[current]}
            items={menuItems}
          />
        </Drawer>
      </Header>

      <Content>
        <div
          style={{
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
