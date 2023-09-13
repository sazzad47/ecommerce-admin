import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import { CustomersHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
const CustomerSearch = () => {
  const [searchText, setSearchText] = useState("");
  const { useCustomers } = CustomersHooks;
  const { GetOne, OneData, OneLoading, OneSuccess } = useCustomers(searchText);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Joined Time",
      dataIndex: "joined_time",
      key: "joined_time",
      render: (text, _) => {
        return new Date(text).toDateString();
      },
    },
    {
      title: "Number of Orders",
      dataIndex: "number_of_orders",
      key: "number_of_orders",
    }
  ];

  const handleSubmit = () => {
    GetOne();
  };

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className="d-flex g-15">
        <Input
          placeholder="Search by customer id or name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleInputKeyUp}
          style={{ marginBottom: 16 }}
          type="text"
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

export default CustomerSearch;
