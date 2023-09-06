import { Button } from "antd";
import React from "react";
import { ProductHooks } from "../../../../Features";

const OneProp = ({ prop, id }) => {
  const { useDeleteProp } = ProductHooks;
  const { Delete, DeleteLoading } = useDeleteProp(id, prop.id);

  return (
    <div className="d-flex-no-change f-wrap g-15 a-center">
      <p>
        {prop.name} : {prop.value}
      </p>
      <Button
        type="primary"
        danger
        loading={DeleteLoading}
        disabled={DeleteLoading}
        onClick={() => Delete()}
      >
        Delete
      </Button>
    </div>
  );
};

export default OneProp;
