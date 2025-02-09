"use client";

import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import IndustrySector from "./IndustrySector";
import { useEffect, useState } from "react";
import { industry_categories } from "./IndustrySector/dummy";

interface ISector {
  name: string;
  skills: Array<string> | undefined;
}

const Organizations = ({ defaultAddress }: any) => {
  const [categoriesPicked, setCategoriesPicked] = useState<any[]>([]);
  const [skillsPicked, setSkillsPicked] = useState<any[]>([]);

  const [sectorPicked, setSectorPicked] = useState<Array<ISector>>([]);
  const [addSector, setAddSector] = useState(false);
  const { Title, Text } = Typography;
  const { data: session } = useSession();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const catList: any = categoriesPicked.map((categories) => {
      const categoryList = industry_categories.find(
        (category: any) => category.name === categories
      );
      return categoryList;
    });
    setSectorPicked([...catList]);
  }, [categoriesPicked]);

  console.log("here is the cat", sectorPicked);
  console.log("here is the skills", skillsPicked);

  const headCountOptions = [
    {
      value: "10 - 50",
      label: "10 - 50",
    },
    {
      value: "60 - 100",
      label: "60 - 100",
    },
  ];
  const countryOptions = [
    {
      value: "UK",
      label: "UK",
    },
    {
      value: "Nigeria",
      label: "Nigeria",
    },
    {
      value: "Germany",
      label: "Germany",
    },
  ];
  const stateOptions = [
    {
      value: "Kansas",
      label: "Kansas",
    },
    {
      value: "Carlifonia",
      label: "Carlifonia",
    },
  ];
  const capitalOptions = [
    {
      value: "Kansas",
      label: "Kansas",
    },
    {
      value: "Carlifonia",
      label: "Carlifonia",
    },
  ];
  const postalCodeOptions = [
    {
      value: "902101",
      label: "902101",
    },
    {
      value: "904537",
      label: "904537",
    },
  ];
  const businessTypeOptions = [
    {
      value: "Business & Enterprise",
      label: "Business & Enterprise",
    },
    {
      value: "Tech",
      label: "Tech",
    },
  ];
  const languageOptions = [
    {
      value: "English (US)",
      label: "English (US)",
    },
    {
      value: "English (UK)",
      label: "English (UK)",
    },
  ];
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const options = [
    {
      value: "Telegram",
      label: "Telegram",
    },
    {
      value: "LinkedIn",
      disabled: true,
      label: "LinkedIn",
    },
    {
      value: "WhatsApp",
      label: "WhatsApp",
    },
    {
      value: "Facebook",
      disabled: true,
      label: "Facebook",
    },
  ];
  return (
    <>
      <div className=" sm:w-full md:w-[70%]">
        <Space size={25}>
          <Avatar size={80} icon={<UserOutlined />} />
          <Typography className="my-4">
            <Title level={5}>
              {session?.user?.companyName
                ? session?.user?.companyName
                : session?.user?.fullname}
            </Title>
            <Text className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
              lobortis sagittis morbi purus in. Nulla amet, duis facilisi amet
              nibh aliquam proin. Ullamcorper egestas.
            </Text>
          </Typography>
        </Space>
        <div className="my-6">
          <Space
            direction="horizontal"
            className="flex items-start flex-wrap mb-2 gap-8"
          >
            <div>
              <Title level={5} className="text-xs text-gray-500 font-semibold">
                DEFAULT ADDRESS
              </Title>
              {defaultAddress && (
                <div className="w-full">
                  <Typography.Paragraph className="text-lg capitalize">
                    {defaultAddress[0].fullname} <br />
                    {defaultAddress[0].address} <br />
                    {defaultAddress[0].country} <br />
                  </Typography.Paragraph>
                </div>
              )}
            </div>
            <Text className="text-purple-50">Edit</Text>
          </Space>
          <Text className="text-gray-500 italic">
            (This is yor legal billing address. It can be changed from the
            settings page with necesary permission)
          </Text>
        </div>
        <Divider className="w-1/2 mb-6" />

        <Form labelCol={{ span: 24 }} layout="vertical">
          <Row gutter={[4, 24]} className="mb-0">
            <Col md={12}>
              <Form.Item label="Establishment Date ">
                <DatePicker size="large" />
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Head Count">
                <Select
                  defaultValue="10 - 50"
                  size="large"
                  onChange={handleChange}
                  options={headCountOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[4, 24]} className="mb-0">
            <Col md={6}>
              <Form.Item label="Country">
                <Select
                  size="large"
                  defaultValue="UK"
                  onChange={handleChange}
                  options={countryOptions}
                ></Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="State">
                <Select
                  size="large"
                  defaultValue="Kansas"
                  onChange={handleChange}
                  options={stateOptions}
                ></Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="City">
                <Select
                  size="large"
                  defaultValue="Kansas"
                  onChange={handleChange}
                  options={capitalOptions}
                ></Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Postal Code">
                <Select
                  size="large"
                  defaultValue="902101"
                  onChange={handleChange}
                  options={postalCodeOptions}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[4, 24]} className="mb-0">
            <Col md={12}>
              <Form.Item label="Business Type">
                <Select
                  size="large"
                  defaultValue="Business & Enterprise"
                  onChange={handleChange}
                  options={businessTypeOptions}
                ></Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="Language">
                <Select
                  size="large"
                  defaultValue="902101"
                  onChange={handleChange}
                  options={languageOptions}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="mt-8">
          <Typography.Paragraph className="p-2 bg-[#D2C5FD] font-bold uppercase">
            Skills & Expertises
          </Typography.Paragraph>
          {sectorPicked &&
            sectorPicked.map((sector: any, index: any) => {
              const eachSkills = skillsPicked.map((skill) => {
                const matchingSkills = sector.skills.filter(
                  (sectorSkill: any) => skillsPicked.includes(sectorSkill)
                );

                return matchingSkills.map((skills: any) => skills);
              });

              console.log("Here is each skills", eachSkills);

              return (
                <div key={index}>
                  <div>
                    <Typography.Paragraph className="font-semibold text-gray-500 uppercase">
                      {sector.name}
                    </Typography.Paragraph>

                    {/* <div>
                    <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                      Backend Development
                    </Tag>
                    <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                      Web Development
                    </Tag>
                    <Tag className="text-[#5832DA] bg-[#D2C5FD] rounded-full border-none px-4 py-1">
                      Cyber Security
                    </Tag>
                  </div> */}
                  </div>
                </div>
              );
            })}
        </div>

        <Space>
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 16 }}
                      align="baseline"
                    >
                      <IndustrySector
                        categoriesPicked={categoriesPicked}
                        setCategoriesPicked={setCategoriesPicked}
                        skillsPicked={skillsPicked}
                        setSkillsPicked={setSkillsPicked}
                      />
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                          setCategoriesPicked([]);
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
            <Space className="">
              {/* <Form.Item>
                <Button htmlType="button">Undo</Button>
              </Form.Item> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  // onClick={handleSaveSector}
                  size="large"
                  className="flex ml-auto rounded-sm"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Space>
      </div>
    </>
  );
};

export default Organizations;
