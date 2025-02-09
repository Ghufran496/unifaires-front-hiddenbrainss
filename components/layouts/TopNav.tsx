"use client";

import React, { useState, useEffect, Fragment } from "react";
// next
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
// ant and icons

import {
  Button,
  Col,
  Dropdown,
  Form,
  MenuProps,
  Popover,
  Select,
  Typography,
  // Menu,
} from "antd";
//

import caret from "@/public/images/caret.svg";
import england from "@/public/images/england.svg";
import location from "@/public/images/map-pin.svg";
// app component
import Container from "@/components/shared/container";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import axiosInstance from "@/app/utils/axios-config";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { CommentOutlined } from "@ant-design/icons";
import {
  fetchCurrencies,
  fetchCurrencyConvertionRate,
} from "@/redux/features/CurrencySlice";
import { RootState } from "@/redux/store";
import { showSuccess } from "@/app/utils/axiosError";

interface ICountryOptions {
  value: string;
  label: string;
  flags: string;
}

interface LocationData {
  city: string;
  region: string;
  country: string;
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any; // You can replace 'any' with a more specific type if needed
  }
}

const TopNav = () => {
  const [form] = Form.useForm();
  const { data: session, status } = useSession();
  const [countryList, setCountryList] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const dispatch: any = useAppDispatch();
  const userId = session?.user?.id;
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const userCity = locationData && locationData?.city;
  const userRegionName = locationData && locationData?.regionName;
  const businessAccess = session?.user.businessAccess;
  const locationCurrency = locationData && locationData.currency;
  const savedCurrency = getCookie("currency");
  const [storedCurrencies, setStoredCurrencies] = useState<any>(null);
  const [currencyOptions, setCurrencyOptions] = useState<any>([]);
  const currency =
    typeof savedCurrency ==="string" ? savedCurrency : locationCurrency;

  const { Title } = Typography;
  const { Paragraph } = Typography;

  const [currentLocation, setCurrentLocation] = useState<any>(null);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      getCurrencyFromStorage();
    }
  }, []);

  const fetchAllCurrencies = async () => {
    try {
      const res = await dispatch(fetchCurrencies());

      if (res) {
        const resData = res.payload;
        localStorage.setItem("allCurrencies", JSON.stringify(resData));
        getCurrencyFromStorage();
      }
    } catch (error) {
      console.log("unable to fetch currencies", error);
    }
  };

  function getCurrencyFromStorage() {
    const storedCurrenciesString = localStorage.getItem("allCurrencies");
    if (storedCurrenciesString) {
      try {
        const allCurrency = JSON.parse(storedCurrenciesString);
        setStoredCurrencies(allCurrency);
        setCurrencyOptions(
          Object.entries(allCurrency).map(([code, name]) => {
            const combinedName = `${code}: ${name}`;
            return {
              label: combinedName,
              value: code,
            };
          })
        );
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        // Optionally, you could fetch all currencies here if JSON parsing fails
        fetchAllCurrencies();
      }
    } else {
      fetchAllCurrencies();
    }
  }

  // useEffect(() => {
  //   if (!storedCurrencies) {
  //   }
  // }, [storedCurrencies]);

  const fetchCountries = () => [
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const response = res.data;
        const newCountryList = response.map((country: any) => {
          return {
            value: country.name.common,
            label: country.name.common,
            flags: country.flags.png,
          };
        });
        setCountryList(newCountryList);
      })
      .catch((error) => {
        console.log("fetching countries error", error);
      }),
  ];
  useEffect(() => {
    if (userId) {
      dispatch(fetchAllAddress(userId));
    }
    fetchCountries();
  }, [status]);

  const handleApplyChanges = async () => {
    const formData = form.getFieldsValue();

    // Set the currency cookie if selectedCurrency is available
    if (selectedCurrency) {
      setCookie("currency", selectedCurrency);

      // setCookie("allCurrencies", )
    }
    // // Update selected country and language states
    // setSelectedCountry(formData.country);
    handleLanguageChange(formData.language);
    setCookie("language", formData.language);

    // Refresh the page to apply changes
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchCurrencyConvertionRate({ currency }));
  }, [currency]);

  const content = (
    <div className="max-w-[700px] p-4 py-10">
      <div className="flex lg:flex-row md:flex-row flex-col gap-8 justify-between">
        <div className="lg:w-1/2 md:w-2/3">
          <span className="text-lg font-bold">Preferences</span>
          <Paragraph>
            To ensure you discover the perfect products tailored just for you,
            we curate our product selection based on your current location.
            Please take a moment to confirm that we have accurately identified
            your country, language, and currency preferences. This way, you can
            make the most informed decisions, whether you&apos;re enrolling in a
            course or exploring job opportunities.
          </Paragraph>
        </div>
        <div>
          <Form layout="vertical" form={form}>
            <Form.Item label="Language" name="language" className="mb-2">
              <Select
                allowClear
                showSearch
                placeholder="Select a language"
                optionFilterProp="children"
                bordered={false}
                className="w-full border rounded-md hover:border-blue-700 "
                size="large"
                filterOption={(
                  input: string,
                  option?: { label: string; value: string }
                ) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                defaultValue={getCookie("googtrans")?.split("/")[2] || "en"}
                options={[
                  {
                    value: "en",
                    label: "English",
                  },
                  {
                    value: "fr",
                    label: "French",
                  },
                  {
                    value: "de",
                    label: "German",
                  },
                  {
                    value: "korean",
                    label: "Korean",
                  },
                  {
                    value: "chinese",
                    label: "Chinese",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Currency" name="currency" className="mb-2">
              <Select
                allowClear
                showSearch
                placeholder="Select a Currency"
                optionFilterProp="children"
                // variant={false}
                className="lg:w-[280px] md:w-[230px] w-full border rounded-md hover:border-blue-700 "
                size="large"
                defaultValue={`${currency}`}
                onChange={(value) => setSelectedCurrency(value)}
                filterOption={(
                  input: string,
                  option?: { label: string; value: string }
                ) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={currencyOptions}
              />
            </Form.Item>
          </Form>
          <div>
            <Button
              type="primary"
              size="large"
              className="flex ml-auto mt-4 rounded-sm"
              onClick={handleApplyChanges}
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const defaultAddress = useAppSelector(
    (state: any) => state.address.defaultAddress
  );

  useEffect(() => {
    // Load Google Translate script
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default language
          includedLanguages: "en,fr,de", // Supported languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element" // ID of the element where the widget will appear (hidden)
      );
    };

    // Trigger Google Translate if language cookie is set
    const savedLanguage = getCookie("googtrans");
    if (savedLanguage) {
      handleLanguageChange(savedLanguage);
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setCookie("googtrans", `/en/${value}`, { path: "/" });
    setCookie("googtrans", `/en/${value}`);

    // Reload the Google Translate iframe to reflect the language change
    const googleTranslateFrame = document.querySelector("iframe");
    if (googleTranslateFrame) {
      googleTranslateFrame.contentWindow?.location.reload();
    }
  };

  function capitalizeFirstLetter(val: string) {
    return typeof val === "string" && val.trim() !== ""
      ? val.charAt(0).toUpperCase() + val.slice(1)
      : "";
  }

  return (
    <Fragment>
      <div className="bg-blue-50" id="nav">
        <Container className="px-6 container-fluid">
          <div className="flex items-center justify-between w-full gap-2 py-2">
            <div className="flex items-center">
              <Image src={location} alt="icon" />
              <Paragraph className="pl-2 mb-0  text-white">
                Deliver to{" "}
                <span className="text-[14px] font-bold ">
                  {defaultAddress &&
                  session &&
                  status == "authenticated" &&
                  defaultAddress.city != undefined
                    ? `${defaultAddress.zipcode}, ${
                        defaultAddress && defaultAddress.city
                      }`
                    : userCountry
                    ? `${userCountry}`
                    : "Loading..."}
                </span>
              </Paragraph>
            </div>
            {businessAccess && (
              <div>
                <Paragraph className="m-0 text-base text-white font-semibold">
                  {`Managing - ${businessAccess?.ownerDetails?.firstname} ${
                    businessAccess?.ownerDetails?.lastname
                  } as ${capitalizeFirstLetter(businessAccess?.roleName)}`}
                  {/* <span className="text-red-700">
                    {`${businessAccess?.ownerDetails?.firstname} ${businessAccess?.ownerDetails?.lastname}`}
                  </span> */}
                </Paragraph>
              </div>
            )}
            <Popover
              placement="bottomRight"
              style={{
                marginBlockEnd: 20,
              }}
              content={content}
              trigger="click"
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <Paragraph className="mb-0 text-white">
                  {selectedLanguage || "ENG"}
                </Paragraph>
                {/* <Image src={england} alt="country" width={18} /> */}
                <Image src={caret} alt="country" />
              </div>
            </Popover>
            {/* <Dropdown
              menu={{ items: languageItems }}
              trigger={["click"]}
              placement="bottom"
            >
              <AntLink
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2"
              >
                <Paragraph className="mb-0 text-white">
                  Eng
                </Paragraph>
                <Image src={england} alt="country" width={18} />
                <Image src={caret} alt="country" />
              </AntLink>
            </Dropdown> */}
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default TopNav;
