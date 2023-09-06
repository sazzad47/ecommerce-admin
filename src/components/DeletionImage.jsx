import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import React from "react";
import { Oval } from "react-loader-spinner";

const DeletionImage = ({ image, Delete, loading, portrait }) => {
  return (
    <Col xs={24} sm={12} md={8} lg={portrait ? 3 : 6}>
      <div
        style={{ position: "relative" }}
        className={`${portrait && "d-flex f-wrap j-center"}`}
      >
        <img
          src={image.url || image.image_url}
          alt={`Image ${image.id}`}
          style={{ width: `${portrait ? "auto" : "100%"}`, height: "120px" }}
        />
        <Button
          type="danger"
          shape="circle"
          icon={
            loading ? (
              <Oval color="white" width={10} height={10} />
            ) : (
              <DeleteOutlined />
            )
          }
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            backgroundColor: "red",
          }}
          onClick={() => Delete()}
        />
      </div>
    </Col>
  );
};

export default DeletionImage;
