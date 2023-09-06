import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProductFormContext } from "./ProductForm";
import { formats, modules } from "../../../constants";
const ProductDescription = () => {
  const { setAdditional, addtional } = useContext(ProductFormContext);

  const handleChange = (value) => {
    setAdditional({ ...addtional, description: value });
  };

  return (
    <div className="mb-5">
      <h4>Description</h4>
      <ReactQuill
        value={addtional.description}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductDescription;
