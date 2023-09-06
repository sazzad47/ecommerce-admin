import React from "react";
import { Table } from "antd";
import moment from "moment";
const TodayOrders = () => {
  // Sample data for demonstration




  const orders = [
    { id: 1, customer: "John Doe", amount: 100 },
    { id: 2, customer: "Jane Smith", amount: 200 },
    { id: 3, customer: "Bob Johnson", amount: 150 },
  ];



  

  // Calculate today's date
  const today = moment().format("YYYY-MM-DD");

  // Configure the table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <h2>Today's Orders ({today})</h2>
      <Table dataSource={orders} columns={columns} pagination={false} />
    </div>
  );
};

export default TodayOrders;
