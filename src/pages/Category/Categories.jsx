import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { CategoryHooks } from "../../Features";
import { Oval } from "react-loader-spinner";
import CategoryProps from "./CategoryProps/CategoryProps";
import CategoryImages from "./CategoryImages";
const Categories = () => {
  const { useCategory, useCategoryOperations } = CategoryHooks;
  const { CategoryData, CategoryLoading, GetCategory, CategorySuccess } =
    useCategory();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { Update, UpdateLoading, Delete, DeleteLoading } =
    useCategoryOperations(selectedCategory?.id);

  useEffect(() => {
    GetCategory();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Number of Products",
      dataIndex: "number_of_products",
      key: "number_of_products",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewCategory(record)}>
          View
        </Button>
      ),
    },
  ];

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  const modalContent = (
    <div>
      <div className="d-flex-no-change g-5 f-wrap a-center">
        Category Details:
        <input
          value={selectedCategory?.title}
          className="w-30"
          onChange={(e) => {
            setSelectedCategory({ ...selectedCategory, title: e.target.value });
          }}
        />
        <Button
          type="link"
          loading={UpdateLoading}
          disabled={UpdateLoading}
          onClick={() => {
            Update({
              id: selectedCategory?.id,
              title: selectedCategory?.title,
            });
          }}
        >
          Update
        </Button>
        <Button
          type="link"
          danger
          loading={DeleteLoading}
          disabled={DeleteLoading}
          onClick={() => Delete()}
        >
          Delete
        </Button>
      </div>

      <CategoryProps id={selectedCategory?.id} />
      <CategoryImages id={selectedCategory?.id} />
    </div>
  );

  return (
    <div>
      {CategoryLoading && <Oval color="black" width={100} height={100} />}
      {!CategoryLoading && CategorySuccess && (
        <Table dataSource={CategoryData?.data} columns={columns} />
      )}
      <Modal
        visible={modalVisible}
        title="Category Details"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Categories;
