"use client";

import { useState } from "react";
import { Modal, Input, Button, message } from "antd";

interface WithdrawToPaypalProps {
  setIsModalOpen: (open: boolean) => void;
}
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";

const WithdrawToPaypal = ({ setIsModalOpen }: WithdrawToPaypalProps) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({ email: "", amount: "" });
  const { data: session } = useSession();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateAmount = (amount: string) =>
    /^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) > 0;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(e.target.value) ? "" : "Invalid email address",
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setErrors((prev) => ({
      ...prev,
      amount: validateAmount(e.target.value) ? "" : "Enter a valid amount",
    }));
  };

  const isButtonDisabled = !validateEmail(email) || !validateAmount(amount);
  const handleWithdrawPaypapal = async () => {
    console.log("Withdraw initiated:", { email, amount });
    const payload = {
      amount: amount,
      userId: session?.user.id,
      paypalEmail: email,
    };

    console.log("Payment payload:", payload);
    try {
      const response = await axios.post(
        `${config.API.API_URL}/paypal/withdraw`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token, // Send auth token if needed
          },
        }
      );

      if (response.status === 200) {
        console.log(response)
        message.success("Withdraw success to the provided gmail account.");
        //   location.reload();
      }
      console.log(response);
    } catch (error) {
      console.error("Error initiating payment:", error);
      message.error("Payment initiation failed. Please try again.");
    }
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Withdraw to PayPal"
      open={true}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          key="withdraw"
          type="primary"
          disabled={isButtonDisabled}
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleWithdrawPaypapal}
        >
          Withdraw
        </Button>,
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            PayPal Email
          </label>
          <Input
            type="email"
            placeholder="Enter your PayPal email"
            value={email}
            onChange={handleEmailChange}
            status={errors.email ? "error" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount ($)
          </label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            status={errors.amount ? "error" : ""}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawToPaypal;
