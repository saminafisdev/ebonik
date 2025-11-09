import { useState } from "react";
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  Tabs,
  Rate,
  Tag,
  Input,
  Avatar,
  Divider,
  Space,
  InputNumber,
  Spin,
  Alert,
} from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  TruckOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useGetProductByIdQuery } from "../../app/services/products";
import { Link, useNavigate, useParams } from "react-router";

export default function ProductDetailPage() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(productId ?? "");
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <Alert
          message="Error"
          description="Failed to load product details."
          type="error"
          showIcon
        />
        <Button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
          Back to Products
        </Button>
      </div>
    );
  }

  const mockReviews = [
    {
      id: 1,
      author: "John Smith",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent product",
      content: "Really great quality and fast delivery. Highly recommend!",
      verified: true,
      avatar: "JS",
    },
    {
      id: 2,
      author: "Sarah Johnson",
      rating: 4,
      date: "2024-01-10",
      title: "Good value for money",
      content:
        "Good product overall. Packaging could be better but arrived in good condition.",
      verified: true,
      avatar: "SJ",
    },
    {
      id: 3,
      author: "Mike Chen",
      rating: 5,
      date: "2024-01-05",
      title: "Love it",
      content:
        "Exactly what I was looking for. Great quality and reasonable price.",
      verified: true,
      avatar: "MC",
    },
  ];

  const productImages = product.images.map((img) => img.image);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
      <Breadcrumb
        style={{ marginBottom: "30px" }}
        items={[
          {
            title: (
              <Link to="/">
                <HomeOutlined /> Home
              </Link>
            ),
          },
          { title: "Products" },
          { title: product.category_name },
          { title: product.name },
        ]}
      />

      <Row gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <div>
            <div
              style={{
                width: "100%",
                height: "500px",
                background: "#f0f0f0",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <Row gutter={8}>
              {productImages.map((img, index) => (
                <Col key={index} span={6}>
                  <div
                    onClick={() => setSelectedImage(index)}
                    style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        selectedImage === index
                          ? "3px solid #1890ff"
                          : "2px solid #d9d9d9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Product thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#000",
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div>
                <Rate
                  disabled
                  defaultValue={4.5}
                  style={{ fontSize: "18px" }}
                />
              </div>
              <span style={{ color: "#666" }}>4.5 (120 reviews)</span>
              {product.stock > 0 && <Tag color="green">In Stock</Tag>}
            </div>

            <Divider style={{ margin: "20px 0" }} />

            <div style={{ marginBottom: "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "15px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  ${product.price}
                </span>
                <>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#999",
                      textDecoration: "line-through",
                    }}
                  >
                    ${Number(product.price) + 100}
                  </span>
                  <Tag color="red">Save $100</Tag>
                </>
              </div>
              <p style={{ color: "#999", fontSize: "14px" }}>
                Free shipping on orders over $50
              </p>
            </div>

            <div style={{ marginBottom: "25px" }}>
              <p style={{ marginBottom: "10px", fontWeight: "600" }}>
                Quantity:
              </p>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                style={{ width: "100px" }}
              />
            </div>

            <Space
              style={{ width: "100%", marginBottom: "30px" }}
              direction="vertical"
              size="middle"
            >
              <Button
                type="primary"
                size="large"
                block
                icon={<ShoppingCartOutlined />}
              >
                Add to Cart
              </Button>
              <Button
                size="large"
                block
                onClick={() => setIsFavorited(!isFavorited)}
                icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
              >
                {isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              <Button size="large" block icon={<ShareAltOutlined />}>
                Share
              </Button>
            </Space>

            <Divider style={{ margin: "25px 0" }} />

            <div
              style={{
                background: "#f5f5f5",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "flex-start",
                  }}
                >
                  <TruckOutlined
                    style={{
                      fontSize: "24px",
                      color: "#1890ff",
                      marginTop: "4px",
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: "600", margin: 0 }}>
                      Free Delivery
                    </p>
                    <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
                      On orders over $50
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "flex-start",
                  }}
                >
                  <SafetyOutlined
                    style={{
                      fontSize: "24px",
                      color: "#1890ff",
                      marginTop: "4px",
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: "600", margin: 0 }}>
                      Secure Payment
                    </p>
                    <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
                      100% secure transactions
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "flex-start",
                  }}
                >
                  <CheckCircleOutlined
                    style={{
                      fontSize: "24px",
                      color: "#1890ff",
                      marginTop: "4px",
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: "600", margin: 0 }}>Easy Returns</p>
                    <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
                      30-day return guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Divider style={{ margin: "25px 0" }} />

            <div>
              <p style={{ fontWeight: "600", marginBottom: "10px" }}>
                Brand: {product.store_name}
              </p>
              <p style={{ color: "#666", marginBottom: "15px" }}>
                {product.description}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Divider style={{ margin: "60px 0" }} />

      <Tabs
        items={[
          {
            key: "1",
            label: "Description",
            children: (
              <div>
                <h3 style={{ fontWeight: "600", marginBottom: "15px" }}>
                  Product Details
                </h3>
                <p>{product.description}</p>
                <h3 style={{ fontWeight: "600", margin: "25px 0 15px 0" }}>
                  Key Features
                </h3>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>High-quality materials</li>
                  <li>Eco-friendly packaging</li>
                  <li>Extended warranty included</li>
                  <li>Professional customer support</li>
                  <li>Money-back guarantee</li>
                </ul>
                <h3 style={{ fontWeight: "600", margin: "25px 0 15px 0" }}>
                  Specifications
                </h3>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td
                        style={{
                          padding: "10px 0",
                          fontWeight: "600",
                          width: "30%",
                        }}
                      >
                        Brand
                      </td>
                      <td style={{ padding: "10px 0" }}>
                        {product.store_name}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "10px 0", fontWeight: "600" }}>
                        Category
                      </td>
                      <td style={{ padding: "10px 0" }}>
                        {product.category_name}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "10px 0", fontWeight: "600" }}>
                        In Stock
                      </td>
                      <td style={{ padding: "10px 0" }}>
                        {product.stock > 0 ? "Yes" : "No"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 0", fontWeight: "600" }}>
                        Rating
                      </td>
                      <td style={{ padding: "10px 0" }}>4.5 out of 5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            key: "2",
            label: `Reviews (120)`,
            children: (
              <div>
                <div style={{ marginBottom: "40px" }}>
                  <h3 style={{ fontWeight: "600", marginBottom: "20px" }}>
                    Write a Review
                  </h3>
                  <div style={{ marginBottom: "15px" }}>
                    <p style={{ marginBottom: "10px", fontWeight: "600" }}>
                      Rating
                    </p>
                    <Rate value={rating} onChange={setRating} />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <Input.TextArea
                      rows={4}
                      placeholder="Share your thoughts about this product..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  <Button type="primary">Submit Review</Button>
                </div>

                <Divider style={{ margin: "30px 0" }} />

                <h3 style={{ fontWeight: "600", marginBottom: "20px" }}>
                  Customer Reviews
                </h3>
                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    style={{
                      marginBottom: "25px",
                      paddingBottom: "25px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
                        {review.avatar}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "5px",
                          }}
                        >
                          <span style={{ fontWeight: "600" }}>
                            {review.author}
                          </span>
                          {review.verified && (
                            <Tag color="green" style={{ fontSize: "12px" }}>
                              Verified
                            </Tag>
                          )}
                        </div>
                        <Rate
                          disabled
                          defaultValue={review.rating}
                          style={{ fontSize: "14px" }}
                        />
                        <span
                          style={{
                            marginLeft: "10px",
                            color: "#999",
                            fontSize: "14px",
                          }}
                        >
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <h4 style={{ fontWeight: "600", margin: "10px 0" }}>
                      {review.title}
                    </h4>
                    <p style={{ color: "#666", margin: 0 }}>{review.content}</p>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
        style={{ marginBottom: "60px" }}
      />
    </div>
  );
}
