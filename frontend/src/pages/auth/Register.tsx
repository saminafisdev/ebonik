import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router";
import "./auth.css";

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-form">
        <div className="brand">
          <h1>eBonik</h1>
        </div>
        <h2>Create an account</h2>
        <Form
          name="register"
          className="register-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
