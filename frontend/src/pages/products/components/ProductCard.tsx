import { useAddToCart } from "@/hooks/useAddToCart";
import type { Product } from "@/types";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { handleAddToCart, contextHolder, isLoading } = useAddToCart();

  return (
    <>
      {contextHolder}
      <Card
        hoverable
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
              src={product.images[0]?.image}
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
            {/* {product.price && (
                            <Tag
                              color="red"
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                fontSize: "12px",
                                padding: "2px 8px",
                              }}
                            >
                              {Math.round(
                                (1 - product.price / product.originalPrice) * 100
                              )}
                              % OFF
                            </Tag>
                          )} */}
          </div>
        }
        bodyStyle={{ padding: "16px" }}
      >
        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", color: "#999" }}>
            {product.store_name}
          </span>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <h4
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h4>
        </div>
        <div style={{ marginBottom: "10px" }}>
          {/* <Rate
                          disabled
                          defaultValue={product.rating}
                          style={{ fontSize: "12px" }}
                        /> */}
          {/* <span
                          style={{
                            marginLeft: "6px",
                            color: "#666",
                            fontSize: "12px",
                          }}
                        >
                          ({product.reviewCount})
                        </span> */}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1890ff",
            }}
          >
            ${product.price}
          </span>
          {product.price && (
            <span
              style={{
                fontSize: "13px",
                color: "#999",
                textDecoration: "line-through",
              }}
            >
              ${product.price}
            </span>
          )}
        </div>
        <Button
          type="primary"
          block
          icon={<ShoppingCartOutlined />}
          size="small"
          onClick={() => handleAddToCart(product.id)}
          loading={isLoading}
        >
          Add to Cart
        </Button>
      </Card>
    </>
  );
}
