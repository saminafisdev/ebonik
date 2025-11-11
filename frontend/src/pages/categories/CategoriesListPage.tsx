import { useState } from "react";
import { Card, Row, Col, Breadcrumb, Input, Button, Spin, Alert } from "antd";
import { HomeOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import type { Category } from "@/types";
import { useGetAllCategoriesQuery } from "@/app/services/categories";
import { Link } from "react-router";

export default function CategoriesListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();

  // Filter categories by search
  const filteredCategories =
    categories?.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
      <Breadcrumb
        style={{ marginBottom: "30px" }}
        items={[
          {
            title: (
              <Link to="/" style={{ cursor: "pointer" }}>
                <HomeOutlined /> Home
              </Link>
            ),
          },
          { title: "Categories" },
        ]}
      />

      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}
        >
          All Categories
        </h1>
        <p style={{ fontSize: "16px", color: "#666", marginBottom: "30px" }}>
          Browse through our complete collection of product categories
        </p>

        <Input
          size="large"
          placeholder="Search categories..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "500px" }}
        />
      </div>

      {/* Loading / Error states */}
      {isLoading && <Spin size="large" />}
      {isError && <Alert type="error" message="Failed to load categories" />}

      {!isLoading && !isError && (
        <>
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontSize: "16px", color: "#666" }}>
              Showing {filteredCategories.length}{" "}
              {filteredCategories.length === 1 ? "category" : "categories"}
            </span>
          </div>

          <Row gutter={[24, 24]}>
            {filteredCategories.map((category: Category) => (
              <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f0f0f0",
                      }}
                    >
                      {/* Placeholder image since API doesn’t provide one */}
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {category.name}
                      </span>
                    </div>
                  }
                  bodyStyle={{ padding: "20px" }}
                >
                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      {category.subcategories.length} subcategories
                    </p>
                    <p style={{ color: "#666", fontSize: "14px" }}>
                      {category.products_count} product(s)
                    </p>
                  </div>
                  <Link to={`/categories/${category.slug}`}>
                    <Button type="primary" block>
                      View Products <RightOutlined />
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredCategories.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#999",
              }}
            >
              <SearchOutlined
                style={{ fontSize: "64px", marginBottom: "20px" }}
              />
              <h3 style={{ fontSize: "20px", color: "#999" }}>
                No categories found
              </h3>
              <p>Try searching with different keywords</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
