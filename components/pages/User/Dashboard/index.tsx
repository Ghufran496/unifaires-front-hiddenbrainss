"use client";
import { Layout } from "antd";
import MainHeader from "./components/MainHeader";
import MainContent from "./components/MainContent";
import Container from "@/components/shared/container";

const Dashboard = () => {
  return (
    <Container>
      <Layout className="">
        <MainHeader />
        <MainContent />
      </Layout>
    </Container>
  );
};

export default Dashboard;
