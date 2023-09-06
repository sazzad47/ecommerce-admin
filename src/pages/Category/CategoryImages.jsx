import { Button } from "antd";
import React, { useState } from "react";
import { CategoryHooks } from "../../Features";
import { toast } from "react-hot-toast";

const CategoryImages = ({ id }) => {
  const { useCategoryImages } = CategoryHooks;
  const { UpdateLoading, preUpdate } = useCategoryImages();
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleBannerChange = (event) => {
    setBannerFile(event.target.files[0]);
  };

  const handleUpload = (attribute, file) => {
    if (!file) {
      toast.error("No photo selected");
      return;
    }
    preUpdate(id, attribute, file);
  };

  return (
    <div className="d-flex-column g-10 mt-4">
      <div className="d-flex-no-change f-wrap a-center g-5 j-around">
        <label htmlFor="image">Category Image:</label>
        <input
          type="file"
          id="image"
          className="w-30"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button
          type="primary"
          loading={UpdateLoading}
          disabled={UpdateLoading}
          onClick={() => handleUpload("image_url", imageFile)}
        >
          Update
        </Button>
      </div>
      <div className="d-flex-no-change f-wrap a-center g-5 j-around">
        <label htmlFor="banner">Category Banner:</label>
        <input
          type="file"
          id="banner"
          className="w-30"
          accept="image/*"
          onChange={handleBannerChange}
        />
        <Button
          type="primary"
          loading={UpdateLoading}
          disabled={UpdateLoading}
          onClick={() => handleUpload("banner_url", bannerFile)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default CategoryImages;
