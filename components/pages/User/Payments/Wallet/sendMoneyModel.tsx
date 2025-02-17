import { Modal, Button, Typography, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
interface SendMoneyModalProps {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: (isOpen: boolean) => void;
  ModalContent: any;
}

const SendMoneyModal = ({
  isOpenPaymentModal,
  setIsOpenPaymentModal,
  ModalContent,
}: SendMoneyModalProps) => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const userId = session?.user.id;
  const handleYesClick = () => {
    // Handle the logic for sending money
    console.log("Money sent");
    setIsOpenPaymentModal(false);
  };
  console.log(ModalContent);

  const handleNoClick = () => {
    setIsOpenPaymentModal(false);
  };

  const handlePaymentGateway = async () => {
    const payload = {
      userId: userId,
      email: ModalContent.email,
      amount: ModalContent.amount,
    };

    console.log("Payment payload:", payload);
    try {
      const response = await axios.put(
        `${config.API.API_URL}/users/send-balance-by-email`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token, // Send auth token if needed
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error initiating payment:", error);
      message.error("Payment initiation failed. Please try again.");
    }
  };
  useEffect(() => {
    if (!isOpenPaymentModal) {
      sessionUpdate(); // Refresh session data when modal is closed
    }
  }, [isOpenPaymentModal, sessionUpdate]);
  useEffect(() => {
    if (!isOpenPaymentModal) {
      sessionUpdate(); // Refresh session data when modal is closed
    }
  }, [isOpenPaymentModal, sessionUpdate]);

  return (
    <Modal
      title={
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          Confirm Action
        </span>
      }
      visible={isOpenPaymentModal}
      onCancel={() => setIsOpenPaymentModal(false)}
      footer={null}
      width={600}
    >
      <div className="space-y-4">
        <Typography.Title level={4} className="text-center">
          Are you sure you want to send Money?
        </Typography.Title>
        <div className="flex justify-center space-x-4">
          <Button
            type="primary"
            className="bg-purple-600 text-white"
            onClick={handlePaymentGateway}
          >
            Yes
          </Button>
          <Button type="default" onClick={handleNoClick}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SendMoneyModal;
