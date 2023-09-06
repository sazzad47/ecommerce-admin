import React, { useContext, useEffect } from "react";
import { ProductHooks } from "../../../../Features";
import { productSearchContext } from "../Search";
import { Oval } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import ImagesUpdate from "./ImagesUpdate";
import PropertiesUpdate from "./PropertiesUpdate";
const UpdateForm = () => {
  const { selected } = useContext(productSearchContext);
  const { useProduct, useUpdateProduct } = ProductHooks;
  const { Get, GetLoading, GetSuccess, GetData, Delete, DeleteLoading } =
    useProduct(selected);
  const { Update, UpdateLoading } = useUpdateProduct();

  useEffect(() => {
    Get();
  }, [selected]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Update({
      pid: selected,
      ...data,
    });
  };

  useEffect(() => {
    if (GetSuccess) {
      // Setting default values in the form
      setValue("name", GetData?.data.product.name);
      setValue("price", GetData?.data.product.price);
      setValue("short_description", GetData?.data.product.short_description);
      setValue("max_order", GetData?.data.product.max_order);
      setValue("min_order", GetData?.data.product.min_order);
      setValue("stock", GetData?.data.product.stock);
      setValue("discount", GetData?.data.product.discount);
    }
  }, [GetData, GetLoading, GetLoading]);

  return (
    <div>
      {GetLoading && <Oval color="white" width={30} height={30} />}

      {!GetLoading && GetSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div className="d-flex g-10 a-center f-wrap">
            <div>
              <label>Name:</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                step="0.1"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div>
              <label>Short Description:</label>
              <input
                type="text"
                {...register("short_description", {
                  required: "Short Description is required",
                })}
              />
              {errors.short_description && (
                <p>{errors.short_description.message}</p>
              )}
            </div>
            {/* Max order */}
            <div>
              <label>Max order:</label>
              <input
                type="number"
                {...register("max_order", {
                  required: "Max order is required",
                })}
              />
              {errors.max_order && <p>{errors.max_order.message}</p>}
            </div>
            {/* Min order */}
            <div>
              <label>Min order:</label>
              <input
                type="number"
                {...register("min_order", {
                  required: "Min order is required",
                })}
              />
              {errors.min_order && <p>{errors.min_order.message}</p>}
            </div>

            {/* stock */}
            <div>
              <label>Stock:</label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                })}
              />
              {errors.stock && <p>{errors.stock.message}</p>}
            </div>

            {/* discount */}
            <div>
              <label>discount:</label>
              <input
                type="number"
                {...register("discount", {
                  required: "Discount is required",
                })}
              />
              {errors.discount && <p>{errors.discount.message}</p>}
            </div>
          </div>

          <div className="mt-3 d-flex j-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={UpdateLoading}
              disabled={UpdateLoading}
            >
              Update
            </Button>

            <Button
              type="primary"
              className="ml-3"
              htmlType="button"
              loading={DeleteLoading}
              disabled={DeleteLoading}
              danger
              onClick={() => {
                Delete();
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      )}

      <div className="mt-5">
        <h2>Update properties and images</h2>
        <ImagesUpdate id={selected} />
        <PropertiesUpdate id={selected} />
      </div>
    </div>
  );
};

export default UpdateForm;
