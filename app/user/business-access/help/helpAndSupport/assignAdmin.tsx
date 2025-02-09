"use client";
import {
  Avatar,
  Button,
  List,
  Modal,
  Pagination,
  Spin,
  Typography,
} from "antd";
import { LoadingOutlined, UserAddOutlined } from "@ant-design/icons";
import { AssignAdminInt } from "./help.interface";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";

interface helpDetailsProp {
  adminModal: boolean;
  setAdminModal: (isOpen: boolean) => void;
  helpId: number;
  fetchPendingHelp: Function;
  fetchAssignedHelp: Function;
}

const AdminList = ({
  helpId,
  fetchPendingHelp,
  fetchAssignedHelp,
  adminModal,
  setAdminModal,
}: helpDetailsProp) => {
  const [admins, setAdmins] = useState<Array<AssignAdminInt>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalAdmin, setTotalAdmin] = useState();
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      const res = await axiosAccessInstance.get("/admin");
      if (res.status) {
        const resData = res.data.data;
        setCurrentPage(resData.currentPage);
        setTotalAdmin(resData.count);
        setAdmins(resData.results);
        // console.log(res.data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const closeModal = () => {
    setAdminModal(!adminModal);
  };

  const handleAssignHelp = async (id: number, name: string) => {
    try {
      setAssignLoading(true);
      const res = await axiosAccessInstance.post("/help-track", {
        helpId: helpId,
        assignToId: id,
        status: "assigned",
      });

      if (res.status) {
        showSuccess(`Help assigned to ${name} Successfully`);
        closeModal();
        fetchPendingHelp();
        fetchAssignedHelp();
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("here is the error", error);
    } finally {
      setAssignLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Modal
      open={adminModal}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
    >
      <Typography.Paragraph className="font-bold text-[1.5em] pl-6 m-0">
        List of Admin
      </Typography.Paragraph>
      <div className="mb-8">
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined className="flex items-center justify-center text-2xl" />
          }
        >
          <List
            className="top-4 bottom-4"
            itemLayout="horizontal"
            dataSource={admins}
            size="large"
            bordered
            // loading={loading}
            renderItem={(admin) => (
              <List.Item
                key={admin.id}
                actions={[
                  <div
                    key={`add-admin-${admin.id}`}
                    className="flex items-center justify-between mb-2 pl-6"
                  >
                    <Button
                      type="default"
                      size="middle"
                      icon={<UserAddOutlined />}
                      onClick={() =>
                        handleAssignHelp(admin.id, admin.firstname)
                      }
                      loading={assignLoading}
                    >
                      Assign
                    </Button>
                    {/* <Button
                    danger
                    type="text"
                    size="small"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    className="grid place-items-center"
                    //   onClick={() => handleDeleteInstructor(admin.id)}
                  /> */}
                  </div>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={admin.imageUrl} />}
                  title={`${admin.firstname} ${admin.lastname}`}
                  description={admin.email}
                />
              </List.Item>
            )}
          />
        </Spin>
      </div>
      <div className="flex justify-center items-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalAdmin}
          onChange={handlePageChange}
        />
      </div>
    </Modal>
  );
};

export default AdminList;
