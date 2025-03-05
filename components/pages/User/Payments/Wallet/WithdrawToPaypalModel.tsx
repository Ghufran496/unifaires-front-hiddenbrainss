"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";

interface WithdrawToPaypalProps {
  setIsModalOpen: (open: boolean) => void;
}

const WithdrawToPaypal = ({ setIsModalOpen }: WithdrawToPaypalProps) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({ email: "", amount: "" });
  const [balanceError, setBalanceError] = useState("");
  const [paypalFee, setPaypalFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (!session?.user?.id) return;

      try {
        setIsLoading(true);
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
          setUserBalance(
            response?.data?.data?.balance >= 0
              ? response?.data?.data?.balance
              : 0
          );
          console.log("User balance fetched", response.data.data.balance);
        } else {
          console.error("Failed to fetch user balance", response.data.message);
          setUserBalance(0);
        }
      } catch (error) {
        console.error("Error fetching user balance:", error);
        setUserBalance(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBalance();
  }, [session]);

  const calculatePaypalFee = (amount: number) => {
    return amount * 0.025; // 2.5% PayPal fee
  };

  const calculateUniFairsFee = (amount: number) => {
    return amount * 0.005; // 0.5% UniFairs fee
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAmount = (amount: string) => {
    if (!(/^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) > 0)) {
      return false;
    }

    // Check if amount exceeds user balance
    const amountValue = parseFloat(amount);
    const fee = calculatePaypalFee(amountValue);
    return amountValue + fee <= userBalance;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(e.target.value) ? "" : "Invalid email address",
    }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);

    // First check basic format
    const isValidFormat =
      /^\d+(\.\d{1,2})?$/.test(newAmount) && parseFloat(newAmount) > 0;

    if (!isValidFormat) {
      setErrors((prev) => ({ ...prev, amount: "Enter a valid amount" }));
      setBalanceError("");
      setPaypalFee(0);
      setTotalAmount(0);
      return;
    }

    setErrors((prev) => ({ ...prev, amount: "" }));

    // Calculate PayPal fee and UniFairs fee
    const amountValue = parseFloat(newAmount);
    const paypalFeeAmount = calculatePaypalFee(amountValue);
    const uniFairsFeeAmount = calculateUniFairsFee(amountValue);
    const totalFee = paypalFeeAmount + uniFairsFeeAmount;

    setPaypalFee(totalFee);
    setTotalAmount(amountValue);

    // Then check against balance
    if (amountValue > userBalance) {
      setBalanceError(
        `You cannot withdraw more than your available balance (${Number(
          userBalance
        ).toFixed(2)})`
      );
    } else {
      setBalanceError("");
    }
  };

  // Check if button should be disabled
  const isValidEmail = validateEmail(email);
  const isValidAmountFormat =
    amount && /^\d+(\.\d{1,2})?$/.test(amount) && parseFloat(amount) > 0;
  const isAmountWithinBalance =
    isValidAmountFormat && totalAmount <= userBalance;
  const isButtonDisabled =
    !isValidEmail ||
    !isValidAmountFormat ||
    !isAmountWithinBalance ||
    userBalance <= 0 ||
    isLoading;

  const handleWithdrawPaypapal = async () => {
    // Check if user has sufficient balance
    if (userBalance <= 0) {
      setBalanceError("You don't have any funds to withdraw.");
      return;
    }

    if (totalAmount > userBalance) {
      setBalanceError(
        `You cannot withdraw more than your available balance ($${Number(
          userBalance || 0
        ).toFixed(2)})`
      );
      return;
    }

    const paypalFee = Number(calculatePaypalFee(Number(amount)).toFixed(2));
    const uniFairsFee = Number(calculateUniFairsFee(Number(amount)).toFixed(2));
    const amountToBeReceived = totalAmount - paypalFee - uniFairsFee;

    const payload = {
      amount: amountToBeReceived,
      userId: session?.user.id,
      paypalEmail: email,
      amounttobededucted: totalAmount,
    };

    console.log(payload);
    try {
      const response = await axios.post(
        `${config.API.API_URL}/paypal/withdraw`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        }
      );

      if (response.status === 200) {
        message.success("Withdraw success to the provided gmail account.");
        location.reload();
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
        {isLoading ? (
          <div className="text-center py-4">
            <p>Loading your balance...</p>
          </div>
        ) : (
          <>
            {userBalance <= 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                You don't have any funds available to withdraw.
              </div>
            )}

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
                status={errors.amount || balanceError ? "error" : ""}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
              {balanceError && (
                <p className="text-red-500 text-sm">{balanceError}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Available balance: ${Number(userBalance || 0).toFixed(2)}
              </p>

              {/* Display PayPal and UniFairs fees */}
              {isValidAmountFormat && (
                <div className="mt-3 space-y-3">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-white mb-2">
                      <span className="font-medium">Withdrawal Summary:</span>
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-white">
                        Withdrawal Amount: ${Number(amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-white">
                        PayPal Fee (2.5%): $
                        {calculatePaypalFee(Number(amount)).toFixed(2)}
                      </p>
                      <p className="text-sm text-white">
                        UniFairs Fee (0.5%): $
                        {calculateUniFairsFee(Number(amount)).toFixed(2)}
                      </p>
                      <p className="text-sm font-medium text-white border-t border-gray-200 pt-1 mt-1">
                        You will receive: $
                        {(
                          Number(amount) -
                          calculatePaypalFee(Number(amount)) -
                          calculateUniFairsFee(Number(amount))
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default WithdrawToPaypal;
