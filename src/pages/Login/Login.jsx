import React, { useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { AdminHooks } from "../../Features";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
const { Title } = Typography;

const Login = () => {
  const { useLogin } = AdminHooks;
  const { error, isError, isLoading, mutate } = useLogin();
  const navigate = useNavigate();
  const onFinish = (values) => {
    mutate(values);
  };

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      navigate("/");
    }
    if (isError) {
      toast.error(error?.response.data.msg);
    }
  }, [isError, isLoading]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="loginForm"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        style={{ width: "300px" }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
