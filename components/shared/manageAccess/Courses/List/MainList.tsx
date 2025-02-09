"use client";
import { useMemo, useContext } from "react";
import NextLink from "next/link";
import { Button, Divider, Pagination, Typography } from "antd";
import CourseList from "./CourseList";
import LearningMenu from "./LearningMenu";
import Container from "@/components/shared/container";
import { useSession } from "next-auth/react";
import { courseListContext } from "@/components/shared/manageAccess/Courses/List/couseListContext";
import CourseStatistics from "../Statistics";

const CoursesMainList = () => {
  const { data: session } = useSession();
  const courseContext = useContext(courseListContext);
  const userName = useMemo(() => {
    let fullName = "";
    if (
      typeof session?.user?.firstname === "string" &&
      session.user.firstname.trim() !== ""
    ) {
      fullName = session.user.firstname.trim();
    }
    if (
      typeof session?.user?.firstname === "string" &&
      session.user.firstname.trim() !== "" &&
      typeof session?.user?.lastname === "string" &&
      session.user.lastname.trim() !== ""
    ) {
      fullName += " ";
    }

    if (
      typeof session?.user?.lastname === "string" &&
      session.user.lastname.trim() !== ""
    ) {
      fullName += session.user.lastname.trim();
    }
    return fullName;
  }, [session?.user?.firstname, session?.user?.lastname]);

  return (
    <>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                {courseContext?.menuTitle}
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Welcome {userName}, here are your daily analytics
              </Typography.Paragraph>
            </div>
            {courseContext?.permissions?.content_create ? (
              <>
                <NextLink
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    if (courseContext?.handleCreateUrl) {
                      courseContext.handleCreateUrl();
                    }
                  }}
                  passHref
                >
                  <Button type="primary" size="large" className="rounded-md">
                    Create course
                  </Button>
                </NextLink>
              </>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </section>
      <nav>
        <Container className="container-fluid px-6">
          <LearningMenu />
        </Container>
      </nav>
      {courseContext?.permissions?.content_analytics ? (
        <>
          <section className="content-header">
            <Container className="container-fluid p-6">
              <CourseStatistics />
            </Container>
          </section>
        </>
      ) : (
        <></>
      )}
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <Divider className="my-0" />
          <CourseList />
          {courseContext?.pagination?.total &&
          courseContext.pagination.total > 0 ? (
            <>
              <div className="flex justify-center items-center mt-2">
                <Pagination
                  current={courseContext?.pagination?.currentPage}
                  pageSize={courseContext?.pagination?.pageSize}
                  total={courseContext?.pagination?.total}
                  onChange={(pageNo: number) => {
                    if (courseContext?.pagination?.setCurrentPage) {
                      courseContext.pagination.setCurrentPage(pageNo);
                    }
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </Container>
      </section>
    </>
  );
};

export default CoursesMainList;
