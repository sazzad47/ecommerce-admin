import React, { useEffect, useRef, useState } from "react";
import { Form, Checkbox } from "antd";
import { useForm } from "react-hook-form";
import { PropHooks } from "../../Features";
import { toast } from "react-hot-toast";
import { CategoryHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
import { FiUpload } from "react-icons/fi";
import { Button } from "@mui/material";

const CategoryForm = () => {
  const uploadInput = useRef(null);
  const [props, setProps] = useState([]);
  const { useAddCategory } = CategoryHooks;
  const { preAdding, CategoryAddLoading, CategoryAddSuccess } =
    useAddCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const { useProps } = PropHooks;
  const { GetProps, PropsData, PropsLoading } = useProps();

  // Watch for changes in the "icon" and "banner" fields
  const selectedIconFile = watch("icon");
  const selectedBannerFile = watch("banner");

  useEffect(() => {
    GetProps();

    // Assign the ref value once the component is mounted
    uploadInput.current = document.getElementById("uploadInput");
  }, []);

  useEffect(() => {
    if (CategoryAddSuccess) {
      reset();
    }
  }, [CategoryAddLoading, CategoryAddSuccess]);

  const handleUplaod = (type) => {
    if (type === "icon") {
      uploadInput.current = document.getElementById("iconUploadInput");
    } else if (type === "banner") {
      uploadInput.current = document.getElementById("bannerUploadInput");
    }
    uploadInput.current?.click();
  };

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
      if (props.indexOf(prop.id) !== -1) {
        const arr = props.filter((id) => id !== prop.id);
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
            hidden
            style={{display: "none"}}
            id="iconUploadInput"
            type="file"
            accept="image/*"
            {...register("icon", { required: "Icon is required" })}
          />
          <Button
            startIcon={<FiUpload />}
            variant="outlined"
            onClick={() => handleUplaod("icon")}
          >
            Choose Icon
          </Button>
          {selectedIconFile && selectedIconFile[0] && (
            <div style={{margin: "5px 0", display: "flex", alignItems: "center", gap: "4px"}} >
              <img
                src={URL.createObjectURL(selectedIconFile[0])}
                alt="Selected Icon"
                style={{ width: "50px", height: "50px" }}
              />
              <span>{selectedIconFile[0].name}</span>
            </div>
          )}
        </Form.Item>
        <Form.Item
          label="Banner"
          validateStatus={errors.banner ? "error" : ""}
          help={errors.banner && errors.banner.message}
        >
          <input
            hidden
            style={{display: "none"}}
            id="bannerUploadInput"
            type="file"
            accept="image/*"
            {...register("banner", { required: "Banner is required" })}
          />

          <Button
            startIcon={<FiUpload />}
            variant="outlined"
            onClick={() => handleUplaod("banner")}
          >
            Choose Banner
          </Button>
          {selectedBannerFile && selectedBannerFile[0] && (
            <div style={{margin: "5px 0", display: "flex", alignItems: "center", gap: "4px"}} >
              <img
                src={URL.createObjectURL(selectedBannerFile[0])}
                alt="Selected Banner"
                style={{ width: "50px", height: "50px" }}
              />
              <span>{selectedBannerFile[0].name}</span>
            </div>
          )}
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
