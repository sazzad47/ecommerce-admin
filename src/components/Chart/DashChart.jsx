import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./DashChart.scss";
import { Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const DashChart = ({ data }) => {
  return (
    <div>
      <Title level={3}>Number of Orders in {moment().format("MMMM")}</Title>
      <LineChart
        height={400}
        data={data}
        width={window.innerWidth >= 768 ? 800 : window.innerWidth - 40} // Adjust width based on screen size
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="rgb(75, 192, 192)"
          name="Number of Orders"
        />
      </LineChart>
    </div>
  );
};

export default DashChart;
