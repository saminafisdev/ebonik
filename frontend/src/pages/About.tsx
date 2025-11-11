import { Typography, Row, Col, Card, Button, Image } from "antd";
import { Link } from "react-router";

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography.Title level={2} style={{ fontWeight: "bold" }}>
          About e<span style={{ color: "#d84a1b" }}>Bonik</span>
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: "16px", color: "#555" }}>
          At eBonik, we believe shopping should be simple, enjoyable, and
          accessible for everyone. Our mission is to bring you quality products
          with a seamless online experience.
        </Typography.Paragraph>
      </div>

      {/* Content Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              height: "100%",
            }}
          >
            <Image src="https://images.pexels.com/photos/25310898/pexels-photo-25310898.jpeg" />
            <Typography.Title level={4}>Our Story</Typography.Title>
            <Typography.Paragraph>
              Founded with a vision to modernize e-commerce in Bangladesh,
              eBonik started as a small project and has grown into a trusted
              platform. We focus on customer satisfaction, reliability, and
              innovation.
            </Typography.Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              height: "100%",
            }}
          >
            <Image src="https://images.pexels.com/photos/15543028/pexels-photo-15543028.jpeg" />
            <Typography.Title level={4}>Our Values</Typography.Title>
            <Typography.Paragraph>
              We stand for transparency, trust, and technology. Every product
              listed on eBonik is carefully curated, and our team works hard to
              ensure you get the best deals with the best service.
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Typography.Text style={{ fontSize: "16px", color: "#555" }}>
          Want to explore more?
        </Typography.Text>
        <br />
        <Link to="/">
          <Button type="primary" size="large" style={{ marginTop: "12px" }}>
            Visit Our Shop
          </Button>
        </Link>
      </div>
    </div>
  );
}
