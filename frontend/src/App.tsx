import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import { ConfigProvider } from "antd";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/products/ProductPage";

function App() {
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
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
