import React, { useEffect } from "react";
import { Button, Modal, Table } from "antd";
import { OrdersHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
const OrderDetailsModal = ({ visible, order, onCancel }) => {
  if (!order) {
    return null;
  }

  const { useOrdersItems, useOrders } = OrdersHooks;
  const { GetItems, ItemsData, ItemsLoading } = useOrdersItems(order.id);
  const { Update, UpdateLoading } = useOrders(order.id);

  useEffect(() => {
    GetItems();
  }, [order.id]);

  const columns = [
    {
      title: "Image",
      dataIndex: ["product", "images", 0, "image_url"],
      key: "imageUrl",
      render: (imageUrl) => (
        <img src={imageUrl} alt="Product" style={{ width: 40 }} />
      ),
    },
    { title: "Name", dataIndex: ["product", "name"], key: "productName" },
    { title: "Total Price", dataIndex: "total_price", key: "total_price" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  ];
  const handleStateChange = async (newState) => {
    await Update({
      order_id: order.id,
      status: newState,
      items: ItemsData?.data,
    });
  };

  return (
    <Modal
      visible={visible}
      title={`Order Details - Order ID: ${order.id}`}
      onCancel={onCancel}
      footer={null}
    >
      {ItemsLoading && <Oval color="black" width={50} height={50} />}
      <h3>
        Adress : {order.address} {order.postal_code} {order.city}
      </h3>
      <Table
        columns={columns}
        dataSource={ItemsData?.data}
        pagination={false}
      />

      <div className="mt-3">
        <Button
          type="primary"
          loading={UpdateLoading}
          disabled={UpdateLoading}
          onClick={() => handleStateChange("DELIVERING")}
        >
          Mark as Delivering
        </Button>
        <Button
          style={{ margin: "0 10px" }}
          onClick={() => handleStateChange("CANCELED")}
          type="primary"
          danger
          loading={UpdateLoading}
          disabled={UpdateLoading}
        >
          Mark as Canceld
        </Button>
        <Button
          onClick={() => handleStateChange("DELIVERED")}
          loading={UpdateLoading}
          disabled={UpdateLoading}
        >
          Mark as Delivered
        </Button>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
