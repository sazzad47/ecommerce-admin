import React, { useEffect, useState } from "react";
import { AppLayout } from "../../components";
import { Typography, Table, Button } from "antd";
import OrderDetailsModal from "./OrderDetailsModal";
import { OrdersHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
import OrderSearch from "./OrderSearch";
const { Title } = Typography;
const Orders = () => {
  const { useOrders } = OrdersHooks;
  const { GetOrders, OrdersData, OrdersLoading, OrdersSuccess } = useOrders();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const paginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "40"],
    total: OrdersData?.data.length,
  };

  useEffect(() => {
    GetOrders();
  }, []);

  return (
    <AppLayout active={"3"}>
      <div>
        <Title level={2}>Orders</Title>
        <OrderSearch handleViewOrder={handleViewOrder} />
        {OrdersLoading && <Oval color="black" width={100} height={100} />}
        {!OrdersLoading && OrdersSuccess && (
          <Table
            columns={columns}
            dataSource={OrdersData?.data}
            pagination={paginationConfig}
            scroll={{ x: true }} // Enable horizontal scrolling
          />
        )}

        <OrderDetailsModal
          visible={modalVisible}
          order={selectedOrder}
          onCancel={() => setModalVisible(false)}
        />
      </div>
    </AppLayout>
  );
};

export default Orders;
