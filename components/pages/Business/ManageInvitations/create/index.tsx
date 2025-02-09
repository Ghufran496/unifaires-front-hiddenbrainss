"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
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
  Breadcrumb,
  message,
  Space,
  Steps,
} from "antd";
// app components
import Container from "@/components/shared/container";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import InvitePayment from "./InvitePayment";

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 24 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 24 },
//   },
// };
const CreateInvitations = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const [allRoles, setAllRoles] = useState<any>();
  const [allPermissions, setAllPermissions] = useState<any>();
  const [inviteList, setInviteList] = useState<any>();

  const fetchAllRoles = async () => {
    try {
      const res = await axiosInstance.get("/access-roles/business-roles");

      if (res.status) {
        // toast.success("Permission Fetched Successfully");
        setAllRoles(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const fetchAllPermissions = async () => {
    try {
      const res = await axiosInstance.get(
        "/access-permissions/business-permissions"
      );
      if (res.status) {
        // toast.success("Permission Fetched Successfully");
        setAllPermissions(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleFinish = async () => {
    const formData = form.getFieldsValue();
    await form.validateFields();

    // console.log(formData);

    if (formData.users.length > 0) {
      const modifiedFormData = formData.users.map((user: any) => {
        return {
          ...user,
          text: formData.text || "Invitation",
        };
      });
      const reqBody = {
        invites: modifiedFormData,
      };
      setInviteList(reqBody);
      setMakePayment(true);
    } else {
      toast.error("Please add at least one user");
    }
  };

  const handleBackToInvitationPage = () => {
    setMakePayment(false);
  };

  useEffect(() => {
    fetchAllRoles();
    fetchAllPermissions();
  }, []);

  const rolesSelectOption =
    allRoles &&
    allRoles.map((role: any) => {
      return {
        label: role.title,
        value: role.id,
      };
    });
  const permissionsSelectOption =
    allPermissions &&
    allPermissions.map((permission: any) => {
      return {
        label: permission.title,
        value: permission.id,
      };
    });

  return (
    <Fragment>
      {!makePayment ? (
        <div>
          <section className="content-header">
            <Container className="px-6 pt-6 container-fluid">
              <Breadcrumb
                items={[
                  {
                    title: "Manage Accounts",
                    href: "/business/manage-accounts",
                  },
                  {
                    title: "Invitations",
                    href: "/business/manage-accounts/invitations",
                  },
                  { title: "Create Invitations" },
                ]}
              />
              <div className="mt-3">
                <Typography.Title level={2} className="mb-0">
                  Invite Users To Your Account
                </Typography.Title>
                <Typography.Paragraph className="mb-0 max-w-2xl">
                  Invite users into your account by entering semi-colon
                  separated email addresses below and we’ll send them an email
                  with a link they can use to set up their login details.
                </Typography.Paragraph>
              </div>
            </Container>
          </section>
          <Divider />

          <section className="content-body">
            <Container className="px-6 pb-6 container-fluid">
              <Form
                name="dynamic_form_nest_item"
                size="large"
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                autoComplete="off"
                className="mt-4"
              >
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            name={[name, "email"]}
                            label="Email"
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message: "Please enter email",
                              },
                            ]}
                          >
                            <Input size="large" placeholder="Email" />
                          </Form.Item>

                          <Form.Item
                            name={[name, "invitedUserType"]}
                            label="User Type  "
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message: "Please select user type ",
                              },
                            ]}
                          >
                            <Select
                              allowClear
                              showSearch
                              size="large"
                              placeholder="Select user type "
                              options={[
                                {
                                  value: "user",
                                  label: "User",
                                },
                                // {
                                //   value: "business",
                                //   label: "Business",
                                // },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item
                            name={[name, "roleIds"]}
                            label="Role"
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please select roles you desire to give to user",
                              },
                            ]}
                          >
                            <Select
                              mode="tags"
                              allowClear
                              showSearch
                              size="large"
                              className="min-w-[170px]"
                              placeholder="Select users role"
                              options={rolesSelectOption}
                            />
                          </Form.Item>
                          <Form.Item
                            name={[name, "permissionIds"]}
                            label="Permissions"
                            required
                            tooltip="This is a required field"
                            // rules={[
                            //   {
                            //     required: true,
                            //     message:
                            //       "Please select permissions you desire to give to user",
                            //   },
                            // ]}
                          >
                            <Select
                              mode="tags"
                              allowClear
                              showSearch
                              size="large"
                              className="min-w-[170px]"
                              placeholder="Select users permission"
                              options={permissionsSelectOption}
                            />
                          </Form.Item>
                          <div className="flex items-center justify-center ">
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </div>
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="link"
                          onClick={() => add()}
                          className="text-purple-50 mt-6"
                          icon={
                            <PlusOutlined
                              style={{ color: "#5832DA" }}
                              className="rounded-full p-2 bg-purple-60"
                            />
                          }
                        >
                          Add User
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
                <Form.Item
                  name="text"
                  label="Add a Personal Message (Optional) "
                >
                  <Input.TextArea
                    rows={6}
                    size="large"
                    placeholder="Personal invitation message"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Send Invite
                  </Button>
                </Form.Item>
              </Form>
            </Container>
          </section>
        </div>
      ) : (
        <section className="content-body">
          <section className="content-header">
            <Container className="px-6 pt-6 container-fluid">
              <Breadcrumb
                items={[
                  {
                    title: "Manage Accounts",
                    href: "/business/manage-accounts",
                  },
                  {
                    title: "Invitations",
                    href: "/business/manage-accounts/invitations",
                  },
                  {
                    title: "Create Invitations",
                    className: "cursor-pointer hover:bg-gray-200 ",
                    onClick: handleBackToInvitationPage,
                  },
                  { title: "Make Payments" },
                ]}
              />
              <div className="mt-3">
                <Typography.Title level={2} className="mb-0">
                  Invite Users To Your Account
                </Typography.Title>
                <Typography.Paragraph className="mb-0 max-w-2xl">
                  Invite users into your account by entering semi-colon
                  separated email addresses below and we’ll send them an email
                  with a link they can use to set up their login details.
                </Typography.Paragraph>
              </div>
            </Container>
          </section>
          <Divider />
          <div className="m-[2em]">
            <InvitePayment
              inviteList={inviteList}
              setInviteList={setInviteList}
            />
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default CreateInvitations;
