import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Typography,
  message,
  Row,
  Col,
  Switch,
} from "antd";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import {
  useRegisterMutation,
  useLazyGetCurrentUserQuery,
  useLoginMutation,
} from "@/app/services/auth";
import { blue, volcano } from "@ant-design/colors";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trigger] = useLazyGetCurrentUserQuery();
  const [mutate] = useRegisterMutation();
  const [loginTrigger] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();

  type RegisterPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "customer" | "vendor";
  };

  async function onFinish(values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    isSeller: boolean;
  }) {
    const { isSeller, ...rest } = values;

    const payload: RegisterPayload = {
      ...rest,
      role: isSeller ? "vendor" : "customer",
    };
    try {
      // Step 1: Register
      await mutate(payload).unwrap();
      messageApi.success("Account created successfully 🎉");

      // Step 2: Login (cookies will be set automatically)
      await loginTrigger({
        email: values.email,
        password: values.password,
      }).unwrap();

      // Step 3: Fetch current user (cookies are sent automatically)
      const user = await trigger("").unwrap();
      dispatch(setCredentials(user));

      navigate("/");
    } catch {
      messageApi.error("Registration failed. Please try again.");
    }
  }

  return (
    <>
      {contextHolder}
      <div className="auth-page">
        <div className="auth-form">
          {/* Brand Logo Placeholder */}
          <div style={{ textAlign: "center" }}>
            <Typography.Title level={3}>
              e
              <span style={{ color: volcano.primary, fontWeight: "bold" }}>
                Bonik
              </span>
            </Typography.Title>
          </div>

          <Typography.Title
            level={3}
            style={{ textAlign: "center", marginBottom: 24 }}
          >
            Create Account
          </Typography.Title>

          <Form
            name="register"
            layout="vertical"
            size="large"
            onFinish={onFinish}
          >
            {/* Grouped First + Last Name */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="John" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Doe" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="john@domain.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              label="Business account"
              layout="horizontal"
              name={"isSeller"}
            >
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Register
              </Button>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: blue.primary }}>
                  Login
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
