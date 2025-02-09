"use client";
import React, { Fragment, useState, useContext } from "react";
import {
  Form,
  Input,
  // Upload,
  Button,
  Alert,
  // message,
  Collapse,
  Typography,
  // UploadProps,
  Divider,
  Menu,
  message,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Container from "@/components/shared/container";
import { CourseContext } from "../CourseContext";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import LectureContent from "./Lectures/LecturesContent";
import QuizForm from "./Quiz/QuizForm";
import Quiz from "./Quiz";
import { LectureInt, SectionInt } from "../../course.interface";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

const CourseContent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const { courseData, fetchCourseData } = useContext<any>(CourseContext);
  const [sectionCount, setSectionCount] = useState(1);
  const [editId, setEditId] = useState("section");
  const [editedSectionTitles, setEditedSectionTitles] = useState({
    title: "",
    objective: "",
  });
  const [addSectionForm, setAddSectionForm] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [sectionMenus, setSectionMenus] = useState(
    Array(sectionCount).fill(false)
  );
  const [lectureTitle, setLectureTitle] = useState("");
  const [showLectureEdit, setShowLectureEdit] = useState("");
  const [editedLectureTitles, setEditedLectureTitles] = useState({
    title: "",
  });
  const [addLecture, setAddLecture] = useState(-1);
  const [activeSection, setActiveSection] = useState(-1);
  const [addQuiz, setAddQuiz] = useState(false);

  const handleSectionMenu = (id: number) => {
    setAddLecture(-1);
    setAddQuiz(false);
    setSectionMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      updatedMenus[id] = !updatedMenus[id];
      return updatedMenus;
    });
  };

  const handleCloseSectionMenu = () => {
    setAddLecture(-1);
    setAddQuiz(false);
    setSectionMenus((prevMenus) => prevMenus.map(() => false));
    console.log();
  };

  const handleAddSection = () => {
    setAddSectionForm(true);
  };

  const handleSaveSection = async () => {
    const formData = form.getFieldsValue();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/section", {
        ...formData,
        courseId: courseData?.data?.id,
      });
      if (response.status) {
        showSuccess("Section Created Successfully");
        fetchCourseData();
        setAddSectionForm(false);
        form.resetFields();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (id: any) => {
    if (status === "authenticated" && session?.user?.token) {
      try {
        const response = await axiosInstance.delete(`/section/${id}`);
        if (response.status) {
          showSuccess("Section Successfully Deleted");
          fetchCourseData();
          // setEditId("");
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };

  const handleEditSectionTitle = (section: {
    id: number;
    title: string;
    objective: string;
  }) => {
    setEditId(`${section.id}`);
    setEditedSectionTitles({
      title: section.title,
      objective: section.objective,
    });
  };

  const handleDismissAlert = () => {
    setShowAlert(false); // Hide the alert when dismissed
  };

  const handleEditLectureTitle = (lecture: { id: number; title: string }) => {
    setShowLectureEdit(`${lecture.id}`);
    setEditedLectureTitles({
      title: lecture.title,
    });
  };

  const handleSaveSectionTitle = async (id: any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/section/${id}`, {
        title: editedSectionTitles.title,
        objective: editedSectionTitles.objective,
      });
      if (response.status) {
        showSuccess("Section Updated Successfully");
        fetchCourseData();
        setEditId("");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLectureTitle = async (id: any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/lecture/${id}`, {
        title: editedLectureTitles.title,
      });
      if (response.status) {
        showSuccess("Lecture Updated Successfully");
        fetchCourseData();
        setShowLectureEdit("");
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLecture = (id: number) => {
    setActiveSection(id);
    setAddQuiz(false);
    setAddLecture(id);
    setSectionMenus((prevMenus) => prevMenus.map(() => false));
  };

  const handleDeleteLecture = async (id: any) => {
    try {
      const response = await axiosInstance.delete(`/lecture/${id}`);
      if (response.status) {
        showSuccess("Lecture Successfully Deleted");
        fetchCourseData();
        // setEditId("");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleSaveLecture = async (section: { id: any }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/lecture", {
        sectionId: section.id,
        title: lectureTitle,
      });
      if (response.status) {
        showSuccess("Lecture Created Successfully");
        fetchCourseData();
        setLectureTitle("");
        handleLectureCollapse();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLectureCollapse = () => {
    setActiveSection(-1);
    setSectionMenus((prevMenus) => prevMenus.map(() => false));
    setAddLecture(-1);
  };

  return (
    <Fragment>
      {/* <Form layout="vertical" size="large">
        <Form.Item
          name="overview"
          label="Course Overview"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter a course Overview",
          //   },
          // ]}
          tooltip="Write a Course Overview."
          className="mb-6"
        >
          <Input.TextArea rows={4} placeholder="#1 Best Selling..." />
        </Form.Item>
      </Form> */}
      <Container className="px-6 pb-6 pt-8 container-fluid">
        <Typography.Paragraph className="text-bold text-lg">
          Content
        </Typography.Paragraph>
        {showAlert && ( // Show the alert only if showAlert is true
          <Alert
            style={{ borderRadius: 8, marginTop: 24 }}
            message={
              <Typography.Title level={5} className="leading-none">
                Course Contents
              </Typography.Title>
            }
            showIcon
            icon={<InfoCircleOutlined />}
            closable
            description={
              <>
                <Typography.Paragraph className="max-w-4xl">
                  Here&apos;s where you add course content-like lectures, course
                  sections, assignments, and more.
                </Typography.Paragraph>
                <Button
                  className="rounded"
                  type="primary"
                  onClick={handleDismissAlert}
                >
                  Dismiss
                </Button>
              </>
            }
          />
        )}
        <Divider className="mb-0" />
      </Container>

      {courseData?.data?.sections.length > 0 &&
        courseData?.data?.sections.map((section: SectionInt) => {
          return (
            <div
              key={`curriculum-section-${section.id}`}
              className="curriculum-section p-6 mb-3 rounded-lg bg-grey-50"
            >
              <div className="flex items-center justify-between mb-3">
                {editId === `${section.id}` ? (
                  <Form.Item
                    required
                    // label={`Section ${section.id}`}
                    className="w-full"
                  >
                    <Button
                      type="primary"
                      icon={<CloseOutlined />}
                      size="small"
                      onClick={() => setEditId("")}
                      className="flex justify-center items-center ml-auto mb-2"
                    />
                    <div className="flex flex-row gap-2">
                      <div className="w-1/6">
                        <Typography.Title level={4}>Section:</Typography.Title>
                      </div>
                      <div className="w-full">
                        <Input
                          placeholder="Enter Section Title"
                          className="mb-6"
                          size="large"
                          value={editedSectionTitles.title}
                          onChange={(e) =>
                            setEditedSectionTitles({
                              ...editedSectionTitles,
                              title: e.target.value,
                            })
                          }
                        />
                        <Typography.Paragraph className="font-bold m-0 ml-2">
                          What will the Student be able to do at the end of this
                          section?
                        </Typography.Paragraph>
                        <Input
                          size="large"
                          placeholder="Enter Learning Objectives"
                          value={editedSectionTitles.objective}
                          onChange={(e) =>
                            setEditedSectionTitles({
                              ...editedSectionTitles,
                              objective: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* </Form.Item> */}
                    <Button
                      className="flex justify-end items-center ml-auto mt-4"
                      type="primary"
                      size="large"
                      icon={<PlusOutlined />}
                      loading={loading}
                      onClick={() => handleSaveSectionTitle(section.id)}
                    >
                      Update
                    </Button>
                  </Form.Item>
                ) : (
                  <Typography.Title level={4} className="">
                    {`Section ${
                      courseData?.data?.sections.indexOf(section) + 1
                    }: ${section.title}`}
                  </Typography.Title>
                )}
                <div className="flex gap-2 items-center">
                  {editId !== `${section.id}` && (
                    <div className="flex items-center justify-between mb-2 pl-4">
                      <Button
                        type="text"
                        size="small"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => handleEditSectionTitle(section)}
                      />
                      <Button
                        danger
                        type="text"
                        size="small"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        className="grid place-items-center"
                        onClick={() => handleDeleteSection(section.id)}
                      />
                    </div>
                  )}
                </div>
                {editId !== `${section.id}` && (
                  <div className="flex items-center justify-end ml-auto">
                    {sectionMenus[section.id] ||
                    addLecture === section.id ||
                    addQuiz ? (
                      <Button
                        type="primary"
                        size="small"
                        onClick={handleCloseSectionMenu}
                        className="rounded-md flex items-center justify-center mb-2"
                      >
                        <CloseOutlined />
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleSectionMenu(section.id)}
                        className="rounded-md flex items-center justify-center mb-2"
                      >
                        <PlusOutlined />
                      </Button>
                    )}
                  </div>
                )}
              </div>
              {sectionMenus[section.id] && (
                <Menu
                  mode="horizontal"
                  className="flex flex-row bg-white rounded-md mb-2 text-blue-400 border-2"
                  // key={section.id}
                >
                  <Menu.Item>
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      size="small"
                      className="pr-4"
                      onClick={() => handleAddLecture(section.id)}
                    >
                      Lecture
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      size="small"
                      className="pr-4"
                      onClick={() => setAddQuiz(true)}
                    >
                      Quiz
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      size="small"
                      className="pr-4"
                      // onClick={handleAddCodingExercise}
                    >
                      Coding Exercise
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      size="small"
                      className="pr-4"
                      // onClick={handleAddAssignment}
                    >
                      Assignment
                    </Button>
                  </Menu.Item>
                </Menu>
              )}
              {addLecture === section.id && (
                <div className="mb-4">
                  <Form.Item required label="Lecture Title">
                    <Input
                      size="large"
                      placeholder="Lecture Title"
                      onChange={(e) => setLectureTitle(e.target.value)}
                    />
                  </Form.Item>
                  <Button
                    className="ml-2"
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => handleSaveLecture(section)}
                    loading={loading}
                  >
                    Save Lecture
                  </Button>
                </div>
              )}
              {addQuiz && <QuizForm section={section} />}
              {section?.lectures !== undefined &&
                section?.lectures?.length > 0 &&
                section?.lectures.map((lecture) => {
                  return (
                    <div key={lecture.id} className="flex flex-col gap-3 mb-3">
                      <Collapse
                        accordion
                        collapsible="icon"
                        expandIconPosition="end"
                        defaultActiveKey={["00"]}
                        className="overflow-hidden [&>div.ant-collapse-item>div.ant-collapse-header]:bg-white"
                      >
                        <Collapse.Panel
                          key={`${section.id}-${lecture.id}`}
                          header={
                            <div>
                              {showLectureEdit === `${lecture.id}` ? (
                                <Form.Item
                                  required
                                  // label={`Section ${section.id}`}
                                  className="w-full"
                                >
                                  <Button
                                    type="primary"
                                    icon={<CloseOutlined />}
                                    size="small"
                                    onClick={() => setShowLectureEdit("")}
                                    className="flex justify-center items-center ml-auto mb-2"
                                  />
                                  <div className="flex flex-row gap-2">
                                    <div className="w-1/6">
                                      <Typography.Paragraph>
                                        Lecture:
                                      </Typography.Paragraph>
                                    </div>
                                    <div className="w-full">
                                      <Input
                                        size="large"
                                        placeholder="Enter Lecture Title"
                                        className="mb-6"
                                        value={editedLectureTitles.title}
                                        onChange={(e) =>
                                          setEditedLectureTitles({
                                            ...editedLectureTitles,
                                            title: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  <Button
                                    className="flex justify-end items-center ml-auto mt-4"
                                    type="primary"
                                    size="large"
                                    icon={<PlusOutlined />}
                                    loading={loading}
                                    onClick={() =>
                                      handleSaveLectureTitle(lecture.id)
                                    }
                                  >
                                    Update
                                  </Button>
                                </Form.Item>
                              ) : (
                                <Typography.Paragraph className="mb-0 font-semibold">
                                  {`Lecture ${
                                    section?.lectures !== undefined &&
                                    section?.lectures.indexOf(lecture) + 1
                                  }: ${lecture.title}`}
                                </Typography.Paragraph>
                              )}
                            </div>
                          }
                          extra={
                            <div>
                              {showLectureEdit === `${lecture.id}` ? (
                                <span></span>
                              ) : (
                                <div className="flex gap-2 items-center">
                                  <Button
                                    type="text"
                                    size="small"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    onClick={() =>
                                      handleEditLectureTitle(lecture)
                                    }
                                  />
                                  <Button
                                    type="text"
                                    size="small"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    className="grid place-items-center"
                                    onClick={() =>
                                      handleDeleteLecture(lecture.id)
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          }
                        >
                          <LectureContent lecture={lecture} />
                          {/* <Lecture lectureId={lecture.id} /> */}
                        </Collapse.Panel>
                      </Collapse>
                    </div>
                  );
                })}
              <Quiz section={section} />
            </div>
          );
        })}
      {addSectionForm && (
        <div className="curriculum-section p-6 mb-3 rounded-lg bg-grey-50">
          <Button
            size="small"
            type="default"
            icon={<CloseOutlined />}
            className="border-none rounded-md mb-4 flex ml-auto items-center justify-center"
            onClick={() => setAddSectionForm(false)}
          />
          <Form layout="vertical" form={form} size="large">
            <div className="flex flex-row gap-2">
              <div className="w-1/5 mt-2">
                <Typography.Title level={5}>New Section:</Typography.Title>
              </div>
              <div className="w-full">
                <Form.Item required className="w-full">
                  <Form.Item required name="title">
                    <Input size="large" placeholder="Enter Section Title" />
                  </Form.Item>
                  <div className="m-0">
                    <Typography.Paragraph className="font-bold m-0 ml-2">
                      What will the Student be able to do at the end of this
                      section?
                    </Typography.Paragraph>
                    <Form.Item name="objective" required>
                      <Input
                        size="large"
                        placeholder="Enter Learning Objectives"
                      />
                    </Form.Item>
                  </div>
                  <Button
                    className="flex justify-end items-center ml-auto mt-4"
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={handleSaveSection}
                    loading={loading}
                  >
                    Add Section
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      )}
      <Button
        type="dashed"
        size="large"
        onClick={handleAddSection}
        className="px-6"
        icon={<PlusOutlined />}
      >
        Add Section
      </Button>
    </Fragment>
  );
};

export default CourseContent;
