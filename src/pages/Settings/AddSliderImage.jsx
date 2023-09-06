import React, { useEffect } from "react";
import { Form } from "antd";
import { DashHooks } from "../../Features";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import ImageGridWithDelete from "./ImageGridWithDelete";
const AddSliderImages = () => {
  const { useSlidersImages } = DashHooks;
  const { GetSliders, SlidersAddLoading, preAdding, SlidersData } =
    useSlidersImages();

  useEffect(() => {
    GetSliders();
  }, []);
  const { handleSubmit, register } = useForm();

  const OnhandleSubmit = (data) => {
    preAdding(data);
  };

  return (
    <div>
      <h2>Add Slider Images</h2>
      <form
        className="d-flex g-15 a-center"
        onSubmit={handleSubmit(OnhandleSubmit)}
      >
        <Form.Item label="Upload Slider Images">
          <input multiple type="file" accept="image/*" {...register("files")} />
        </Form.Item>
        <button
          disabled={SlidersAddLoading}
          className="btn btn-primary"
          type="submit"
        >
          {SlidersAddLoading ? (
            <Oval color="white" height={20} width={20} />
          ) : (
            "Click to Upload"
          )}
        </button>
      </form>
      <ImageGridWithDelete images={SlidersData?.data} />
    </div>
  );
};

export default AddSliderImages;
