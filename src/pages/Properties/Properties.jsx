import React, { useState } from "react";
import { AppLayout } from "../../components";
import { Tabs } from "antd";
import PropForm from "./PropForm";
import Props from "./Props";
const { TabPane } = Tabs;

const Properties = () => {
  const [activeTab, setActiveTab] = useState("form");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <AppLayout active={"4"}>
      <div>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Add New" key="form">
            <PropForm />
          </TabPane>
          <TabPane tab="All Properties" key="table">
            <Props />
          </TabPane>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Properties;
