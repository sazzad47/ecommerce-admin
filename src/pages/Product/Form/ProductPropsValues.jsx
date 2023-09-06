import React, { useContext, useEffect } from "react";
import { ProductFormContext } from "./ProductForm";
const ProductPropsValues = ({ values, prop_id }) => {
  const { setAdditional, addtional } = useContext(ProductFormContext);

  const handleValueChangeInContext = (val) => {
    const { properties } = addtional;
    const existed = properties.filter((prop) => prop.property_id == prop_id);
    if (!existed.length) {
      const props = [
        ...addtional.properties,
        {
          property_value_id: parseInt(val),
          property_id: prop_id,
        },
      ];
      setAdditional({
        ...addtional,
        properties: props,
      });
    } else {
      const newProps = properties.map((prop) => {
        if (prop.property_id == prop_id) {
          prop.property_value_id = parseInt(val);
        }
        return prop;
      });
      setAdditional({
        ...addtional,
        properties: [...newProps],
      });
    }
  };


  return (
    <select
      style={{ width: "200px" }}
      defaultValue={0}
      onChange={(e) => handleValueChangeInContext(e.target.value)}
    >
      <option value={0}>Select value</option>
      {values.map((value) => (
        <option key={value.id} value={value.id}>
          {value.value}
        </option>
      ))}
    </select>
  );
};

export default ProductPropsValues;
