import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ProductHooks } from "../../../../Features";
import { toast } from "react-hot-toast";

export const AddProp = ({ prop, id }) => {
  const { useGetImPr, useUpdateProduct } = ProductHooks;
  const { Props } = useGetImPr(id);
  const { AddProp, AddPropLoading, AddPropSuccess } = useUpdateProduct();
  const [value, setValue] = useState("");
  const [show, setShow] = useState(true);

  const handleChange = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    }
  };

  const handleClick = () => {
    if (value) {
      AddProp({
        id,
        prop_id: prop.property.id,
        value_id: value,
      });
    } else {
      toast.error("Please select a value");
    }
  };

  useEffect(() => {
    if (AddPropSuccess) {
      Props();
      setShow(false);
    }
  }, [AddPropLoading, AddPropSuccess]);

  return (
    <>
      {show && (
        <div className="d-flex g-10 a-center g-15">
          <label>{prop.property.name}</label>
          <select defaultValue={value} value={value} onChange={handleChange}>
            <option value={""}> Select {prop.property.name} </option>
            {prop.property.values.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              );
            })}
          </select>
          <Button
            type="primary"
            loading={AddPropLoading}
            disabled={AddPropLoading}
            onClick={() => handleClick()}
          >
            Add
          </Button>
        </div>
      )}
    </>
  );
};
