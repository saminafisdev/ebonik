import { useState } from "react";
import { Row, Col, Breadcrumb, Select, Button, Drawer, Spin } from "antd";
import { FilterIcon, HomeIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useGetProductsQuery } from "@/app/services/products";
import { useGetCategoryBySlugQuery } from "@/app/services/categories";
import ProductCard from "../products/components/ProductCard";

export default function CategoryDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState("featured");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch category detail
  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetCategoryBySlugQuery(slug?.toString() || "");

  // Fetch products filtered by category slug
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery({ category: slug });

  if (categoryError || productsError) return <div>Error loading category</div>;

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "30px 20px" }}>
      <Breadcrumb
        style={{ marginBottom: "30px" }}
        items={[
          {
            title: (
              <Link to={"/"} style={{ cursor: "pointer" }}>
                <HomeIcon size={20} />
              </Link>
            ),
          },
          { title: <Link to={"/categories"}>Categories</Link> },
          { title: category?.name || "Category" },
        ]}
      />

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={18}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
                {categoryLoading ? "Loading..." : category?.name}
              </h1>
              <p style={{ color: "#666", margin: "5px 0 0 0" }}>
                {category?.products_count ?? 0} products available
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Button
                icon={<FilterIcon />}
                onClick={() => setDrawerVisible(true)}
                className="mobile-filter-btn"
                style={{ display: "none" }}
              >
                Filters
              </Button>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: 180 }}
                options={[
                  { label: "Featured", value: "featured" },
                  { label: "Price: Low to High", value: "price-low" },
                  { label: "Price: High to Low", value: "price-high" },
                  { label: "Highest Rated", value: "rating" },
                  { label: "Newest", value: "newest" },
                ]}
              />
            </div>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
            {productsLoading ? (
              <Spin size="large" />
            ) : (
              products.map((product) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>

      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {/* FilterSidebar could go here */}
      </Drawer>

      <style>{`
        @media (max-width: 992px) {
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
