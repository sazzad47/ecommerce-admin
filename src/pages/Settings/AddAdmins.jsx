import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";

const AddAdmins = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h2>Add Admins</h2>
      <Form onFinish={onFinish} className="d-flex g-15">
        {/* Form fields for adding admin */}
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Admin
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={showModal}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Form fields for changing password */}
        <Form>{/* Old password, new password fields */}</Form>
      </Modal>
    </div>
  );
};

export default AddAdmins;
