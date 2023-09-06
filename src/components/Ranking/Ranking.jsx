import React from "react";
import { Typography, Table } from "antd";
import { TrophyOutlined, CrownOutlined, StarOutlined } from "@ant-design/icons";
import "./Ranking.scss";
const { Title } = Typography;

const Ranking = ({ data }) => {
  const columns = [
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (text, record, index) => {
        if (index === 0) {
          return <TrophyOutlined style={{ color: "#fadb14" }} />;
        } else if (index === 1) {
          return <CrownOutlined style={{ color: "#d4b106" }} />;
        } else if (index === 2) {
          return <StarOutlined style={{ color: "#d48806" }} />;
        } else {
          return index + 1;
        }
      },
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
  ];

  return (
    <>
      <Title level={3}>Most Viewed Products</Title>
      <div className="ranking">
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </>
  );
};

export default Ranking;
