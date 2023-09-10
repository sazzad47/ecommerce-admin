import React, { useEffect } from "react";
import { Form, Button } from "antd";
import { AdminHooks } from "../../Features";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { Avatar, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import {BsPersonFillLock} from "react-icons/bs";

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
    <Grid
      container
      component="main"
      sx={{ maxWidth: "500px", margin: "0 auto", padding: "3rem 1rem" }}
    >
      <Grid item xs={12} component={Paper} elevation={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <BsPersonFillLock/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Form
            name="loginForm"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <TextField label="Email" variant="standard" fullWidth />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <TextField
                label="Password"
                variant="standard"
                type="password"
                fullWidth
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
