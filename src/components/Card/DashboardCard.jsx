import React from "react";
import { Card } from "antd";
import "./card.scss";
const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card className="card">
      <div className="card-content ">
        <div>
          <p className="icon">{icon}</p>
          <h3>{title}</h3>
        </div>
        <p>{value}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;
