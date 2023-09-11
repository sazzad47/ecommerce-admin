import React, { useEffect } from "react";
import {
  AppLayout,
  DashboardCard,
  Ranking,
  DashChart,
  TodayOrders,
} from "../../components";
import { Row, Col, Typography } from "antd";
import {
  ShoppingOutlined,
  DollarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { DashHooks } from "../../Features";
import "./Home.scss";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const { Title } = Typography;
  const { useDash } = DashHooks;
  const { GetInitial, InitialData, InitialLoading, InitialSuccess } = useDash();

  useEffect(() => {
    GetInitial();
  }, []);
  return (
    <AppLayout active={"1"}>
      {InitialLoading && <Oval color="white" width={150} height={150} />}
      {!InitialLoading && InitialSuccess && (
        <div>
          <Title level={2}>Welcome to the Dashboard</Title>
          <Title level={3}>Monthly Metrics</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12}>
              <DashboardCard
                title={"Number of Orders"}
                value={InitialData?.data.number_of_orders}
                icon={<ShoppingOutlined />}
              />
            </Col>
            <Col xs={24} sm={12} md={12}>
              <DashboardCard
                title={"Earnings"}
                value={`${InitialData?.data.total_of_orders} $`}
                icon={<DollarOutlined />}
              />
            </Col>
            <Col xs={24} sm={12} md={12}>
              <DashboardCard
                title={"Pending Earnings"}
                value={`${InitialData?.data.total_of_pending_orders} $`}
                icon={<DollarOutlined />}
              />
            </Col>
            <Col xs={24} sm={12} md={12}>
              <DashboardCard
                title={"New Users"}
                value={InitialData?.data.number_of_users}
                icon={<UserAddOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{marginTop: "2rem"}}>
            <Col xs={24} sm={16} md={16}>
            <DashChart data={InitialData?.data.orders_per_day} />
            </Col>
            <Col xs={24} sm={8} md={8}>
            <Ranking
                title={"Most Viewed Products"}
                data={InitialData?.data.total_views}
              />
            </Col>
          </Row>
        </div>
      )}
    </AppLayout>
  );
};

export default Home;
