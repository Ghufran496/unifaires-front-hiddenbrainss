"use client";
import React, { Fragment } from "react";
// antd components
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
} from "antd";
// app components
import Container from "@/components/shared/container";
import { useEffect, useState } from "react";

interface IRole {
  title: string;
  id: number;
}
interface IRoles {
  roles: IRole[];
}

interface IRoleList {
  value: number;
  label: string;
}
const CreateUser = ({ roles }: IRoles) => {
  const [form] = Form.useForm();
  const [rolesList, setRolesList] = useState<IRoleList[]>();

  useEffect(() => {
    let rolesObject = {};
    let i = roles.map((index, value) => {
      let j = index.title;
      // j[0] = j[0].toUpperCase().replace(j[])
      return { value: index.id, label: index.title };
    });

    setRolesList(i);
  }, []);

  const onFinish = async () => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Fragment>
      <section className="content-header pt-6">
        <Container className="container-fluid px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="grow">
              <Typography.Title level={3} className="mb-0">
                Create New User
              </Typography.Title>
            </div>
            <div className="shrink-0"></div>
          </div>
        </Container>
      </section>
      <Divider />
      <section className="content-body">
        <Container className="container-fluid px-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={20}>
              <Col lg={12}>
                <Form.Item
                  label="First Name"
                  required
                  tooltip="This is a required field"
                >
                  <Input size="large" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Last Name"
                  required
                  tooltip="This is a required field"
                >
                  <Input size="large" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Email"
                  required
                  tooltip="This is a required field"
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Language"
                  required
                  tooltip="This is a required field"
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder="Select language"
                    options={[
                      {
                        value: "english",
                        label: "English",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Role"
                  required
                  tooltip="This is a required field"
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder="Select users role"
                    options={
                      rolesList
                      // [
                      //   {
                      //     value: "human-resource",
                      //     label: "Human Resource",
                      //   },
                      // ]
                    }
                  />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Business Unit "
                  required
                  tooltip="This is a required field"
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder="Select business unit "
                    options={[
                      {
                        value: "marketing",
                        label: "Marketing",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="User's password "
                  required
                  tooltip="This is a required field"
                >
                  <Input.Password size="large" placeholder="input password" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Button size="large" type="primary">
                  Create User
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </Fragment>
  );
};

export default CreateUser;
