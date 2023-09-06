import React, { useEffect, createContext, useState } from "react";
import { Form, Button } from "antd";
import { useForm } from "react-hook-form";
import { CategoryHooks } from "../../../Features";
import ProductProps from "./ProductProps";
import ProductDescription from "./ProductDescription";
import { ProductHooks ,  } from "../../../Features";
import { Oval } from "react-loader-spinner";
export const ProductFormContext = createContext();

const ProductForm = () => {
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

  const category = watch("category_id");

  const onSubmit = (data) => {
    preAdding({ ...data, ...addtional });
  };

  useEffect(() => {
    GetCategory();
    setAdditional({ description: "", properties: [] });
  }, []);

  useEffect(() => {
    if (ProductAddSuccess) {
      reset();
    }
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
              <input {...register("name", { required: "Name is required" })} />
            </Form.Item>
            <Form.Item
              label="Category"
              validateStatus={errors.category_id ? "error" : ""}
              help={errors.category_id && errors.category_id.message}
            >
              {!CategoryLoading && (
                <select
                  style={{ width: "200px" }}
                  {...register("category_id", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select category</option>
                  {CategoryData?.data.map((ct) => {
                    return (
                      <option value={ct.id} key={ct.id}>
                        {ct.title}
                      </option>
                    );
                  })}
                </select>
              )}
            </Form.Item>
            <Form.Item
              label="Short Description"
              validateStatus={errors.short_description ? "error" : ""}
              help={
                errors.short_description && errors.short_description.message
              }
            >
              <input
                {...register("short_description", {
                  required: "Short Description is required",
                })}
              />
            </Form.Item>
          </div>

          <div className="d-flex g-15">
            <Form.Item
              label="Price"
              validateStatus={errors.price ? "error" : ""}
              help={errors.price && errors.price.message}
            >
              <input
                type="number"
                step="0.1"
                {...register("price", { required: "Price is required" })}
              />
            </Form.Item>
            <Form.Item
              label="Stock"
              validateStatus={errors.stock ? "error" : ""}
              help={errors.stock && errors.stock.message}
            >
              <input
                type="number"
                {...register("stock", { required: "Stock is required" })}
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              validateStatus={errors.discount ? "error" : ""}
              help={errors.discount && errors.discount.message}
            >
              <input
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
              <input
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
              <input
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
                type="file"
                multiple
                accept="image/*"
                {...register("product_images", {
                  required: "Product Images are required",
                })}
              />
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
