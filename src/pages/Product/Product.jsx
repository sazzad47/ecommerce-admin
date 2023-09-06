import React, { useState } from "react";
import { AppLayout } from "../../components";
import { Tabs } from "antd";
import ProductForm from "./Form/ProductForm";
import ProductsTab from "./ProductsTap";
import Search from "./Search/Search";
const { TabPane } = Tabs;

const Product = () => {
  const [activeTab, setActiveTab] = useState("form");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <AppLayout active={"6"}>
      <div>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Add New" key="form">
            <ProductForm />
          </TabPane>
          <TabPane tab="All Products" key="table">
            <ProductsTab />
          </TabPane>
          <TabPane tab="Search" key="search">
            <Search />
          </TabPane>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Product;
