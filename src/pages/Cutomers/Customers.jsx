import React, { useEffect } from "react";
import { AppLayout } from "../../components";
import { Table } from "antd";
import { CustomersHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
import CustomerSearch from "./CustomerSearch";
const Customers = () => {
  const { useCustomers } = CustomersHooks;
  const { CustomersData, CustomersLoading, CustomersSuccess, GetCustomers } =
    useCustomers();

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
    },
  ];


  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "40"],
    total: CustomersData?.data.length,
  };

  useEffect(() => {
    GetCustomers();
  }, []);

  return (
    <AppLayout active={"2"}>
      <div>
        <h1>All store customers</h1>
        <CustomerSearch />
        {CustomersLoading && <Oval color="black" width={100} height={100} />}
        {!CustomersLoading && CustomersSuccess && (
          <Table
            columns={columns}
            dataSource={CustomersData?.data}
            pagination={paginationConfig}
            scroll={{ x: true }} // Enable horizontal scrolling
          />
        )}

       
      </div>
    </AppLayout>
  );
};

export default Customers;
