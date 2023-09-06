import React, { useContext, useEffect } from "react";
import { ProductFormContext } from "./ProductForm";
import { CategoryHooks } from "../../../Features";
import { Typography } from "antd";
import { Oval } from "react-loader-spinner";
import ProductPropsValues from "./ProductPropsValues";
const { Paragraph } = Typography;

const ProductProps = () => {
  const { useCategory } = CategoryHooks;
  const { CatPropsData, CatPropsLoading, CatPropsSuccess, setId } =
    useCategory();

  const { category } = useContext(ProductFormContext);

  useEffect(() => {
    if (!!category) {
      setId(parseInt(category));
    }
  }, [category]);

  return (
    <div className="mb-3">
      {CatPropsLoading ? (
        <Oval color="black" width={30} height={30} />
      ) : (
        <>
          {CatPropsSuccess && (
            <div>
              {CatPropsData?.data.map((object) => (
                <div key={object?.property?.id} className="d-flex g-10 mb-3">
                  <Paragraph>{object?.property?.name}</Paragraph>
                  <ProductPropsValues
                    values={object?.property?.values}
                    prop_id={object?.property?.id}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductProps;
