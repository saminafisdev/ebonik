import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message, Typography } from "antd";
import { Link, useNavigate } from "react-router";
import {
  useLazyGetCurrentUserQuery,
  useLoginMutation,
} from "@/app/services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trigger] = useLazyGetCurrentUserQuery();
  const [mutate] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();

  async function onFinish(values: { email: string; password: string }) {
    try {
      await mutate(values).unwrap();
      messageApi.open({
        type: "success",
        content: "Logged in successfully",
      });
      const user = await trigger("").unwrap();
      dispatch(setCredentials(user));
      navigate("/");
    } catch {
      messageApi.open({
        type: "error",
        content: "No account found with the given credentials",
      });
    }
  }

  return (
    <>
      {contextHolder}
      <div className="auth-page">
        <div className="auth-form">
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            Login
          </Typography.Title>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            size="large"
            onFinish={onFinish}
          >
            <Form.Item
              label="Enter Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="john@domain.com" />
            </Form.Item>
            <Form.Item
              label="Enter Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
