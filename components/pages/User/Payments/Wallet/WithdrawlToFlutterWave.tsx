import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, Spin } from "antd";
import type { FormInstance } from "antd/es/form";
import {
  BankOutlined,
  WalletOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";

interface WithdrawToFlutterWaveProps {
  setIsFlutterWaveModalOpen: (open: boolean) => void;
  isFlutterWaveModalOpen: boolean;
}

interface Bank {
  id: number;
  code: string;
  name: string;
}

interface Country {
  code: string;
  name: string;
  currency: string;
}

const SUPPORTED_COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", currency: "NGN" },
  { code: "GH", name: "Ghana", currency: "GHS" },
  { code: "KE", name: "Kenya", currency: "KES" },
  { code: "MW", name: "Malawi", currency: "MWK" },
  { code: "SL", name: "Sierra Leone", currency: "SLL" },
  { code: "TZ", name: "Tanzania", currency: "TZS" },
  { code: "UG", name: "Uganda", currency: "UGX" },
  { code: "CM", name: "Cameroon", currency: "XAF" },
  { code: "CI", name: "Côte d'Ivoire", currency: "XOF" },
  { code: "SN", name: "Senegal", currency: "XOF" },
  { code: "ZA", name: "South Africa", currency: "ZAR" },
];

const WithdrawlToFlutterWave: React.FC<WithdrawToFlutterWaveProps> = ({
  setIsFlutterWaveModalOpen,
  isFlutterWaveModalOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [fetchingBanks, setFetchingBanks] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [convertedBalance, setConvertedBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { data: session } = useSession();

  const calculateUniFairsFee = (amount: number) => {
    return amount * 0.005; // 0.5% fee
  };

  const fetchUserBalance = async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoadingBalance(true);
      const response = await axios.get(
        `${config.API.API_URL}/users/${session.user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session.user.token,
          },
        }
      );

      if (response.status === 200) {
        const balance =
          response?.data?.data?.balance >= 0
            ? response?.data?.data?.balance
            : 0;
        setUserBalance(balance);
      } else {
        console.error("Failed to fetch user balance", response.data.message);
        setUserBalance(0);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
      setUserBalance(0);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const fetchConversionRates = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/4d3f92caf2e2597b5fa17e02/latest/USD`
      );
      if (response.data && response.data.conversion_rates) {
        return response.data.conversion_rates;
      }
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      return null;
    }
  };

  const convertBalance = async (currency: string) => {
    try {
      const rates = await fetchConversionRates();
      if (rates && rates[currency]) {
        const converted = userBalance * rates[currency];
        setConvertedBalance(converted);
      } else {
        setConvertedBalance(userBalance);
      }
    } catch (error) {
      console.error("Error converting balance:", error);
      setConvertedBalance(userBalance);
    }
  };

  useEffect(() => {
    if (isFlutterWaveModalOpen) {
      form.resetFields();
      setSelectedCountry("");
      setBanks([]);
      fetchUserBalance();
    }
  }, [isFlutterWaveModalOpen]);

  useEffect(() => {
    if (selectedCountry) {
      const countryData = SUPPORTED_COUNTRIES.find(
        (c) => c.code === selectedCountry
      );
      if (countryData) {
        convertBalance(countryData.currency);
      }
    }
  }, [selectedCountry, userBalance]);

  const fetchBanks = async (countryCode: string) => {
    try {
      setFetchingBanks(true);
      const response = await axios.get(
        `${config.API.API_URL}/flutterwave/banks/${countryCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        }
      );

      if (response.status === 200) {
        // Sort banks alphabetically by name
        const sortedBanks = response.data.data.sort((a: Bank, b: Bank) =>
          a.name.localeCompare(b.name)
        );
        setBanks(sortedBanks);
      } else {
        throw new Error(response.data.message || "Failed to fetch banks");
      }
    } catch (error: any) {
      console.error("Error fetching banks:", error);
      message.error(
        error.message || "Failed to fetch banks. Please try again."
      );
      setBanks([]);
    } finally {
      setFetchingBanks(false);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setBanks([]);
    form.setFieldValue("bankCode", undefined);
    if (countryCode) {
      fetchBanks(countryCode);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const selectedCountryData = SUPPORTED_COUNTRIES.find(
        (c) => c.code === selectedCountry
      );

      if (!selectedCountryData) {
        throw new Error("Invalid country selected");
      }
      const amountToBeTransferred =
        form.getFieldValue("amount") -
        calculateUniFairsFee(form.getFieldValue("amount"));

      const withdrawalData = {
        userId: session?.user?.id,
        amount: values.amount,
        currency: selectedCountryData.currency,
        bankCode: values.bankCode,
        accountNumber: values.accountNumber,
        amountToBeTransferred: amountToBeTransferred,
      };

      const response = await axios.post(
        `${config.API.API_URL}/flutterwave/withdraw`,
        withdrawalData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        }
      );

      if (response.status === 200) {
        message.success("Withdrawal request submitted successfully");
        setIsFlutterWaveModalOpen(false);
        form.resetFields();
      } else {
        throw new Error(
          response.data.message || "Failed to process withdrawal"
        );
      }
    } catch (error: any) {
      console.error("Withdrawal error:", error);
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to process withdrawal. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFlutterWaveModalOpen(false);
    form.resetFields();
  };

  const getCurrencySymbol = (countryCode: string) => {
    const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
    return country?.currency || "NGN";
  };

  return (
    <Modal
      title="Withdraw to Bank Account"
      open={isFlutterWaveModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={() => {
          form
            .validateFields()
            .then(() => {
              // Form is valid
            })
            .catch(() => {
              // Form is invalid
            });
        }}
        initialValues={{
          amount: undefined,
          bankCode: undefined,
          accountNumber: undefined,
          countryCode: undefined,
        }}
      >
        <Form.Item label="Available Balance" required>
          <div style={{ fontSize: "18px", color: "#1890ff" }}>
            <WalletOutlined />{" "}
            {isLoadingBalance ? (
              <Spin size="small" />
            ) : (
              <>
                {selectedCountry ? (
                  <>
                    {convertedBalance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {getCurrencySymbol(selectedCountry)}
                  </>
                ) : (
                  <>
                    {userBalance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </>
                )}
              </>
            )}
          </div>
        </Form.Item>

        <Form.Item
          label="Select Country"
          name="countryCode"
          rules={[{ required: true, message: "Please select your country" }]}
        >
          <Select
            placeholder="Select your country"
            onChange={handleCountryChange}
            suffixIcon={<GlobalOutlined />}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {SUPPORTED_COUNTRIES.map((country) => (
              <Select.Option key={country.code} value={country.code}>
                {country.name} ({country.currency})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Bank"
          name="bankCode"
          rules={[{ required: true, message: "Please select your bank" }]}
        >
          <Select
            placeholder="Select your bank"
            loading={fetchingBanks}
            disabled={!selectedCountry || fetchingBanks}
            suffixIcon={
              fetchingBanks ? <Spin size="small" /> : <BankOutlined />
            }
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {banks.map((bank) => (
              <Select.Option key={bank.code} value={bank.code}>
                {bank.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Account Number"
          name="accountNumber"
          rules={[
            { required: true, message: "Please enter your account number" },
            {
              pattern: /^\d{10}$/,
              message: "Please enter a valid 10-digit account number",
            },
          ]}
        >
          <Input
            placeholder="Enter your account number"
            maxLength={10}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter withdrawal amount" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                if (convertedBalance <= 0) {
                  return Promise.reject(
                    "Insufficient balance to make a withdrawal"
                  );
                }
                if (value > convertedBalance) {
                  return Promise.reject(
                    `Amount exceeds available balance of ${convertedBalance.toLocaleString()} ${
                      selectedCountry
                        ? getCurrencySymbol(selectedCountry)
                        : "USD"
                    }`
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter amount to withdraw"
            prefix={
              selectedCountry ? getCurrencySymbol(selectedCountry) : "USD"
            }
            style={{ width: "100%" }}
            min={0}
            step="0.01"
          />
        </Form.Item>

        {/* Display UniFairs fee */}
        {form.getFieldValue("amount") > 0 && (
          <div className="mt-3 p-3 bg-blue-50 text-white rounded-md mb-5">
            <p className="text-sm mb-2">
              <span className="font-medium">Withdrawal Summary:</span>
            </p>
            <div className="space-y-1">
              <p className="text-sm">
                Withdrawal Amount: {form.getFieldValue("amount")}{" "}
                {selectedCountry ? getCurrencySymbol(selectedCountry) : "USD"}
              </p>
              <p className="text-sm">
                UniFairs Fee (0.5%):{" "}
                {calculateUniFairsFee(form.getFieldValue("amount")).toFixed(2)}{" "}
                {selectedCountry ? getCurrencySymbol(selectedCountry) : "USD"}
              </p>
              <p className="text-sm font-medium border-t border-gray-200 pt-1 mt-1">
                You will receive:{" "}
                {(
                  form.getFieldValue("amount") -
                  calculateUniFairsFee(form.getFieldValue("amount"))
                ).toFixed(2)}{" "}
                {selectedCountry ? getCurrencySymbol(selectedCountry) : "USD"}
              </p>
            </div>
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            disabled={loading}
            style={{
              backgroundColor:
                form.isFieldsTouched(true) &&
                !form.getFieldsError().some(({ errors }) => errors.length)
                  ? "#1890ff"
                  : "#d9d9d9",
              borderColor:
                form.isFieldsTouched(true) &&
                !form.getFieldsError().some(({ errors }) => errors.length)
                  ? "#1890ff"
                  : "#d9d9d9",
            }}
          >
            Withdraw Funds
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WithdrawlToFlutterWave;
