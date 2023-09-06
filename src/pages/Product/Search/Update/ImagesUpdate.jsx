import React, { useEffect, useState } from "react";
import { ProductHooks } from "../../../../Features";
import { Oval } from "react-loader-spinner";
import { DeletionImage } from "../../../../components";
import { Button } from "antd";

const ImagesUpdate = ({ id }) => {
  const { useGetImPr, useDeleteImage, useUpdateProduct } = ProductHooks;
  const { Images, ImagesData, ImagesLoading, ImagesSuccess } = useGetImPr(id);
  const { AddImage, AddImageLoading } = useUpdateProduct(id);
  const [files, setFiles] = useState([]);

  const handleAddImages = async () => {
    const formdata = new FormData();
    for (let index = 0; index < files.length; index++) {
      formdata.append("images", files[index]);
    }
    formdata.append("id", id);

    AddImage(formdata).then((p) => {
      Images();
    });
  };

  useEffect(() => {
    Images();
  }, []);

  // OneImageComponent
  const Image = ({ image }) => {
    const { Delete, DeleteLoading } = useDeleteImage(image.id, Images);

    return (
      <DeletionImage
        image={image}
        loading={DeleteLoading}
        Delete={Delete}
        portrait
      />
    );
  };

  return (
    <div>
      <h4>Images</h4>
      <div className="d-flex-column mb-4 g-15">
        <label htmlFor="images">Add image</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={(e) => setFiles([...e.target.files])}
        />
        <Button
          type="primary"
          className="w-content"
          loading={AddImageLoading}
          disabled={AddImageLoading}
          onClick={() => handleAddImages()}
        >
          Upload
        </Button>
      </div>
      {ImagesLoading && <Oval color="white" height={20} width={20} />}
      {!ImagesLoading && ImagesSuccess && (
        <div className="d-flex f-wrap g-10 a-center">
          {ImagesData?.data.map((image) => {
            return <Image image={image} key={image.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ImagesUpdate;
