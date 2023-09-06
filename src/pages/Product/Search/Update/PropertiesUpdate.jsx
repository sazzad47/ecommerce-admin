import React, { useEffect, useState } from "react";
import { ProductHooks } from "../../../../Features";
import { Oval } from "react-loader-spinner";
import OneProp from "./OneProp";
import { AddProp } from "./AddProp";

const PropertiesUpdate = ({ id }) => {
  const { useGetImPr } = ProductHooks;
  const { Props, PropsData, PropsLoading, PropsSuccess } = useGetImPr(id);
  const [data, setData] = useState([]);

  useEffect(() => {
    Props();
  }, []);

  useEffect(() => {
    if (PropsSuccess) {
      // Getting the props that is in the category but not in the product
      setData(
        PropsData?.data.category_props.filter(
          (prop) =>
            !!PropsData?.data.properties.every((item2) => {
              return prop.property.id !== item2.id;
            })
        )
      );
    }
  }, [PropsLoading, PropsSuccess]);

  return (
    <div className="mt-2">
      <h4>Properties</h4>

      {PropsLoading && <Oval color="black" width={20} height={20} />}
      {!PropsLoading && PropsSuccess && (
        <>
          {PropsData?.data.properties.map((prop) => {
            return <OneProp key={prop.id} prop={prop} id={id} />;
          })}

          {data.map((row) => {
            return <AddProp prop={row} key={row.property.id} id={id} />;
          })}
        </>
      )}
    </div>
  );
};

export default PropertiesUpdate;
