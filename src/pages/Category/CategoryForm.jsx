import React, { useEffect, useState } from "react";
import { Form, Button, Checkbox } from "antd";
import { useForm } from "react-hook-form";
import { PropHooks } from "../../Features";
import { toast } from "react-hot-toast";
import { CategoryHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
const CategoryForm = () => {
  const [props, setProps] = useState([]);
  const { useAddCategory } = CategoryHooks;
  const { preAdding, CategoryAddLoading, CategoryAddSuccess } =
    useAddCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { useProps } = PropHooks;
  const { GetProps, PropsData, PropsLoading } = useProps();

  useEffect(() => {
    GetProps();
  }, []);

  useEffect(() => {
    if (CategoryAddSuccess) {
      reset();
    }
  }, [CategoryAddLoading, CategoryAddSuccess]);

  const onSubmit = (data) => {
    if (!props.length) {
      toast.error("You should select props");
      return;
    }
    preAdding(data, props);
  };

  const handleChange = (e, prop) => {
    if (e.target.checked) {
      setProps([...props, prop.id]);
    } else {
      if (props.indexOf(prop.id) != -1) {
        const arr = props.filter((id) => id != prop.id);
        setProps([...arr]);
      }
    }
  };

  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Title"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title && errors.title.message}
        >
          <input {...register("title", { required: "Title is required" })} />
        </Form.Item>
        <Form.Item
          label="Properties"
          validateStatus={errors.properties ? "error" : ""}
          help={errors.properties && errors.properties.message}
        >
          {!PropsLoading && (
            <>
              {PropsData?.data.map((prop) => {
                return (
                  <Checkbox
                    key={prop.id}
                    onChange={(e) => handleChange(e, prop)}
                  >
                    {prop.name}
                  </Checkbox>
                );
              })}
            </>
          )}
        </Form.Item>
        <Form.Item
          label="Icon"
          validateStatus={errors.icon ? "error" : ""}
          help={errors.icon && errors.icon.message}
        >
          <input
            type="file"
            accept="image/*"
            {...register("icon", { required: "Icon is required" })}
          />
        </Form.Item>
        <Form.Item
          label="Banner"
          validateStatus={errors.banner ? "error" : ""}
          help={errors.banner && errors.banner.message}
        >
          <input
            type="file"
            accept="image/*"
            {...register("banner", { required: "Banner is required" })}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={CategoryAddLoading}
          >
            {CategoryAddLoading ? (
              <Oval color="white" width={20} height={20} />
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
