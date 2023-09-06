import React from "react";
import { CategoryHooks } from "../../../Features";
import { Oval } from "react-loader-spinner";

const OneProp = ({ prop, categoryProps, id }) => {
  const { useCategoryProperties } = CategoryHooks;
  const { preAdding, AddLoading, AddSuccess } = useCategoryProperties();

  const hasThisProp = categoryProps?.filter(
    (object) => object.property.id == prop.id
  );
  const handleCheckboxChange = async (e) => {
    await preAdding(id, prop.id, e.target.checked);
  };

  return (
    <div>
      <label>
        {AddLoading && <Oval color="black" height={10} width={10} />}
        {!AddLoading && (
          <input
            type="checkbox"
            checked={hasThisProp.length || AddSuccess}
            disabled={hasThisProp.length || AddSuccess}
            onChange={handleCheckboxChange}
          />
        )}

        {prop.name}
      </label>
    </div>
  );
};

export default OneProp;
