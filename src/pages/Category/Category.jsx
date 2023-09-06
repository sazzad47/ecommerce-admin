import React, { useState } from "react";
import { AppLayout } from "../../components";
import { Tabs } from "antd";

import CategoryForm from "./CategoryForm";
import Categories from "./Categories";
const { TabPane } = Tabs;
const Category = () => {
  const [activeTab, setActiveTab] = useState("form");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  return (
    <AppLayout active={"5"}>
      <div>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Add New" key="form">
            <CategoryForm />
          </TabPane>
          <TabPane tab="All Categories" key="table">
            <Categories />
          </TabPane>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Category;
