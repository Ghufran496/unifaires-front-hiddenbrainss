"use client";
import { Modal, Typography } from "antd";
import { Fragment } from "react";
import { MdOutlineRocketLaunch } from "react-icons/md";

const ComingSoonModal = ({ comingSoon, setComingSoon }: any) => {
  const closeModal = () => {
    setComingSoon(false);
  };
  return (
    <Fragment>
      <Modal
        open={comingSoon}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <div className="flex flex-col items-center justify-center text-center lg:p-8 md:p-8 p-4">
          <MdOutlineRocketLaunch size={100} color="blue" />
          <Typography.Paragraph className="mt-4 text-lg font-semibold">
            We are working hard to bring you an amazing new feature.
          </Typography.Paragraph>
          <Typography.Paragraph className="text-gray-700 mt-2 mb-4">
            Stay tuned! It will be available very soon.
          </Typography.Paragraph>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ComingSoonModal;
