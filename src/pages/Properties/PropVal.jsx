import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { PropHooks } from "../../Features";

const PropVal = ({ value }) => {
  const { usePropsValuesOperations } = PropHooks;
  const { Update, UpdateLoading, Delete, DeleteLoading, DeleteSuccess } =
    usePropsValuesOperations(value.id);
  const [data, setData] = useState({ ...value });
  const [showComponent, setShowComponent] = useState(true); // performing unmounting technique as a reaction of deletion

  useEffect(() => {
    if (DeleteSuccess) {
      setShowComponent(false);
    }
  }, [DeleteLoading, DeleteSuccess]);

  return (
    <>
      {showComponent && (
        <li className="mb-2 d-flex-no-change f-wrap">
          <input
            className="w-30"
            value={data.value}
            onChange={(e) => setData({ ...data, value: e.target.value })}
          />
          <Button
            type="link"
            loading={UpdateLoading}
            disabled={UpdateLoading}
            onClick={() => {
              Update({
                id: value.id,
                value: data.value,
              });
            }}
          >
            Update
          </Button>
          <Button
            type="link"
            danger
            loading={DeleteLoading}
            disabled={DeleteLoading}
            onClick={() => Delete()}
          >
            Delete
          </Button>
        </li>
      )}
    </>
  );
};

export default PropVal;
