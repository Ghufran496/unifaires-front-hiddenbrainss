"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import {
  Card,
  Form,
  Button,
  Typography,
  Input,
  Divider,
  Upload,
  Space,
  Checkbox,
  Select,
  UploadProps,
} from "antd";
import {
  SafetyCertificateOutlined,
  FileImageOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Container from "@/components/shared/container";
import PreviewCertificate from "./CertificatePreview";
import {
  handleAxiosError,
  showError,
  showSuccess,
} from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { useParams, useRouter } from "next/navigation";
import { uploadToAPI } from "@/app/utils/mediaUpload";
import Image from "next/image";
// app components

const CreateCertificateForm = () => {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const courseId = params.CourseId;
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [certificateTemplates, setCertificateTemplates] = useState<any>(null);
  const [certificateForm, setCertificateForm] = useState(false);
  const [certiifcateLanding, setCertificateLanding] = useState(true);
  const [previewCertificate, setPreviewCertificate] = useState(false);
  const [templateType, setTemplateType] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showVerifyUrl, setShowVerifyUrl] = useState(false);
  const [showIssues, sethShowIssues] = useState(false);

  const handleCertificateForm = () => {
    setCertificateForm(true);
    setCertificateLanding(false);
  };

  const handleTemplateType = (value: any) => {
    setTemplateType(value);
    console.log("I selected", value);
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    setImageLoading(true);

    const { status } = info.file;

    if (status === "uploading") {
      // check if it already sent
      if (!isUploading) {
        const uploadedFile = info.file.originFileObj;

        if (uploadedFile) {
          // check if is alrady set don't set
          setIsUploading(true);
          uploadToAPI(uploadedFile).then((res) => {
            setImageUrl(res);
            setImageLoading(false);
            setIsUploading(false);
          });
        }
      }
    } else if (status === "error") {
      showError("Unable to upload image");
      setImageLoading(false);
    }
  };

  const handleLogoChange: UploadProps["onChange"] = async (info) => {
    setImageLoading(true);

    const { status } = info.file;

    if (status === "uploading") {
      // check if it already sent
      if (!isUploading) {
        const uploadedFile = info.file.originFileObj;

        if (uploadedFile) {
          // check if is alrady set don't set
          setIsUploading(true);
          uploadToAPI(uploadedFile).then((res) => {
            setLogoUrl(res);
            setImageLoading(false);
            setIsUploading(false);
          });
        }
      }
    } else if (status === "error") {
      showError("Unable to upload image");
      setImageLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleCheckboxSelect = (e: any) => {
    const checkboxName = e.target.name;
    const value = e.target.checked;
    if (checkboxName === "QRCode") {
      setShowQRCode(value);
    } else if (checkboxName === "badge") {
      setShowBadge(value);
    } else if (checkboxName === "showIssues") {
      sethShowIssues(value);
    } else if (checkboxName === "verify") {
      setShowVerifyUrl(value);
    }
  };

  const handleSaveTemplate = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    const metaData: any = {
      ...formData,
      showQRCode: showQRCode,
      showBadge: showBadge,
      showIssues: showIssues,
      showVerifyUrl: showVerifyUrl,
    };
    if (imageUrl) {
      metaData.signature = imageUrl;
    } else if (logoUrl) {
      metaData.logo = logoUrl;
    }
    const metaString = JSON.stringify(metaData);
    try {
      setLoading(true);
      const res = await axiosInstance.post("/course-certificate", {
        certificateType: templateType,
        courseId: courseId,
        meta: metaData,
      });
      if (res.status) {
        showSuccess("Template Saved");
        setCertificateForm(false);
        setCertificateLanding(true);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificate = async () => {
    try {
      const res = await axiosInstance.get(
        `/course-certificate/course/${courseId}`
      );
      if (res.status) {
        setCertificateTemplates(res.data.data);
        // console.log("here is certificate res", res);
      }
    } catch (error) {
      // handleAxiosError(error);
      console.log("unable to fetch templates", error);
    }
  };

  const handleDeleteCertificate = async () => {
    try {
      const res = await axiosInstance.delete(
        `/course-certificate/${certificateTemplates.id}`
      );
      if (res.status) {
        showSuccess("Certificate Deleted Successfully");
        fetchCertificate();
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("unable to delete templates", error);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, []);

  return (
    <Fragment>
      <Container>
        {certiifcateLanding && (
          <div>
            <div className="mb-6">
              <Typography.Title level={3}>
                Issue Certificate on Successful Completion.
              </Typography.Title>
              <Typography.Paragraph>
                Select the template you would like to use or create a new one.
              </Typography.Paragraph>
              {certificateTemplates !== null ? (
                <div className="border-2 rounded-md p-2 max-w-[300px] hover:border-blue-600">
                  <Typography.Paragraph className="text-base capitalize mb-1 ">
                    Certificate Type:{" "}
                    <span className="capitalize text-gray-700 italic font-bold">
                      {certificateTemplates.certificateType}
                    </span>
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-base capitalize mb-1">
                    show QR Code:{" "}
                    <span className="capitalize text-gray-700 italic font-bold">
                      {`${JSON.parse(certificateTemplates.meta).showQRCode}`}
                    </span>
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-base capitalize mb-1">
                    show Badge:{" "}
                    <span className="capitalize text-gray-700 italic font-bold">
                      {`${JSON.parse(certificateTemplates.meta).showBadge}`}
                    </span>
                  </Typography.Paragraph>
                  <Typography.Paragraph className="text-base capitalize mb-1">
                    show Issued Date:{" "}
                    <span className="capitalize text-gray-700 italic font-bold">
                      {`${JSON.parse(certificateTemplates.meta).showIssues}`}
                    </span>
                  </Typography.Paragraph>
                  <div className="flex ml-auto">
                    <Button
                      icon={<DeleteOutlined className="text-red-800" />}
                      size="middle"
                      className="flex ml-auto items-center justify-center"
                      onClick={handleDeleteCertificate}
                    />
                  </div>
                </div>
              ) : (
                <Button
                  className="rounded"
                  type="primary"
                  onClick={handleCertificateForm}
                >
                  Create New Template
                </Button>
              )}
            </div>
            <div className="bg-gray-200 p-8 flex items-center justify-center rounded-md">
              <SafetyCertificateOutlined
                style={{
                  fontSize: "6em",
                  color: "purple",
                }}
              />
            </div>
          </div>
        )}
        {certificateForm && (
          <Card title="Create Template Certificate" style={{ width: "100%" }}>
            <div>
              <div>
                <Typography.Title level={5}>
                  Template Information
                </Typography.Title>
                <Form.Item
                  name="templateType"
                  label="Template Type"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Template Name",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Template type"
                    size="large"
                    onChange={handleTemplateType}
                    options={[
                      {
                        label: "Certificate",
                        value: "certificate",
                      },
                      {
                        label: "Letter of Recommendation ",
                        value: "recommendation",
                      },
                    ]}
                  />
                </Form.Item>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <Typography.Paragraph>Signature</Typography.Paragraph>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      style={{ width: "150px", height: "45px" }}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt="image"
                          width={100}
                          height={100}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <div>
                    <Typography.Paragraph>
                      Organisation Logo
                    </Typography.Paragraph>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      style={{ width: "150px", height: "45px" }}
                      onChange={handleLogoChange}
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt="image"
                          width={100}
                          height={100}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                </div>
              </div>
              <Divider />
              <Form layout="vertical" size="large" form={form}>
                <Typography.Title level={5}>Certificate text</Typography.Title>

                <Form.Item
                  name="signatoryName"
                  label="Field 1"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Signatory Name",
                    },
                  ]}
                >
                  <Input placeholder="Signatory Name" />
                </Form.Item>
                <Form.Item
                  name="signatoryPostion"
                  label="Field 2"
                  rules={[
                    {
                      required: true,
                      message: "Please enter signatory position",
                    },
                  ]}
                >
                  <Input placeholder="Signatory Position" />
                </Form.Item>
              </Form>
              <Divider />
              <div>
                {/* <Typography.Title level={5}>
                  Certificate Information
                </Typography.Title>
                <Form.Item
                  name="certificateFont"
                  label="Information Font"
                  rules={[
                    {
                      required: true,
                      message: "Please select font",
                    },
                  ]}
                >
                  <Input placeholder="Montserrat" />
                </Form.Item> */}
                <div className="flex flex-col">
                  <Space direction="vertical" size={12}>
                    <div>
                      <Checkbox
                        name="QRCode"
                        onChange={(e) => handleCheckboxSelect(e)}
                      >
                        Show QR Code
                      </Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div>
                    <div>
                      <Checkbox
                        onChange={(e) => handleCheckboxSelect(e)}
                        name="badge"
                      >
                        Show Badge
                      </Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div>
                    {/* <div>
                      <Checkbox>Show Credits</Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div>
                    <div>
                      <Checkbox>Show Score</Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div> */}
                    <div>
                      <Checkbox
                        onChange={(e) => handleCheckboxSelect(e)}
                        name="showIssues"
                      >
                        Show Issues And/Or Expiration Dates
                      </Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div>
                    {/* <div>
                      <Checkbox>Show Certificate Number</Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div> */}
                    <div>
                      <Checkbox
                        onChange={(e) => handleCheckboxSelect(e)}
                        name="verify"
                      >
                        Show Verify URL
                      </Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div>
                    {/* <div>
                      <Checkbox>Show Signup Fields</Checkbox>
                      <Typography.Paragraph className="text-xs text-gray-400 ml-6 italic ">
                        Show QR code linking to the certificate verification
                        page
                      </Typography.Paragraph>
                    </div> */}
                  </Space>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4 ">
              <Button
                type="primary"
                icon={<EyeInvisibleOutlined />}
                className="flex ml-auto items-center justify-center"
                onClick={() => setPreviewCertificate(true)}
              >
                Preview Template
              </Button>
              <Button
                type="primary"
                loading={loading}
                onClick={handleSaveTemplate}
              >
                Save Template
              </Button>
            </div>
          </Card>
        )}
      </Container>
      <PreviewCertificate
        templateType={templateType}
        previewCertificate={previewCertificate}
        setPreviewCertificate={setPreviewCertificate}
      />
    </Fragment>
  );
};

export default CreateCertificateForm;
