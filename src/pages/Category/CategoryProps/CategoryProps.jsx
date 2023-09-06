import React, { useEffect } from "react";
import { CategoryHooks, PropHooks } from "../../../Features";
import { Oval } from "react-loader-spinner";
import OneProp from "./OneProp";
const CategoryProps = ({ id }) => {
  const { useCategoryProperties } = CategoryHooks;
  const { useProps } = PropHooks;
  const { Get, GetLoading, GetData, GetSuccess } = useCategoryProperties(id);
  const { GetProps, PropsData, PropsLoading, PropsSuccess } = useProps();

  useEffect(() => {
    Get();
    GetProps();
  }, [id]);

  return (
    <div>
      {(GetLoading || PropsLoading) && (
        <Oval color="black" width={20} height={20} />
      )}
      {!GetLoading && GetSuccess && !PropsLoading && PropsSuccess && (
        <>
          <div className="d-flex-no-change f-wrap g-10 a-center mt-3">
            {PropsData?.data.map((property) => {
              return (
                <OneProp
                  key={property.id}
                  prop={property}
                  categoryProps={GetData?.data}
                  id={id}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProps;
