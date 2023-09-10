import React, { useEffect, createContext, useState, useRef } from "react";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import { CategoryHooks } from "../../../Features";
import ProductProps from "./ProductProps";
import ProductDescription from "./ProductDescription";
import { ProductHooks } from "../../../Features";
import { Oval } from "react-loader-spinner";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { FiUpload } from "react-icons/fi";
export const ProductFormContext = createContext();

const ProductForm = () => {
  const uploadInput = useRef(null);
  const { useCategory } = CategoryHooks;
  const { useAddProduct } = ProductHooks;
  const { CategoryData, CategoryLoading, GetCategory } = useCategory();
  const { preAdding, ProductAddLoading, ProductAddSuccess } = useAddProduct();

  const [addtional, setAdditional] = useState({
    description: "",
    properties: [],
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const productImages = Array.from(watch("product_images") || []);
  const category = watch("category_id");

  const handleUplaod = () => {
    uploadInput.current?.click();
  };

  const onSubmit = (data) => {
    preAdding({ ...data, ...addtional });
    console.log("additional", addtional);
  };

  useEffect(() => {
    GetCategory();
    setAdditional({ description: "", properties: [] });
  }, []);

  useEffect(() => {
    if (ProductAddSuccess) {
      reset();
    }

    // Assign the ref value once the component is mounted
    uploadInput.current = document.getElementById("uploadInput");
  }, [ProductAddLoading, ProductAddSuccess]);

  return (
    <ProductFormContext.Provider
      value={{
        category,
        addtional,
        setAdditional,
      }}
    >
      <form className="d-flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex-column g-15 w-100">
          <div className="d-flex a-center g-15">
            <Form.Item
              label="Name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name && errors.name.message}
            >
              <TextField
                variant="standard"
                {...register("name", { required: "Name is required" })}
              />
            </Form.Item>
            <Form.Item
              label="Category"
              validateStatus={errors.category_id ? "error" : ""}
              help={errors.category_id && errors.category_id.message}
            >
              {!CategoryLoading && (
                <Select
                  variant="standard"
                  style={{ width: "200px" }}
                  {...register("category_id", {
                    required: "Category is required",
                  })}
                >
                  <MenuItem value="">Select category</MenuItem>
                  {CategoryData?.data.map((ct) => {
                    return (
                      <MenuItem value={ct.id} key={ct.id}>
                        {ct.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Short Description"
              validateStatus={errors.short_description ? "error" : ""}
              help={
                errors.short_description && errors.short_description.message
              }
            >
              <TextField
                variant="standard"
                {...register("short_description", {
                  required: "Short Description is required",
                })}
              />
            </Form.Item>
          </div>
          <div className="d-flex a-center g-15">
            <Form.Item
              label="Price"
              validateStatus={errors.price ? "error" : ""}
              help={errors.price && errors.price.message}
            >
              <TextField
                variant="standard"
                type="number"
                {...register("price", { required: "Price is required" })}
              />
            </Form.Item>
            <Form.Item
              label="Stock"
              validateStatus={errors.stock ? "error" : ""}
              help={errors.stock && errors.stock.message}
            >
              <TextField
                variant="standard"
                type="number"
                {...register("stock", { required: "Stock is required" })}
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              validateStatus={errors.discount ? "error" : ""}
              help={errors.discount && errors.discount.message}
            >
              <TextField
                variant="standard"
                type="number"
                {...register("discount", { required: "Discount is required" })}
              />
            </Form.Item>
          </div>

          <div className="d-flex g-15">
            <Form.Item
              label="Max Order"
              validateStatus={errors.max_order ? "error" : ""}
              help={errors.max_order && errors.max_order.message}
            >
              <TextField
                variant="standard"
                type="number"
                {...register("max_order", {
                  required: "Max Order is required",
                })}
              />
            </Form.Item>
            <Form.Item
              label="Min Order"
              validateStatus={errors.min_order ? "error" : ""}
              help={errors.min_order && errors.min_order.message}
            >
              <TextField
                variant="standard"
                type="number"
                {...register("min_order", {
                  required: "Min Order is required",
                })}
              />
            </Form.Item>
            <Form.Item
              label="Product Images"
              validateStatus={errors.product_images ? "error" : ""}
              help={errors.product_images && errors.product_images.message}
            >
              <input
                hidden
                id="uploadInput"
                type="file"
                multiple
                accept="image/*"
                {...register("product_images", {
                  required: "Product Images are required",
                })}
              />
              <Button
                startIcon={<FiUpload />}
                variant="outlined"
                onClick={() => handleUplaod()}
              >
                Choose Images
              </Button>
              {productImages.length > 0 &&
                productImages.map((file, index) => (
                  <div key={index} style={{margin: "5px 0", display: "flex", alignItems: "center", gap: "4px"}} >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected Image ${index}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <span>{file.name}</span>
                  </div>
                ))}
            </Form.Item>
          </div>
        </div>

        <ProductDescription />
        <ProductProps />

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={ProductAddLoading}>
            {ProductAddLoading ? (
              <Oval color="white" width={20} height={20} />
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Item>
      </form>
    </ProductFormContext.Provider>
  );
};

export default ProductForm;
