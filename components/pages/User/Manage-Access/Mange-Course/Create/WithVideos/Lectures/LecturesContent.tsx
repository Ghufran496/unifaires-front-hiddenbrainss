"use client";
import { useState, useContext, Fragment } from "react";
import {
  Form,
  Input,
  Button,
  Menu,
  Typography,
  Upload,
  message,
  Card,
  Col,
  Row,
  Space,
  UploadProps,
} from "antd";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import {
  PlusOutlined,
  DeleteOutlined,
  CloseOutlined,
  InboxOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { CourseContext } from "../../CourseContext";
import { LectureInt } from "../../../course.interface";
import axios from "axios";
import { All_EXT, File_EXT, Video_EXT } from "@/components/Constants";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import katex from "katex";
import "katex/dist/katex.min.css";
if (typeof window !== "undefined") {
  window.katex = katex;
}
import "react-quill/dist/quill.snow.css";
import quillModules from "@/components/shared/QuillTextEditor/QuillTextEditorModule";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface ILecture {
  lecture: LectureInt;
}

const Lectures = ({ lecture }: ILecture) => {
  const { data: session, status } = useSession();
  const { fetchCourseData } = useContext(CourseContext);
  const [form] = Form.useForm();
  const [contentTitle] = Form.useForm();
  const [resourcesTitle] = Form.useForm();
  const [articleContentData] = Form.useForm();
  const [menu, setMenu] = useState(true);
  const [contentMenu, setContentMenu] = useState(false);
  const [content, setContent] = useState(false);
  const [description, setDescription] = useState(false);
  const [resources, setResources] = useState(false);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("downloadableResources");
  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };
  const [articleContent, setArticleContent] = useState(false);

  const tabList = [
    {
      key: "downloadableResources",
      tab: "Downloadable Resources",
    },
    // {
    //   key: "library",
    //   tab: "Add from Library",
    // },
    // {
    //   key: "externalResources",
    //   tab: "External Resources",
    // },
  ];

  const fileProps: UploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      const { status } = info.file;

      console.log(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "uploading") {
        if (!isUploading) {
          const uploadedFile = info.file.originFileObj;
          if (uploadedFile) {
            uploadToAPI(uploadedFile);
            setIsUploading(true);
          }
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadLectureResources = async () => {
    const formData = resourcesTitle.getFieldsValue();
    await formData;
    setLoading(true);
    await axiosInstance
      .post("/lecture-resources", {
        mediaUri: url,
        lectureId: lecture.id,
        title: formData.title,
        // meta: [{ type: "video" }],
      })
      .then((res) => {
        if (res.status) {
          showSuccess("Successfully added Lecture Resources");
          contentTitle.resetFields();
          handleClose();
          fetchCourseData();
        }
      })
      .catch((error) => {
        handleAxiosError(error);
      });

    setLoading(false);
  };

  const handleDeleteResources = async (id: number) => {
    try {
      const res = await axiosInstance.delete(`/lecture-resources/${id}`);

      if (res.status) {
        showSuccess("Deleted Successfully");
        fetchCourseData();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  const contentList: Record<string, React.ReactNode> = {
    downloadableResources: (
      <div className="p-2">
        {lecture?.lectureresources?.length > 0 &&
          lecture?.lectureresources?.map((resources) => {
            return (
              <div
                key={resources.id}
                className="flex flex-row bg-gray-200 cursor-pointer text-sm rounded-md my-4 p-2"
              >
                <li className="text-sm italics pl-2">{resources.title}</li>
                <div className="flex items-center ml-2 justify-start">
                  {/* <Button
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<EditOutlined />}
                    // onClick={() => handleEditQuiz(quiz)}
                  /> */}
                  <Button
                    danger
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    className="flex items-center justify-center mr-2"
                    onClick={() => handleDeleteResources(resources.id)}
                  />
                </div>
              </div>
            );
          })}
        <Form layout="vertical" size="large" form={resourcesTitle}>
          <Form.Item required label="Title" name="title">
            <Input placeholder="Enter the title of the Uploaded Content" />
          </Form.Item>
        </Form>
        <div className="flex justify-between">
          <Upload {...fileProps}>
            <Button icon={<UploadOutlined />} size="large">
              Click to Upload
            </Button>
          </Upload>
          <Button
            className="flex justify-center items-center mt-2 ml-auto"
            type="primary"
            size="large"
            onClick={uploadLectureResources}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    ),
    // library: <p>content2</p>,
    externalResources: (
      <div>
        <Form layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please enter a title",
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                message: "Please enter a URL",
              },
            ]}
          >
            <Input placeholder="Link to Resources" />
            <Button
              className="flex justify-center items-center mt-4 ml-auto"
              type="primary"
              size="large"
              //   icon={<PlusOutlined />}
            >
              Add link
            </Button>
          </Form.Item>
        </Form>
      </div>
    ),
  };

  const props: UploadProps = {
    multiple: true,
    listType: "picture",
    className: "my-4",
    onChange(info) {
      const { status } = info.file;

      console.log(status);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "uploading") {
        if (!isUploading) {
          const uploadedFile = info.file.originFileObj;
          if (uploadedFile) {
            uploadToAPI(uploadedFile);
            setIsUploading(true);

            console.log(isUploading);
          }
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const videoUploadProps: UploadProps = {
    ...props,
    name: "video",
    accept: All_EXT,
  };

  const uploadToAPI = async (file: File) => {
    const formData = new FormData();
    formData.append("media", file);
    setButtonDisabled(true);
    try {
      if (status === "authenticated" && session?.user?.token) {
        const imgRes = await fetch(`${config.API.API_URL}/media`, {
          method: "POST",
          body: formData,
          headers: {
            "x-token": session?.user?.token,
          },
        });
        if (imgRes.ok) {
          const res = await imgRes.json();
          setIsUploading(false);
          setUrl(res?.data?.url);
          message.success("Upload Succesful");
        } else {
          message.error("Upload failed.");
        }
      }
    } catch (error) {
      message.error("Upload Failed, try again.");
    }
    setButtonDisabled(false);
  };

  const handleContentMenu = () => {
    setContentMenu(true);
    setMenu(false);
    setDescription(false);
    setResources(false);
    setContent(false);
    setArticleContent(false);
  };
  const handleVideoContent = () => {
    setContentMenu(false);
    setMenu(false);
    setDescription(false);
    setResources(false);
    setArticleContent(false);
    setContent(true);
  };

  const handleArticleContent = () => {
    setContentMenu(false);
    setMenu(false);
    setDescription(false);
    setResources(false);
    setContent(false);
    setArticleContent(true);
  };

  const handleDescription = () => {
    setContentMenu(false);
    setMenu(false);
    setDescription(true);
    setResources(false);
  };
  const handleClose = () => {
    setContentMenu(false);
    setDescription(false);
    setResources(false);
    setContent(false);
    setMenu(true);
    setArticleContent(false);
  };

  const uploadLectureContent = async () => {
    const formData = contentTitle.getFieldsValue();
    setLoading(true);
    await axiosInstance
      .post("/lecture-content", {
        mediaUri: url,
        lectureId: lecture.id,
        title: formData.title,
        // meta: [{ type: "video" }],
      })
      .then((res) => {
        if (res.status) {
          message.success("Successfully added Lecture Content");
          console.log(res.data);
          contentTitle.resetFields();
          handleClose();
          fetchCourseData();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          message.error(errorMessage);
          toast.error(errorMessage);
        } else {
          message.error("Unable to add Content. Check Network");
        }
        console.log(error);
        console.log(error);
      });

    setLoading(false);
  };

  const handleSaveDescription = async () => {
    // await form.validateFields();
    const formData = form.getFieldsValue();
    setLoading(true);
    try {
      if (status === "authenticated" && session?.user?.token) {
        const res = await fetch(`${config.API.API_URL}/lecture/${lecture.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const data = await res.json();
          message.success("Description Added");
          handleClose();
          fetchCourseData();
        }
      }
    } catch (error) {
      message.error("Fill Required Field. And try again");
    }
    setLoading(false);
  };

  const handleResources = () => {
    setContentMenu(false);
    setMenu(false);
    setDescription(false);
    setResources(true);
  };

  const handleDeleteContent = async (id: number) => {
    try {
      const res = await axiosInstance.delete(`/lecture-content/${id}`);

      if (res.status) {
        showSuccess("Deleted Successfully");
        fetchCourseData();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleSaveArticle = async () => {
    const formData = articleContentData.getFieldsValue();
    console.log(formData);
    try {
      setLoading(true);
      const res = await axiosInstance.post("/lecture-article", {
        lectureId: lecture.id,
        ...formData,
      });
      if (res.status) {
        showSuccess("Article Uploaded");
        handleClose();
        fetchCourseData();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      const res = await axiosInstance.delete(`/lecture-article/${id}`);

      if (res.status) {
        showSuccess("Deleted Successfully");
        fetchCourseData();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleEditArticle = (article: any) => {
    // console.log(article);
    handleArticleContent();
    articleContentData.setFieldsValue(article);
    // handleDeleteArticle(article.id);
  };

  // console.log(lecture);

  return (
    <Fragment>
      <div>
        {menu && (
          <Menu
            mode="horizontal"
            className="flex flex-row border-none bg-white rounded-md mb-2 text-blue-400 border-2"
          >
            <Menu.Item>
              <Button
                type="default"
                icon={<PlusOutlined />}
                size="large"
                className="pr-4"
                onClick={handleContentMenu}
              >
                Content
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                type="default"
                icon={<PlusOutlined />}
                size="large"
                className="pr-4"
                onClick={handleDescription}
              >
                Description
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                type="default"
                icon={<PlusOutlined />}
                size="large"
                className="pr-4"
                onClick={handleResources}
              >
                Resources
              </Button>
            </Menu.Item>
          </Menu>
        )}
        {contentMenu && (
          <div>
            <Button
              size="small"
              type="default"
              icon={<CloseOutlined />}
              className="border-none rounded-md flex ml-auto items-center justify-center"
              onClick={handleClose}
            />
            <Row gutter={[16, 16]} className="flex justify-center p-6">
              <Col xs={24} sm={10} lg={6}>
                <Card
                  hoverable
                  className="h-full text-center rounded-lg bg-gray-100"
                  onClick={handleVideoContent}
                >
                  <VideoCameraOutlined
                    style={{
                      fontSize: "2em",
                      color: "purple",
                    }}
                  />
                  <Typography.Paragraph className="mt-2">
                    Video
                  </Typography.Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={10} lg={6}>
                <Card
                  hoverable
                  className="h-full text-center rounded-lg bg-gray-100"
                  onClick={handleVideoContent}
                >
                  <VideoCameraOutlined
                    style={{
                      fontSize: "2em",
                      color: "purple",
                    }}
                  />
                  <Typography.Paragraph className="mt-2">
                    Video & Slid Mashup
                  </Typography.Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={10} lg={6}>
                <Card
                  hoverable
                  className="h-full text-center rounded-lg bg-gray-100"
                  onClick={handleArticleContent}
                >
                  <FileTextOutlined
                    style={{
                      fontSize: "2em",
                      color: "purple",
                    }}
                  />
                  <Typography.Paragraph className="mt-2">
                    Article
                  </Typography.Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        )}
        {content && (
          <div>
            <Button
              size="small"
              type="default"
              icon={<CloseOutlined />}
              className="border-none rounded-md flex ml-auto items-center justify-center"
              onClick={handleClose}
            />
            <Typography.Paragraph>
              Select the main type of contentMenu. Files and links can be added
              as resources.
            </Typography.Paragraph>
            <div>
              <Form layout="vertical" form={contentTitle} size="large">
                <Form.Item required label="Title" name="title">
                  <Input placeholder="Enter the title of the Uploaded Content" />
                </Form.Item>
                <Form.Item
                  required
                  label="File(Video etc)"
                  // onMetaChange={uploadLectureContent}
                  rules={[
                    {
                      validator: (_, fileList) => {
                        if (fileList.length === 0) {
                          return Promise.reject(
                            new Error("Please upload an image file")
                          );
                        }
                        const file = fileList[0];
                        const fileType = file.type;
                        if (!fileType || !fileType.startsWith("image/")) {
                          return Promise.reject(
                            new Error("Please upload an image file")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  extra={`Upload your course image here. It must meet our course image 
                            quality standards to be accepted. Important guidelines: at least 650x650 pixels or more; 
                            .jpg, .jpeg,. gif, or .png. no text on the image.`}
                >
                  <Upload.Dragger {...videoUploadProps}>
                    <Typography.Title
                      level={1}
                      className="mb-0 text-purple-500"
                    >
                      <InboxOutlined />
                    </Typography.Title>
                    <Typography.Paragraph className="ant-upload-text mb-0">
                      Click or drag video file to this area to upload
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      type="secondary"
                      className="ant-upload-hint"
                    >
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </Typography.Paragraph>
                  </Upload.Dragger>
                </Form.Item>
                <Button
                  className="flex justify-end items-center ml-auto mt-4"
                  type="primary"
                  size="large"
                  onClick={uploadLectureContent}
                  loading={loading}
                  disabled={buttonDisabled}
                >
                  Save
                </Button>
              </Form>
              {/* <input
                type="file"
                className="w-full border-2 border-black flex ml-auto file:text-sm file:Select file:py-2 file:w-[20%] file:border-black"
              /> */}
            </div>
          </div>
        )}
        {articleContent && (
          <div>
            <Button
              size="small"
              type="default"
              icon={<CloseOutlined />}
              className="border-none rounded-md flex ml-auto items-center justify-center"
              onClick={handleClose}
            />
            <Typography.Paragraph>
              Upload your lecture as an article style and format it the way you
              want.
            </Typography.Paragraph>
            <div>
              <Form layout="vertical" form={articleContentData} size="large">
                <Form.Item required label="Title" name="title">
                  <Input placeholder="Enter the title of the Uploaded Content" />
                </Form.Item>
                <Form.Item
                  required
                  name="article"
                  rules={[
                    {
                      required: true,
                      message: "Write an article",
                    },
                  ]}
                  className="h-[350px]"
                >
                  <ReactQuill
                    theme="snow"
                    className="font-normal h-[300px]"
                    placeholder="Basic Knowledge of..."
                    modules={quillModules}
                  />
                </Form.Item>

                <Button
                  className="flex justify-end items-center ml-auto mt-4"
                  type="primary"
                  size="large"
                  onClick={handleSaveArticle}
                  loading={loading}
                  disabled={buttonDisabled}
                >
                  Save
                </Button>
              </Form>
              {/* <input
                 type="file"
                 className="w-full border-2 border-black flex ml-auto file:text-sm file:Select file:py-2 file:w-[20%] file:border-black"
               /> */}
            </div>
          </div>
        )}
        {description && (
          <div>
            <Form layout="vertical" form={form}>
              <Button
                size="small"
                type="default"
                icon={<CloseOutlined />}
                className="border-none rounded-md flex ml-auto items-center justify-center"
                onClick={handleClose}
              />
              <Form.Item
                name="lectureDescription"
                label="Lecture Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter Lecture Description",
                  },
                ]}
                tooltip="Write Lecture Description."
                className="mb-6"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="This lecture is all about..."
                />
                <Button
                  className="flex justify-center items-center mt-2 ml-auto"
                  type="primary"
                  size="large"
                  onClick={handleSaveDescription}
                  loading={loading}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {resources && (
          <div>
            <Button
              size="small"
              type="default"
              icon={<CloseOutlined />}
              className="border-none rounded-md flex ml-auto items-center justify-center"
              onClick={handleClose}
            />
            <Card
              style={{
                width: "100%",
              }}
              title="Add Resources"
              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={onTab1Change}
            >
              {contentList[activeTabKey]}
            </Card>
          </div>
        )}
        {lecture?.lecturecontents?.length > 0 &&
          lecture?.lecturecontents?.map((content) => {
            return (
              <div
                key={content.id}
                className="flex flex-row bg-gray-200 cursor-pointer text-sm rounded-md mt-4 p-2"
              >
                <li className="text-sm italics pl-2">{content.title}</li>
                <div className="flex items-center ml-2 justify-start">
                  <Button
                    danger
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    className="flex items-center justify-center mr-2"
                    onClick={() => handleDeleteContent(content.id)}
                  />
                </div>
              </div>
            );
          })}
        {lecture?.lecturearticles?.length > 0 &&
          lecture?.lecturearticles?.map((article: any) => {
            return (
              <div
                key={article.id}
                className="flex flex-row bg-gray-200 cursor-pointer text-sm rounded-md mt-4 p-2"
              >
                <li className="text-sm italics pl-2">{article.title}</li>
                <div className="flex items-center ml-2 justify-start">
                  <Button
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => handleEditArticle(article)}
                  />
                  <Button
                    danger
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    className="flex items-center justify-center mr-2"
                    onClick={() => handleDeleteArticle(article.id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default Lectures;
