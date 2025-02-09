"use client";
import { useState } from "react";
import {
  Divider,
  Row,
  Space,
  Tag,
  Typography,
  Pagination,
  PaginationProps,
  Button,
  Modal,
} from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Show, Work } from "react-iconly";
import { BsEnvelope, BsTrash, BsTrash2 } from "react-icons/bs";
import { TbPhoneCall, TbTrash } from "react-icons/tb";
import { TalentRequestInfo } from "../talentrequestinfo";

const TalentRequest = () => {
  const { Title } = Typography;
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const params = useParams();
  const { talentId } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <Link href="#">Previous</Link>;
    }
    if (type === "next") {
      return <Link href="#">Next</Link>;
    }
    return originalElement;
  };
  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataItems = TalentRequestInfo.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage - 1);
  };
  return (
    <>
      <Space direction="horizontal" className="flex justify-between mb-10">
        <Title className="text-xl font-bold leading-6 " level={5}>
          Talent Description
        </Title>
        <Title className="text-xl font-bold leading-6 " level={5}>
          Action
        </Title>
      </Space>
      {dataItems.map((talent, index) => (
        <div key={index}>
          {
            <div className="flex justify-between">
              <div className=" ">
                <Title
                  level={5}
                  className="text-base mt-6  font-semibold leading-[19.2px] "
                >
                  {talent.title}
                </Title>
                <Row className="">
                  <Title
                    className="text-2xl   font-semibold leading-[28.8px] "
                    level={5}
                  >
                    {talent.name}
                    <Tag className="bg-[#d1c4fc]  text-purple-50 mt-0 text-[13px] leading-[15.6px] px-4 py-2 rounded-full font-semibold ml-4">
                      {talent.button}
                    </Tag>
                  </Title>
                </Row>

                <div className="flex ">
                  <Title
                    level={5}
                    className="text-base  font-semibold leading-[19.2px] flex"
                  >
                    <TbPhoneCall color="gray" size={16} />
                    <div className="ml-4"> {talent.number}</div>
                  </Title>
                  <Title
                    level={5}
                    className="text-base ml-5 flex gap-3  font-semibold leading-[19.2px] mt-0"
                  >
                    <BsEnvelope color="gray" size={16} />

                    <div className=""> {talent.email}</div>
                  </Title>
                </div>
                <div className="flex mt-6 ">
                  <Title
                    level={5}
                    className="text-base font-semibold leading-[19.2px] flex"
                  >
                    <Work set="light" primaryColor="gray" size={16} />
                    <div className="ml-4">&nbsp;{talent.occupation} &nbsp;</div>
                  </Title>
                  <Title
                    level={5}
                    className="text-base flex gap-3  font-semibold leading-[19.2px] italic text-gray-500 mt-0"
                  >
                    &#x2022; &nbsp; {talent.place} &#x2022; &nbsp;{" "}
                    {talent.experience}
                  </Title>
                </div>
                <Title
                  level={5}
                  className="text-base mt-6  font-semibold leading-[19.2px] flex"
                >
                  <Calendar set="light" primaryColor="gray" size={16} />
                  <div className="ml-4">{talent.date}</div>
                </Title>
              </div>
              <Space className="gap-6">
                <Link href={`/user/vetted-talent-program/${talentId}`}>
                  <span className="cursor-pointer">
                    <Show set="light" primaryColor="gray" size={20} />
                  </span>
                </Link>
                <span className="cursor-pointer">
                  <BsTrash onClick={showModal} color="red" size={20} />
                </span>
              </Space>
            </div>
          }
          <Divider className="border" />
        </div>
      ))}

      <>
        <Modal
          title=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className=""
          footer={null}
        >
          <div className="flex flex-col pb-10 pt-10 items-center justify-center">
            <p className="mb-6">
              <TbTrash size={114} color="grey" />
            </p>
            <p className="text-xl font-bold mb-6 leading-6 text-center">
              Are you sure you want to delete the talent?
            </p>
            <div className="flex gap-6 mt-6">
              <Button
                onClick={handleCancel}
                size="large"
                className="border-2 text-base font-bold  px-10  text-center"
              >
                Cancel
              </Button>
              <Button
                size="large"
                className="bg-red-500 text-white  px-10 text-base font-bold text-center"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </>

      <Pagination
        total={TalentRequestInfo.length}
        pageSize={itemsPerPage}
        itemRender={itemRender}
        className="text-center mt-16"
        onChange={handlePageChange}
      />
    </>
  );
};

export default TalentRequest;
