import React, { useEffect } from "react";
import { Form } from "antd";
import { DashHooks } from "../../Features";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import ImageGridWithDelete from "./ImageGridWithDelete";
import { Button } from "@mui/material";
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
      <form className="d-flex g-15" onSubmit={handleSubmit(OnhandleSubmit)}>
        <input multiple type="file" accept="image/*" {...register("files")} />
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
        <Button></Button>
      </form>
      <div style={{marginTop: "1rem"}}>
      <ImageGridWithDelete images={SlidersData?.data} />
      </div>
    </div>
  );
};

export default AddSliderImages;
