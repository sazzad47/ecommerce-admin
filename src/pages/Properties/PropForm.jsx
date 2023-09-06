import React, { useEffect } from "react";
import { Form, Button } from "antd";
import { useForm } from "react-hook-form";
import { PropHooks } from "../../Features";
import { Oval } from "react-loader-spinner";

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
      <div className="d-flex a-center g-15 w-100">
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name && errors.name.message}
        >
          <input {...register("name", { required: "Name is required" })} />
        </Form.Item>
        <Form.Item
          label="Type"
          validateStatus={errors.type ? "error" : ""}
          help={errors.type && errors.type.message}
        >
          <select
            style={{ width: "200px" }}
            {...register("type", { required: "Type is required" })}
          >
            <option value="TEXT">text</option>
          </select>
        </Form.Item>
        <Form.Item
          label="Values Seperate between every value with (,)"
          validateStatus={errors.values ? "error" : ""}
          help={errors.values && errors.values.message}
        >
          <input
            style={{ width: "400px" }}
            placeholder="Seperate between every value with (,)"
            {...register("values", {
              required: "Values are required",
              setValueAs: (val) => val.split(","),
            })}
          />
        </Form.Item>
      </div>

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
