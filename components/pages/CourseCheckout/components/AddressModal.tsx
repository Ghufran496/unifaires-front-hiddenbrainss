"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  message,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { BellFilled } from "@ant-design/icons";
// import { JobContext } from "../JobContext";

interface AddressInt {
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}
interface IProp {
  addressModal: boolean;
  selectedAddress: AddressInt | null;
  setAddressModal: any;
  setSelectedAddress: any;
  fetchUserAddress: Function;
  addressList: Array<AddressInt>;
}
const AddressModal = ({
  addressModal,
  setAddressModal,
  selectedAddress,
  setSelectedAddress,
  fetchUserAddress,
  addressList,
}: IProp) => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  //   const { jobData, fetchJobData } = useContext<any>(JobContext);
  const [defaultAddress, setDefaultAddress] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    if (e) {
      setDefaultAddress(!defaultAddress);
    }
    // console.log(`checked = ${e.target.checked}`);
  };

  // useEffect(() => {
  //   if (addressList && addressList.length > 0) {
  //     setSelectedAddress(addressList[0]); // Set the first address as default
  //   }
  // }, [addressList]);

  const handleAddress = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    formData["default"] = defaultAddress;
    setLoading(true);
    await axios
      .post(
        `${config.API.API_URL}/address`,
        { ...formData },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          setAddressModal(false);
          fetchUserAddress();
          message.success("Addresss added successfully");
        }
      })
      .catch((e) => {
        message.error("Unable to Add Address");
        console.log(e);
      });
    setLoading(false);
  };

  const handleUseAddress = (addressInfo: AddressInt | null) => {
    setSelectedAddress(addressInfo);
    closeModal();
  };

  const closeModal = () => {
    setAddressModal(false);
  };
  return (
    <Fragment>
      <Modal
        open={addressModal}
        onCancel={closeModal}
        onOk={closeModal}
        footer={false}
        width={800}
      >
        <div className="px-6">
          <div className="mb-8">
            <Typography.Title level={2}>Edit Address</Typography.Title>
            <Typography.Paragraph>
              This address appears on your monthly invoice and should be legal
              address of your home or business
            </Typography.Paragraph>
            <Typography.Paragraph>
              <BellFilled className="text-red-700 pr-2" />
              <span className="font-bold">Warning:</span> Updating your account
              address may update your Tax location
            </Typography.Paragraph>
            <Divider />
            <div className="flex flex-row gap-4">
              {addressList !== undefined &&
                addressList?.length > 0 &&
                addressList?.map((addressInfo) => {
                  return (
                    <Card
                      hoverable
                      className={`flex flex-col gap-2 ${
                        selectedAddress && selectedAddress.id === addressInfo.id
                          ? "border-primary"
                          : ""
                      }`}
                      key={addressInfo.id}
                    >
                      <div>
                        <Typography.Paragraph className="m-0 text-black font-bold"></Typography.Paragraph>
                        <Typography.Paragraph className="m-0 text-gray-500">
                          {addressInfo?.address}
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m-0 text-gray-500">
                          {addressInfo?.city}
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m-0 text-gray-500">
                          {addressInfo?.country}
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m-0 text-gray-500">
                          {addressInfo?.phoneNumber}
                        </Typography.Paragraph>
                      </div>
                      <Button
                        type="primary"
                        size="large"
                        className="flex justify-center mt-4"
                        onClick={() => handleUseAddress(addressInfo)}
                      >
                        Use this Address
                      </Button>
                    </Card>
                  );
                })}
            </div>
          </div>
          <Divider />
          <div>
            <Typography.Title level={3}> Add a New Address</Typography.Title>
            <Form layout="vertical" form={form} size="large">
              <Col>
                <Form.Item
                  name="country"
                  label="Country/Region"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please select a Country",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Country"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "ghana",
                        label: "Ghana",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Form.Item
                name="fullname"
                label="Full Name(First and Last Name)"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter name",
                  },
                ]}
              >
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a phone Number",
                  },
                ]}
              >
                <Input type="number" placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                style={{ fontStyle: "italic", fontWeight: 600 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter an Address",
                  },
                ]}
              >
                <Input placeholder="BASF AG" className="p-4" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col lg={8}>
                  <Form.Item
                    name="city"
                    label="City"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a City",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select City"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: "lokoja",
                          label: "Lokoja",
                        },
                        {
                          value: "main land",
                          label: "Main Land",
                        },
                        {
                          value: "ikeja",
                          label: "Ikeja",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    name="state"
                    label="State"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a State",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select State"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: "lagos",
                          label: "Lagos",
                        },
                        {
                          value: "kaduna",
                          label: "Kaduna",
                        },
                        {
                          value: "abuja",
                          label: "Abuja",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    name="zipcode"
                    label="Zip Code"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select the Zip Code",
                      },
                    ]}
                  >
                    <Input placeholder="9394" />
                  </Form.Item>
                </Col>
              </Row>
              <Checkbox onChange={onChange}>
                Make this my default address
              </Checkbox>
            </Form>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button
            size="large"
            type="primary"
            className="ml-auto"
            onClick={handleAddress}
            // disabled={!selectedAddress}
            loading={loading}
          >
            Add Address
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddressModal;
