import React from "react";
import { Row } from "antd";
import Image from "./Image";
const ImageGridWithDelete = ({ images }) => {
  return (
    <Row gutter={[16, 16]}>
      {images?.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </Row>
  );
};

export default ImageGridWithDelete;
