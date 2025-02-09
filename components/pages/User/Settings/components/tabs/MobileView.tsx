"use client";

import React, { Fragment, useState } from "react";
import Applications from "../Application";
import Organizations from "../Organizations";
// import Notifications from "../Notifications";
// import Privacy from "../Privacy";
import Profile from "../Profile/index";
import Address from "../Address";
import { Button, Divider, Typography } from "antd";
import ModalPart from "../Modal";

export default function MobileView() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Title, Text } = Typography;

  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Fragment>
      <Divider />
      <div>
        <Title level={4} className="pt-2 mt-4">
          Applications
        </Title>
        <Applications />
      </div>
      <Divider />
      <div>
        <Title level={4} className="pt-2 mt-4">
          Organisations
        </Title>
        <Organizations />
      </div>
      {/* <Divider />
      <div>
        <Title level={4} className="pt-2 mt-4">
          Notifications
        </Title>
        <Notifications />
      </div>
      <Divider />
      <div>
        <Title level={4} className="pt-2 mt-4">
          Privacy
        </Title>
        <Privacy />
      </div> */}
      <Divider />
      <div>
        <Profile />
      </div>
    </Fragment>
  );
}
