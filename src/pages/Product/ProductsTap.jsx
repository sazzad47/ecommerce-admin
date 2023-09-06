import React, { useEffect } from "react";
import { Table } from "antd";
import { ProductHooks } from "../../Features";
import { Oval } from "react-loader-spinner";


const ProductsTab = () => {
  const { useProduct } = ProductHooks;
  const {
    GetProducts,
    ProductsData,
    ProductsLoading,
    ProductsSuccess,
  } = useProduct();

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    { title: "View", dataIndex: "views", key: "view" },
  ];



  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div>
      {ProductsLoading && <Oval color="black" width={100} height={100} />}
      {!ProductsLoading && ProductsSuccess && (
        <Table
          columns={columns}
          dataSource={ProductsData?.data}
          scroll={{ x: true }} // Enable horizontal scrolling
        />
      )}
    </div>
  );
};

export default ProductsTab;
