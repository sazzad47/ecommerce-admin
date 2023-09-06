import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import { OrdersHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
const OrderSearch = ({ handleViewOrder }) => {
  const [searchText, setSearchText] = useState("");
  const { useOrders } = OrdersHooks;
  const { GetOne, OneData, OneLoading, OneSuccess } = useOrders(
    parseInt(searchText)
  );
  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    { title: "Total Amount", dataIndex: "total", key: "total" },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (text, _) => {
        return new Date(text).toDateString();
      },
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewOrder(record)}>
          View
        </Button>
      ),
    },
  ];

  const handleSubmit = () => {
    GetOne();
  };

  return (
    <div>
      <div className="d-flex g-15">
        <Input
          placeholder="Search by Order Number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
          type="number"
        />
        <Button
          loading={OneLoading}
          disabled={OneLoading}
          onClick={() => handleSubmit()}
        >
          Search
        </Button>
      </div>
      {OneLoading && <Oval width={50} height={50} color="black" />}
      {!OneLoading && OneSuccess && (
        <Table columns={columns} dataSource={OneData?.data} />
      )}
    </div>
  );
};

export default OrderSearch;
