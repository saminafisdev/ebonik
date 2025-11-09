import { Badge, Button, Layout, Menu, theme } from "antd";
import { Input } from "antd";
import type { GetProps, MenuProps } from "antd";
import { ShoppingCartIcon, User2Icon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import Footer from "../Footer";
import { useEffect, useState } from "react";

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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
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
          {/* <Menu
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
            selectedKeys={[current]}
          >
            {menuItems.map(({ key, label, route }) => (
              <Menu.Item key={key} onClick={onClick}>
                <NavLink to={`/${route}`}>{label}</NavLink>
              </Menu.Item>
            ))}
          </Menu> */}
          <Menu
            onClick={onClick}
            mode="horizontal"
            style={{ flex: 1, minWidth: 0 }}
            selectedKeys={[current]}
            items={menuItems}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Search
            allowClear
            placeholder="Search products..."
            size="large"
            onSearch={onSearch}
          />
          <Badge count={3} offset={[-5, 5]}>
            <Button
              type="text"
              icon={<ShoppingCartIcon style={{ fontSize: "20px" }} />}
            />
          </Badge>
          <Button type="text" icon={<User2Icon />} />
        </div>
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
