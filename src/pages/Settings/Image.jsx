import React from "react";
import { DashHooks } from "../../Features";
import { DeletionImage } from "../../components";
const Image = ({ image }) => {
  const { useSlidersImagesOperation } = DashHooks;
  const { DeleteLoading, Delete } = useSlidersImagesOperation(image.id);

  return (
    <DeletionImage Delete={Delete} image={image} loading={DeleteLoading} />
  );
};

export default Image;
