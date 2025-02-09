"use client";
import config from "@/app/utils/config";
import { Modal, Typography, Divider } from "antd";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserInt } from "@/app/utils/interface";

interface helpDetailsProp {
  adminModal: boolean;
  setAdminModal: (isOpen: boolean) => void;
  userId: number | undefined;
}

const AdminDetails = ({
  userId,
  adminModal,
  setAdminModal,
}: helpDetailsProp) => {
  const { data: session, status } = useSession();
  const [details, setDetails] = useState<UserInt>();

  const fetchDetails = async () => {
    await axios
      .get(`${config.API.API_URL}/users/${userId}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        setDetails(res.data.data);
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const closeModal = () => {
    setAdminModal(!adminModal);
  };

  return (
    <Modal
      open={adminModal}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
    >
      <Typography.Paragraph className="font-bold text-[1.5em] pl-4 m-0">
        Details
      </Typography.Paragraph>
      <Divider />
      <div className="mt-4 pl-4">
        <div>
          <Typography.Paragraph className="mb-0 italic text-sm">
            Name:
          </Typography.Paragraph>
          <Typography.Paragraph className="text-lg font-semibold">
            {details?.fullname}
          </Typography.Paragraph>
        </div>
        <div>
          <Typography.Paragraph className="mb-0 italic text-sm">
            Email:
          </Typography.Paragraph>
          <Typography.Paragraph className="text-lg font-semibold">
            {details?.email}
          </Typography.Paragraph>
        </div>
        <div>
          <Typography.Paragraph className="mb-0 italic text-sm">
            Gender:
          </Typography.Paragraph>
          <Typography.Paragraph className="text-lg font-semibold">
            {details?.gender}
          </Typography.Paragraph>
        </div>
      </div>
    </Modal>
  );
};

export default AdminDetails;
