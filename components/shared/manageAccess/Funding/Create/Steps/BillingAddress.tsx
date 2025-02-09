"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
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
  Row,
  Select,
  Typography,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { FundingContext } from "../FundingContext";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";

interface AddressInt {
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}
interface BillingInt {
  next: Function;
  prev: Function;
  setBillingAddress: any;
}
const BillingAddress = ({ next, prev, setBillingAddress }: BillingInt) => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const { fundingData, fetchFundingData } = useContext<any>(FundingContext);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressList, setAddressList] = useState<Array<AddressInt>>();
  const userId = session?.user?.id;
  const dispatch: any = useAppDispatch();

  const onChange = (e: CheckboxChangeEvent) => {
    if (e) {
      setDefaultAddress(!defaultAddress);
    }
    // console.log(`checked = ${e.target.checked}`);
  };

  const fetchUserAddress = async () => {
    await axiosInstance
      .get(`/address/user/${userId}`)
      .then((res) => {
        if (res.status) {
          // console.log(res.data.data);
          setAddressList(res.data.data);
        }
      })
      .catch((e) => {
        // message.error("An error occur");
        console.log(e);
      });
  };

  useEffect(() => {
    dispatch(fetchCountries());
    fetchUserAddress();
  }, []);

  const handleAddress = async () => {
    const formData = form.getFieldsValue();
    formData["default"] = defaultAddress;
    console.log(defaultAddress);
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
          fetchFundingData();
          next();
        }
      })
      .catch((e) => {
        // message.error("An error occur");
        console.log(e);
      });
    setLoading(false);
  };

  const handleUserAddress = (addressInfo: AddressInt | null) => {
    setBillingAddress(addressInfo);
    next();
    // setSelectedAddress(addressInfo);
  };

  const countries = useAppSelector((state: any) => state.country.countries);
  const countryListOption = countries.map((c: any) => {
    return {
      label: c.name,
      value: c.name,
    };
  });

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
      <div className="px-6">
        <div className="mb-8">
          <Typography.Title level={2}>
            Choose a Billing Address
          </Typography.Title>
          <Typography.Paragraph>
            Please selecet a billing address from your address book (below) or
            enter a new billing address. Don&apos;t worry, you will only need to
            do this once for each credit card. If you contact us about your
            order, we will reference your account only by the name you provide
            below.
          </Typography.Paragraph>
          <Divider />
          <div className="flex flex-row gap-4">
            {addressList !== undefined &&
              addressList?.length > 0 &&
              addressList?.map((addressInfo) => {
                return (
                  <Card
                    hoverable
                    className="flex flex-col gap-2"
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
                      onClick={() => handleUserAddress(addressInfo)}
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
        <Button size="large" onClick={() => prev()}>
          Previous
        </Button>
        <Button
          size="large"
          type="primary"
          className="ml-auto"
          onClick={handleAddress}
          loading={loading}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default BillingAddress;
