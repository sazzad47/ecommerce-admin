import React, { useEffect, useState } from "react";
import { PropHooks } from "../../Features";
import { Table, Button, Modal } from "antd";
import { Oval } from "react-loader-spinner";
import PropVal from "./PropVal";

const Props = () => {
  const { useProps, usePropsOperations, useAddValue } = PropHooks;
  const { GetProps, PropsLoading, PropsSuccess, PropsData } = useProps();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [newValues, setNewValues] = useState("");
  const { Update, UpdateLoading, Delete, DeleteLoading } = usePropsOperations(
    selectedProperty?.id,
    setModalVisible
  );

  const handleRefreshAfterAdding = () => {
    setNewValues("");
    setModalVisible(false);
  };

  const { preAdding, valueAddLoading } = useAddValue(handleRefreshAfterAdding);

  const handleSeeValues = (property) => {
    setSelectedProperty(property);
    setModalVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleSeeValues(record)}>
          See Values
        </Button>
      ),
    },
  ];

  useEffect(() => {
    GetProps();
  }, []);

  const modalContent = (
    <div>
      <div className="d-flex-no-change g-5 f-wrap a-center">
        Values for:
        <input
          value={selectedProperty?.name}
          className="w-30"
          onChange={(e) => {
            setSelectedProperty({ ...selectedProperty, name: e.target.value });
          }}
        />
        <Button
          loading={UpdateLoading}
          disabled={UpdateLoading}
          type="link"
          onClick={() => {
            Update({
              id: selectedProperty?.id,
              name: selectedProperty?.name,
            });
          }}
        >
          Update
        </Button>
        <Button
          loading={DeleteLoading}
          disabled={DeleteLoading}
          type="link"
          danger
          onClick={() => {
            Delete();
          }}
        >
          Delete
        </Button>
      </div>
      <ul>
        {selectedProperty?.values.map((value) => (
          <PropVal key={value.id} value={value} />
        ))}
      </ul>

      <div className="d-flex-no-change g-5 f-wrap a-center w-100">
        <input
          value={newValues}
          placeholder="Add values seperated by (+)"
          onChange={(e) => {
            setNewValues(e.target.value);
          }}
        />

        <Button
          loading={valueAddLoading}
          disabled={valueAddLoading}
          type="link"
          onClick={() => {
            preAdding(newValues, selectedProperty?.id);
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {PropsLoading && <Oval width={100} height={100} color="black" />}

      {!PropsLoading && PropsSuccess && (
        <>
          <div>
            <Table dataSource={PropsData?.data} columns={columns} />

            <Modal
              open={modalVisible}
              title="Property Values"
              onCancel={() => setModalVisible(false)}
              footer={null}
            >
              {modalContent}
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default Props;
