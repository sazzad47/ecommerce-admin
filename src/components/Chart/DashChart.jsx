import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./DashChart.scss";
import { Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const DashChart = ({ data }) => {
  return (
    <div style={{width: "100%"}}>
      <Title level={3}>Number of Orders in {moment().format("MMMM")}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
      </ResponsiveContainer>
    </div>
  );
};

export default DashChart;
