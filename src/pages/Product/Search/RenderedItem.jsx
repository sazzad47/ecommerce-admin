import React, { useContext } from "react";
import "./RenderItem.scss";
import { productSearchContext } from "./Search";
const RenderedItem = ({ item }) => {

  const { select } = useContext(productSearchContext);

  return (
    <>
      <div className="item" role="button" onClick={() => select(item.id)}>
        <p>{item.name}</p>
      </div>
    </>
  );
};

export default RenderedItem;
