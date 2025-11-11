import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import { ConfigProvider, Typography } from "antd";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/products/ProductPage";
import CartPage from "./pages/cart/CartPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./pages/auth/auth.css";
import { useGetCurrentUserQuery } from "./app/services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "./pages/auth/authSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { volcano } from "@ant-design/colors";
import CategoriesListPage from "./pages/categories/CategoriesListPage";
import CategoryDetailsPage from "./pages/categories/CategoryDetailPage";

function App() {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useGetCurrentUserQuery(undefined);

  if (isLoading) {
    return (
      <>
        <DotLottieReact
          style={{ height: "400px" }}
          src="/animations/delivery_truck.json"
          loop
          autoplay
        />
        <Typography.Title style={{ textAlign: "center" }}>
          e<span style={{ color: volcano.primary }}>Bonik</span>
        </Typography.Title>
        <Typography.Title level={5} style={{ textAlign: "center" }}>
          Your one stop destination for quality products at amazing prices. Shop
          with confidence and enjoy fast delivery
        </Typography.Title>
      </>
    );
  }

  if (isSuccess) {
    dispatch(setCredentials(user));
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          fontSize: 14,
        },
      }}
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/categories">
            <Route index element={<CategoriesListPage />} />
            <Route path=":slug" element={<CategoryDetailsPage />} />
          </Route>
          <Route path="/products">
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
