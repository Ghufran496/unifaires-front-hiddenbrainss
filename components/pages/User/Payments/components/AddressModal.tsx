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
import { BellFilled, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
import { fetchAllAddress, removeAddress } from "@/redux/features/AddressSlice";
import { toast } from "react-toastify";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
// import { JobContext } from "../JobContext";

interface AddressInt {
  id: number;
  zipcode: string;
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
  addressList: Array<AddressInt>;
}
const AddressModal = ({
  addressModal,
  setAddressModal,
  selectedAddress,
  setSelectedAddress,
  addressList,
}: IProp) => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  //   const { jobData, fetchJobData } = useContext<any>(JobContext);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const dispatch: any = useAppDispatch();

  const onChange = (e: CheckboxChangeEvent) => {
    if (e) {
      setDefaultAddress(!defaultAddress);
    }
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const countries = useAppSelector((state: any) => state.country.countries);
  const countryListOption = countries.map((c: any) => {
    return {
      label: c.name,
      value: c.name,
    };
  });

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
          dispatch(fetchAllAddress(userId));
          message.success("Addresss added successfully");
        }
      })
      .catch((e) => {
        message.error("Unable to Add Address");
        console.log(e);
      });
    setLoading(false);
  };

  const handleDeleteAddress = (id: any) => {
    try {
      const deleteAddress = dispatch(removeAddress(id));
      if (deleteAddress) {
        toast.success("Address Removed");
        console.log(deleteAddress);
      }
    } catch (error) {
      console.log(error);
      handleAxiosError(error);
    }
  };

  const closeModal = () => {
    setAddressModal(false);
  };

  const handleUseAddress = async (addressInfo: AddressInt | null) => {
    const id: any = addressInfo?.id;
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      const res = await axiosInstance.put(`/address/${id}`, {
        default: true,
      });
      if (res.status) {
        showSuccess("Addresss set as default");
        setSelectedAddress(addressInfo);
        dispatch(fetchAllAddress(userId));
        closeModal();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSelectedCountry = (countryCode: any) => {
    dispatch(fetchCountryStates(countryCode));
  };

  const handleSelectedState = (stateCode: any) => {
    dispatch(fetchStateCities(stateCode));
  };

  const states = useAppSelector((state: any) => state.country.states);
  const statesOption = states.map((s: any) => {
    return {
      label: s.name,
      value: s.state_code,
    };
  });
  const cities = useAppSelector((state: any) => state.country.cities);

  const citiesOption = cities.map((s: any) => {
    return {
      label: s.name,
      value: s.name,
    };
  });

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
                        <div>
                          <Typography.Paragraph className="m-0 text-gray-500">
                            {addressInfo?.fullname}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="m-0 text-gray-500">
                            {addressInfo?.address}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="m-0 text-gray-500">
                            {addressInfo?.city} - {addressInfo?.zipcode},
                          </Typography.Paragraph>
                          <Typography.Paragraph className="m-0 text-gray-500">
                            {addressInfo?.country}
                          </Typography.Paragraph>
                          <Typography.Paragraph className="m-0 text-gray-500">
                            {addressInfo?.phoneNumber}
                          </Typography.Paragraph>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Button
                            type="primary"
                            size="middle"
                            className="flex justify-center items-center rounded-[4px]"
                            onClick={() => handleUseAddress(addressInfo)}
                            loading={loadingStates[addressInfo.id] || false}
                          >
                            Use this Address
                          </Button>
                          <Button
                            icon={<DeleteOutlined />}
                            type="text"
                            size="middle"
                            className="flex ml-auto items-center justify-center text-red-600 hover:cursor-pointer"
                            onClick={() => handleDeleteAddress(addressInfo.id)}
                          />
                        </div>
                      </div>
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
                    allowClear
                    placeholder="Select Country"
                    optionFilterProp="children"
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={countryListOption}
                    onChange={handleSelectedCountry}
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
                      allowClear
                      placeholder="Select State"
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={statesOption}
                      onChange={handleSelectedState}
                    />
                  </Form.Item>
                </Col>
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
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={citiesOption}
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
