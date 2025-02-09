"use client";
import React, { useEffect, useState } from "react";
// ant components
import { Row, Col, Grid } from "antd";
// app components
import Container from "@/components/shared/container";
import MessageSections from "./MessageSections";
import { useParams, useRouter } from "next/navigation";

interface MessagesPageProps {
  children: React.ReactNode;
  // setViewMessage: any;
}

const MessagesPage = ({ children }: MessagesPageProps) => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;
  const [viewMessage, setViewMessage] = useState(true);
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    setViewMessage(true);
  }, [userId]);

  // console.log(screens);

  return (
    <section className="relative h-full">
      <Container fluid className="px-0">
        {(screens.xs || (screens.sm && !screens.md)) && !userId ? (
          <Row className="">
            <Col
              className={`${
                screens.xs || (screens.sm && !screens.md)
                  ? "w-full h-full"
                  : "w-[40%] h-[120vh]"
              } overflow-y-scroll`}
            >
              <MessageSections setViewMessage={setViewMessage} />
            </Col>
          </Row>
        ) : (screens.xs || (screens.sm && !screens.md)) && userId ? (
          <Row className="">
            {viewMessage ? (
              <Col
                className={`${
                  screens.xs || (screens.sm && !screens.md)
                    ? "w-full h-[125vh]"
                    : "w-[60%] h-[120vh]"
                }`}
              >
                {React.Children.map(children, (child: any) => {
                  return React.cloneElement(child, { setViewMessage });
                })}
                {/* {children} */}
              </Col>
            ) : (
              <Col
                className={`${
                  screens.xs || (screens.sm && !screens.md)
                    ? "w-full h-full"
                    : "w-[40%] h-[120vh]"
                } overflow-y-scroll`}
              >
                <MessageSections setViewMessage={setViewMessage} />
              </Col>
            )}
          </Row>
        ) : (
          <Row className="">
            <Col className="custom-scrollbar w-[40%] overflow-y-scroll h-[120vh]">
              <MessageSections setViewMessage={setViewMessage} />
            </Col>
            <Col className="w-[60%] h-[120vh]">{children}</Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default MessagesPage;
