"use client ";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import {
  DeleteOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import IndustrySector from "./IndustrySector";
import { useEffect, useState } from "react";
import {
  businessTypeOption,
  companySizeOption,
  languageOption,
} from "@/components/Constants";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import {
  fetchSectors,
  fetchSkills,
  fetchUserProfile,
} from "@/redux/features/UserSlice";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import ImgCrop from "antd-img-crop";
import Image from "next/image";
import { RootState } from "@/redux/store";
import AddressModal from "../../Payments/components/AddressModal";
import dayjs from "dayjs";

interface ISector {
  name: string;
  skills: Array<string> | undefined;
}

const Organizations = ({ defaultAddress }: any) => {
  const { data: session, status } = useSession();
  const [form] = Form.useForm();
  const [sectorForm] = Form.useForm();
  const [bioForm] = Form.useForm();
  const dispatch: any = useAppDispatch();
  const [categoriesPicked, setCategoriesPicked] = useState<any[]>([]);
  const [sectorPicked, setSectorPicked] = useState<Array<ISector>>([]);
  const [addSector, setAddSector] = useState(false);
  const { Title, Text } = Typography;
  const userId = session?.user.id;
  const [loading, setLoading] = useState(false);
  const [industryLoading, setIndustryLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [editBio, setEditBio] = useState(false);
  const [businessIndustries, setBusinessIndustries] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchUserProfile("business"));
  }, []);

  const addressList = useAppSelector(
    (state: RootState) => state.address.addresses
  );

  const userInfo: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );

  // console.log("user info", userInfo);

  useEffect(() => {
    form.setFieldsValue({
      ...userInfo,
      establishmentDate: userInfo ? dayjs(userInfo.establishmentDate) : null,
    });
    bioForm.setFieldsValue(userInfo);
  }, [userInfo]);
  const imageUrl = userInfo && userInfo.imageUrl;

  const updateProfileImage = async (url: any) => {
    try {
      const res = await axiosInstance.put(`/business/${userId}`, {
        imageUrl: url,
      });
      if (res.status) {
        showSuccess("Profile Image Updated");
        dispatch(fetchUserProfile("business"));
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleUploadChange: UploadProps["onChange"] = async (info) => {
    try {
      const { status } = info.file;

      if (status === "uploading") {
        setImageLoading(true);
        // check if it already sent
        if (!isUploading) {
          const uploadedFile = info.file.originFileObj;

          if (uploadedFile) {
            // check if is alrady set don't set
            setIsUploading(true);
            uploadToAPI(uploadedFile).then((res) => {
              updateProfileImage(res);
              // setMediaUrl(res);
              setImageLoading(false);
              setIsUploading(false);
            });
          }
        }
      } else if (status === "error") {
        showError(`${info.file.name} file upload failed.`);
        setLoading(false);
      }
    } catch (error) {
      console.log("image uploade error", error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      showError("You can only upload JPG/PNG file!");
    }
    const isLt12M = file.size / 1024 / 1024 < 12;
    if (!isLt12M) {
      showError("Image must be smaller than 12MB!");
    }
    return isJpgOrPng && isLt12M;
  };

  async function onFinish(values: any) {
    // console.log("Form values:", values);

    // const formData = form.getFieldsValue();
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/business/${userId}`, values);
      if (response.status) {
        showSuccess("Updated Successfully");
        dispatch(fetchUserProfile("business"));
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  async function addIndustry() {
    const reqBody = sectorPicked;
    try {
      setIndustryLoading(true);
      const res = await axiosInstance.post("/users-industries", {
        industriesId: reqBody,
      });
      if (res.status) {
        showSuccess("Industry Added Successfully");
        fetchBusinessIndustry();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIndustryLoading(false);
    }
  }

  async function fetchBusinessIndustry() {
    try {
      const res = await axiosInstance.get("/users-industries/my-industries");
      if (res.status) {
        setBusinessIndustries(res.data.data);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log(error);
    }
  }

  async function deleteIndustry(id: any) {
    try {
      const res = await axiosInstance.delete(`/users-industries/${id}`);
      if (res.status) {
        showSuccess("Deleted Successfully");
        fetchBusinessIndustry();
      }
    } catch (error) {
      handleAxiosError(error);
      console.log(error);
    }
  }

  async function uppdateAbout() {
    const formData = bioForm.getFieldsValue();
    try {
      setBioLoading(true);
      const response = await axiosInstance.put(`/business/${userId}`, formData);
      if (response.status) {
        showSuccess("Updated Successfully");
        dispatch(fetchUserProfile("business"));
        setEditBio(false);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setBioLoading(false);
    }
  }

  useEffect(() => {
    dispatch(fetchSectors());
    fetchBusinessIndustry();
  }, []);

  // console.log(userInfo);

  return (
    <>
      <div className="sm:w-full md:w-[70%]">
        <div className="flex flex-col gap-6 lg:flex-row md:flex-row sm:flex-row w-full">
          <ImgCrop>
            <Upload
              listType="text"
              // className="avatar-uploader"
              className="hover:cursor-pointer flex items-center justify-center "
              beforeUpload={beforeUpload}
              showUploadList={false}
              onChange={handleUploadChange}
              onPreview={() => false}
            >
              {imageUrl ? (
                <div className="">
                  <Avatar
                    size={80}
                    icon={
                      imageLoading ? (
                        <LoadingOutlined />
                      ) : (
                        <Image
                          src={imageUrl}
                          alt="profile picture"
                          className="rounded-full justify-self-start"
                          width={80}
                          height={80}
                        />
                      )
                    }
                  />
                </div>
              ) : (
                <Avatar
                  size={80}
                  icon={imageLoading ? <LoadingOutlined /> : <UserOutlined />}
                />
              )}
            </Upload>
          </ImgCrop>
          <div className="my-4 w-full">
            <Title level={5}>
              {session?.user?.companyName
                ? session?.user?.companyName
                : session?.user?.fullname}
            </Title>
            <div>
              {!editBio ? (
                <div>
                  <Text className="text-gray-500">{userInfo?.about}</Text>
                  <Text
                    onClick={() => setEditBio(true)}
                    className="text-purple-50 hover:cursor-pointer pl-4 italic font-semibold hover:underline"
                  >
                    Edit
                  </Text>
                </div>
              ) : (
                <div className="relative w-full">
                  <Form layout="vertical" form={bioForm}>
                    <Form.Item className=" m-0 mb-1" name="about">
                      <Input.TextArea
                        rows={4}
                        placeholder="here to stay"
                        className="rounded-[3px]"
                        // maxLength={300}
                      />
                    </Form.Item>
                    <div>
                      <Button
                        className="flex ml-auto rounded-sm"
                        onClick={uppdateAbout}
                        loading={bioLoading}
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="my-6">
          <Space
            direction="horizontal"
            className="flex items-start flex-wrap mb-2 gap-8"
          >
            <div>
              <div className="flex gap-4 justify-between items-center">
                <Title
                  level={5}
                  className="m-0 text-xs text-gray-500 font-semibold"
                >
                  DEFAULT ADDRESS
                </Title>

                <Text
                  onClick={() => setAddressModal(true)}
                  className="text-purple-50 hover:cursor-pointer"
                >
                  Edit
                </Text>
              </div>
              {defaultAddress && (
                <div className="w-full">
                  <Typography.Paragraph className="m-0 font-semibold italic">
                    {defaultAddress?.fullname}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 font-semibold italic">
                    {defaultAddress?.address}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 font-semibold italic">
                    {defaultAddress?.city} - {defaultAddress?.zipcode},
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 font-semibold italic">
                    {defaultAddress?.country}
                  </Typography.Paragraph>
                </div>
              )}
            </div>
          </Space>
          <Text className="text-gray-500 italic">
            (This is yor legal billing address. It can be changed from the
            settings page with necesary permission)
          </Text>
        </div>
        <Divider className="w-1/2 mb-6" />

        <Form
          labelCol={{ span: 24 }}
          layout="vertical"
          form={form}
          name="organisation_form"
          onFinish={onFinish}
        >
          <Row gutter={[4, 24]} className="mb-0">
            <Col md={12}>
              <Form.Item label="Establishment Date" name="establishmentDate">
                <DatePicker size="large" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Company Size" name="companySize">
                <Select
                  defaultValue="10 - 50"
                  size="large"
                  options={companySizeOption}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[4, 24]} className="mb-0">
            <Col md={12}>
              <Form.Item label="Business Type" name="businessType">
                <Select
                  size="large"
                  // defaultValue="Select Bu"
                  showSearch
                  options={businessTypeOption}
                ></Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Language" name="language">
                <Select
                  size="large"
                  showSearch
                  // defaultValue="902101"
                  placeholder="Select Language"
                  options={languageOption}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="mb-6 max-h-[300px] overflow-y-scroll custom-scrollbar">
            <h2 className="text-[1.25rem] font-semibold leading-none mb-[15px]">
              Industry & Sectors
            </h2>
            <div className="flex gap-2 flex-wrap ">
              {businessIndustries &&
                businessIndustries.map((industry: any) => {
                  const myIndustry = industry.industry;
                  return (
                    <Tag
                      key={industry.id}
                      className="flex items-center gap-2 text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-2 mb-2"
                    >
                      {myIndustry.name}
                      <DeleteOutlined
                        onClick={() => deleteIndustry(industry.id)}
                        className="hover:cursor-pointer text-base hover:font-extrabold hover:text-red-700 font-bold"
                      />
                    </Tag>
                  );
                })}
            </div>
            {businessIndustries.length < 1 && (
              <Typography.Paragraph className="text-center text-lg text-[#5832DA] py-4 font-bold">
                No Sector
              </Typography.Paragraph>
            )}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="flex ml-auto rounded-sm"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
        {/* {sectorPicked &&
          sectorPicked.map((sector: any, index: any) => (
            <div key={index}>
              <Typography.Paragraph>Hello</Typography.Paragraph>
            </div>
          ))} */}
      </div>

      <Form layout="vertical" form={sectorForm}>
        <Form.List name="sectors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 16 }}
                  align="baseline"
                >
                  <IndustrySector
                    sectorPicked={sectorPicked}
                    setSectorPicked={setSectorPicked}
                    categoriesPicked={categoriesPicked}
                    setCategoriesPicked={setCategoriesPicked}
                  />
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(name);
                      setCategoriesPicked([]);
                      setSectorPicked([]);
                      setAddSector(false);
                    }}
                  />
                </Space>
              ))}
              {!addSector && (
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      add();
                      setAddSector(true);
                    }}
                    // block
                    className="text-purple-50 mt-8 bg-purple-60 p-6 pb-12 rounded-lg"
                    icon={
                      <PlusOutlined
                        style={{ color: "#5832DA" }}
                        className="rounded-full p-2 bg-purple-60"
                      />
                    }
                  >
                    Add Industry Sector
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            loading={industryLoading}
            onClick={addIndustry}
            className="rounded-sm"
          >
            Save Industry
          </Button>
        </Form.Item>
      </Form>

      <AddressModal
        addressModal={addressModal}
        setAddressModal={setAddressModal}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        addressList={addressList}
      />
    </>
  );
};

export default Organizations;
