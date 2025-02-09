"use client";
import { Button, Card, Divider, Modal, Space, Tag, Typography } from "antd";
import { BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs";
import AddSocialAccount from "./AddSocialAccount";
import { Fragment, useEffect, useState } from "react";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";

const Applications = () => {
  const { Text, Title } = Typography;
  const [socialMediaList, setSocialMediaList] = useState([
    {
      name: "",
      link: "",
    },
  ]);
  const [socialAccount, setSocialAccount] = useState<any>();
  const [itemIndex, setItemIndex] = useState<number>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (index: number) => {
    setIsModalVisible(true);
    setItemIndex(index);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const removeSocialAccount = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/socials/${socialAccount.id}`);
      if (res.status) {
        showSuccess("Social Account Removed Successfully");
        fetchAllSocials();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const fetchAllSocials = async () => {
    try {
      const res = await axiosInstance.get("/socials/my-socials");
      if (res.status) {
        setSocialMediaList(res.data.data);
        console.log("here is res ", res);
      }
    } catch (error) {
      console.log("Error fetch ing user socials", error);
      // handleAxiosError(error);
    }
  };

  const handleAddSocialAccount = async (accounts: any) => {
    // console.log("accoounts", accounts);
    try {
      setLoading(true);
      const res = await axiosInstance.post("/socials", accounts);
      if (res.status) {
        // setSocialMediaList
        showSuccess("Account Added");
        fetchAllSocials();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSocials();
  }, []);

  return (
    <Fragment>
      <Card className="border-purple-50 bg-gray-100 w-full p-3 my-5">
        <Text className="text-gray-600">
          You have authorized access to your Unifaires account for the sites and
          applications listed below. Access includes names, photo, bio, primary
          email address, public badges issued by this organization.
        </Text>
      </Card>
      <Title level={5}>Social Networks</Title>
      <Text className="text-gray-600">
        Connected third-party social apps will allow you to share earned badges
        outside of Unifaires.
      </Text>
      {socialMediaList &&
        socialMediaList.map((list, index) => (
          <div key={index}>
            {list.name !== "" && list.link !== "" && (
              <div>
                <div className="mt-8 flex justify-between sm:w-full lg:w-2/3">
                  <Space size={20}>
                    {list.name == "Facebook" ? (
                      <BsFacebook color="#205FD8" size={25} />
                    ) : list.name == "Twitter" ? (
                      <BsTwitter color="#55ACEE" size={25} />
                    ) : list.name == "LinkedIn" ? (
                      <BsLinkedin color="#0A66C2" size={25} />
                    ) : list.name == "WhatsApp" ? (
                      <BsWhatsapp color="#25D366" size={25} />
                    ) : null}
                    <Tag className="text-[#00A945] bg-[#B8F1CF] rounded-full border-none px-4 py-1">
                      Connected
                    </Tag>
                  </Space>
                  <Text
                    className="text-[#E30613] cursor-pointer py-1 px-4 rounded-full hover:bg-[#f5d9db]"
                    onClick={() => {
                      openModal(index);
                      setSocialAccount(list);
                    }}
                  >
                    Remove
                  </Text>
                </div>
                <Divider className="mt-2 sm:w-full lg:w-1/2 lg:divide-x" />
              </div>
            )}
          </div>
        ))}
      <AddSocialAccount
        socialMediaList={socialMediaList}
        loading={loading}
        handleAddSocialAccount={handleAddSocialAccount}
        setSocialMediaList={setSocialMediaList}
      />
      <Modal onCancel={closeModal} open={isModalVisible} footer={null}>
        <Typography.Paragraph>
          You are about to remove your connection from {socialAccount?.name}.{" "}
          <span className="text-red-500 mb-8">Continue</span>?
        </Typography.Paragraph>
        <div className="flex flex-row gap-4">
          <Button
            type="default"
            size="middle"
            className="flex ml-auto"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="middle"
            className="bg-red-500"
            onClick={removeSocialAccount}
            loading={loading}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Applications;
