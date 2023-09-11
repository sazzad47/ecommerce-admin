import React, { useEffect } from "react";
import { Form, Button } from "antd";
import { useForm } from "react-hook-form";
import { PropHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
import { Grid } from "@mui/material";

const PropForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { useAddProp } = PropHooks;
  const { PropAdd, PropAddLoading, PropAddSuccess } = useAddProp();

  const onSubmit = (data) => {
    PropAdd(data);
  };

  useEffect(() => {
    if (PropAddSuccess) {
      reset();
    }
  }, [PropAddLoading, PropAddSuccess]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item sx={12} md={6} style={{width: "100%"}}>
          <Form.Item
            label="Name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name && errors.name.message}
          >
            <input
              style={{ width: "100%" }}
              {...register("name", { required: "Name is required" })}
            />
          </Form.Item>
        </Grid>
        <Grid style={{width: "100%"}} item sx={12} md={6}>
          <Form.Item
            label="Type"
            validateStatus={errors.type ? "error" : ""}
            help={errors.type && errors.type.message}
          >
            <select
              style={{ width: "100%" }}
              {...register("type", { required: "Type is required" })}
            >
              <option value="TEXT">text</option>
            </select>
          </Form.Item>
        </Grid>
        <Grid item sx={12} md={6} style={{width: "100%"}}>
          <Form.Item
            label="Values Seperate between every value with (,)"
            validateStatus={errors.values ? "error" : ""}
            help={errors.values && errors.values.message}
          >
            <input
              style={{ width: "100%" }}
              placeholder="Seperate between every value with (,)"
              {...register("values", {
                required: "Values are required",
                setValueAs: (val) => val.split(","),
              })}
            />
          </Form.Item>
        </Grid>
      </Grid>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={PropAddLoading}>
          {PropAddLoading ? (
            <Oval color="white" width={20} height={20} />
          ) : (
            "Submit"
          )}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PropForm;
