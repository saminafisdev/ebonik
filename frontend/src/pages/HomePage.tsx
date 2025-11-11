import { Button, Card, Carousel, Col, Input, Row, Spin } from "antd";
import { ChevronRightIcon, MailIcon } from "lucide-react";
import ProductDetailPage from "./products/ProductDetailPage";
import { useState } from "react";
import { useGetAllCategoriesQuery } from "@/app/services/categories";

export default function HomePage() {
  // const featuredProducts = products.slice(0, 8);
  const [selectedProductId] = useState<number | null>(null);
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery();

  if (selectedProductId) {
    return (
      <div>
        <ProductDetailPage />
      </div>
    );
  }

  return (
    <div>
      <Carousel autoplay style={{ marginBottom: "60px" }}>
        <div>
          <div
            style={{
              height: "500px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Summer Sale 2024
              </h1>
              <p
                style={{
                  fontSize: "24px",
                  marginBottom: "30px",
                  color: "#fff",
                }}
              >
                Up to 50% off on selected items
              </p>
              <Button type="primary" size="large">
                Shop Now <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              height: "500px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                New Arrivals
              </h1>
              <p
                style={{
                  fontSize: "24px",
                  marginBottom: "30px",
                  color: "#fff",
                }}
              >
                Discover the latest trends
              </p>
              <Button type="primary" size="large">
                Explore Now <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              height: "500px",
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Free Shipping
              </h1>
              <p
                style={{
                  fontSize: "24px",
                  marginBottom: "30px",
                  color: "#fff",
                }}
              >
                On orders over $50
              </p>
              <Button type="primary" size="large">
                Start Shopping <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </Carousel>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Shop by Category
          </h2>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Browse our wide range of product categories
          </p>
        </div>

        <Row gutter={[24, 24]} style={{ marginBottom: "80px" }}>
          {isCategoriesLoading ? (
            <Spin />
          ) : (
            categories?.map((category) => (
              <Col xs={12} sm={12} md={8} lg={6} key={category.id}>
                <Card
                  hoverable
                  style={{
                    textAlign: "center",
                    height: "100%",
                    transition: "all 0.3s ease",
                  }}
                  bodyStyle={{ padding: "30px 20px" }}
                >
                  {/* {categoryIcons[category.icon]} */}
                  <h3
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    {category.name}
                  </h3>
                  <p style={{ color: "#666", margin: 0 }}>
                    {category.products_count} products
                  </p>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Featured Products
          </h2>
          <p style={{ fontSize: "16px", color: "#666" }}>
            Check out our best-selling items
          </p>
        </div>

        {/* <Row gutter={[24, 24]} style={{ marginBottom: "80px" }}>
          {featuredProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                onClick={() => setSelectedProductId(product.id)}
                cover={
                  <div
                    style={{
                      height: "240px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      alt={product.name}
                      // src={product?.images[0]?.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    {product.price && (
                      <Tag
                        color="red"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          fontSize: "14px",
                          padding: "4px 12px",
                        }}
                      >
                        SALE
                      </Tag>
                    )}
                  </div>
                }
              >
                <div style={{ marginBottom: "10px" }}>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "600",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </h4>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Rate
                    disabled
                    defaultValue={3}
                    style={{ fontSize: "14px" }}
                  />
                  <span
                    style={{
                      marginLeft: "8px",
                      color: "#666",
                      fontSize: "12px",
                    }}
                  >
                    (100)
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#1890ff",
                    }}
                  >
                    ${product.price}
                  </span>
                  {product.price && (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#999",
                        textDecoration: "line-through",
                      }}
                    >
                      ${product.price}
                    </span>
                  )}
                </div>
                <Button type="primary" block>
                  Add to Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row> */}

        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            padding: "60px 40px",
            textAlign: "center",
            color: "#fff",
            marginBottom: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#fff",
              marginBottom: "15px",
            }}
          >
            Join Our Newsletter
          </h2>
          <p style={{ fontSize: "16px", marginBottom: "30px", color: "#fff" }}>
            Subscribe to get special offers, free giveaways, and exclusive deals
          </p>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Input.Group compact>
              <Input
                size="large"
                style={{ width: "calc(100% - 120px)" }}
                placeholder="Enter your email"
                prefix={<MailIcon />}
              />
              <Button type="primary" size="large" style={{ width: "120px" }}>
                Subscribe
              </Button>
            </Input.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
