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
  Row,
  Select,
  Typography,
  message,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
// import { JobContext } from "../JobContext";

interface AddressInt {
  zipcode: any;
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

const { Title, Paragraph } = Typography;

const Address = ({ next, prev, setBillingAddress }: BillingInt) => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  //   const { jobData, fetchJobData } = useContext<any>(JobContext);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressList, setAddressList] = useState<Array<AddressInt>>();
  const [selectedAddress, setSelectedAddress] = useState<AddressInt | null>(
    null
  );
  const [countryStates, setCountryStates] = useState();

  const dispatch: any = useAppDispatch();
  const userId = session?.user?.id;

  const onChange = (e: CheckboxChangeEvent) => {
    if (e) {
      setDefaultAddress(!defaultAddress);
    }
  };

  const fetchUserAddress = async () => {
    await axios
      .get(`${config.API.API_URL}/address/user/${userId}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
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

  const countries = useAppSelector((state: any) => state.country.countries);
  const countryListOption = countries.map((c: any) => {
    return {
      label: c.name,
      value: c.code,
    };
  });

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
    setBillingAddress(addressInfo);
    next();
    setSelectedAddress(addressInfo);
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
      <div className="px-6">
        <div className="mb-8">
          <Title level={2}>Choose a Billing Address</Title>
          <Paragraph>
            Please selecet a billing address from your address book (below) or
            enter a new billing address. Don&apos;t worry, you will only need to
            do this once for each credit card. If you contact us about your
            order, we will reference your account only by the name you provide
            below.
          </Paragraph>
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
                      <Paragraph className="m-0 text-gray-500">
                        {addressInfo?.fullname}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-500">
                        {addressInfo?.address}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-500">
                        {addressInfo?.city} - {addressInfo?.zipcode},
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-500">
                        {addressInfo?.country}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-500">
                        {addressInfo?.phoneNumber}
                      </Paragraph>
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
          <Title level={3}> Add a New Address</Title>
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
          // disabled={!selectedAddress}
          loading={loading}
        >
          Add Address
        </Button>
      </div>
    </Fragment>
  );
};

export default Address;
