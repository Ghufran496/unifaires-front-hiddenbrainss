"use client";
import {
  Typography,
  Row,
  Col,
  Space,
  Input,
  Form,
  Button,
  Modal,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import MobileView from "./tabs/MobileView";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/redux/features/UserSlice";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
// import Paragraph from "antd/es/skeleton/Paragraph";

interface VerifyTokenProps {
  Token: string;
}

interface PasswordResetProps {
  OldPassword: string;
  Password: string;
  Confirm: string;
}

interface UserDetailsProps {
  FirstName: string;
  LastName: string;
}

const Account = () => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const { Paragraph, Link } = Typography;
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [usernameForm] = Form.useForm();
  const { Title, Text } = Typography;
  const [allPartners, setAllPartners] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [accessLoading, setAccessLoading] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    editForm.resetFields();
    setIsModalVisible(false);
  };

  const closeDeleteAccount = () => {
    setDeleteAccount(false);
  };

  const openPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  // Function to close the modal
  const closePasswordModal = () => {
    passwordForm.resetFields();
    setIsPasswordModalVisible(false);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // console.log("Account page line 79 ===>", session);

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const myProfile = useAppSelector((state: any) => state.user.myProfile);

  const handleUserName = async () => {
    setUsernameLoading(true);
    const username = usernameForm.getFieldsValue();
    try {
      const res = await axiosInstance.put("/users/profile/username", username);

      if (res.status) {
        toast.success("Username changed Successfully");
        setEditUsername(false);
        dispatch(fetchUserProfile("user"));
      }
    } catch (error) {
      handleAxiosError(error);
    }

    setUsernameLoading(false);
  };

  // console.log(myProfile);

  // GET TOKEN FOR ACCOUNT DEACTIVATION
  async function getAccountDeactivationToken() {
    const email = myProfile?.email;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/reset-user-token", {
        email: email,
      });

      if (response.status) {
        showSuccess("Token Sent");
        setDeleteAccount(true);
      }
    } catch (error) {
      handleAxiosError(error);
    }

    setLoading(false);
  }

  // VERIFY TOKEN FOR ACCOUNT DEACTIVATION
  const verifyTokenForAccountDeactivation = async (val: VerifyTokenProps) => {
    setLoading(true);
    const email = myProfile?.email;

    try {
      // setToken(val)
      const response = await axiosInstance.post("/auth/verify-user-token", {
        email: email,
        token: val.Token,
      });

      if (response.status) {
        // toast.success(response.data.data.message);
        deactivateAccount(val.Token);
        setDeleteAccount(false);
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
    // console.log(response, data)
  };

  // DEACTIVATE USER ACCOUNT FUNCTION
  async function deactivateAccount(token: string) {
    // console.log(JSON.stringify({email,token}))
    setLoading(true);
    const email = myProfile?.email;
    try {
      const response = await axiosInstance.post("/auth/user-deactivate", {
        // email: email,
        token: token,
      });
      if (response.status) {
        showSuccess("Deactivation Successful");
        setDeleteAccount(false);
        signOut();
      }
    } catch (error) {
      handleAxiosError(error);
    }
    setLoading(false);
  }

  // PASSWORD RESET FUNCTIONALITY
  async function handlePasswordReset(val: PasswordResetProps) {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/auth/old-reset-user-password",
        {
          oldPassword: val.OldPassword,
          password: val.Password,
        }
      );

      if (response.data.status) {
        // console.log(response);
        closePasswordModal();
        showSuccess("Your password has been reset successfully");
        val.Confirm = "";
        val.OldPassword = "";
        val.Password = "";
      }
    } catch (error) {
      console.log(error);
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  }

  // UPDATE USER FIRST AND LAST NAME
  async function updateUserNames(val: UserDetailsProps) {
    setLoading(true);
    await axiosInstance
      .put(`/user/${session?.user?.id}`, {
        firstname: val.FirstName,
        lastname: val.LastName,
      })
      .then((res) => {
        dispatch(fetchUserProfile("user"));
        closeModal();
        toast.success("Details Updated Successfully");
      })
      .catch((error) => {
        console.log("here is the error", error);
        toast.error("Unable to update details");
      });
    setLoading(false);
  }

  // FETCH USER BUSINESS PARNTERS
  const fetchBusinessAccess = async () => {
    try {
      setAccessLoading(true);
      const res = await axiosInstance.get("/invite/user-access");
      if (res.status) {
        setAllPartners(res.data.data);
      }
    } catch (error) {
      console.log("Unable to fetch business access", error);
      // handleAxiosError(error);
    } finally {
      setAccessLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessAccess();
  }, []);

  // HANDLE ACCESSING A BUSINESS ACCOUNT
  const handleAccessBusiness = (business: any) => {
    const businessAccess = (
      Array.isArray(business?.permissions) ? business.permissions : []
    ).map((permission: any) => permission.title);
    const roleName: string =
      typeof business?.roles?.[0]?.title === "string"
        ? business.roles[0].title.toLowerCase().trim()
        : "";

    const withOwnersDetails = {
      businessAccess: businessAccess,
      ownerDetails: business.ownerDetails,
      ownerType: business.ownerType,
      ownersId: business.ownersId,
      roleName,
    };

    sessionUpdate({ ...session!.user, businessAccess: withOwnersDetails }).then(
      () => {
        toast.success("Access Granted");
      }
    );
  };

  const handleSignOut = () => {
    fetchBusinessAccess();
    sessionUpdate({ ...session!.user, businessAccess: null }).then(() => {
      toast.success("Signed Out");
    });
  };

  return (
    <>
      <Title level={4} className="py-4">
        Account Details
      </Title>
      <div className="p-4 border-gray-300 border-[1px] bg-gray-100 rounded-lg lg:w-1/2 md:w-1/2 my-3 sm-w-full">
        <div className="flex flex-row gap-8">
          <Typography.Paragraph className="font-semibold">
            First Name:
          </Typography.Paragraph>
          <Typography.Paragraph className="font-semibold">
            {myProfile?.firstname}
          </Typography.Paragraph>
        </div>
        <div className="flex flex-row gap-8">
          <Typography.Paragraph className="font-semibold">
            Last Name:
          </Typography.Paragraph>
          <Typography.Paragraph className="font-semibold">
            {myProfile?.lastname}
          </Typography.Paragraph>
        </div>
        <div className="flex flex-row gap-8">
          <Typography.Paragraph className="font-semibold">
            Email Address:
          </Typography.Paragraph>
          <Typography.Paragraph className="font-semibold">
            {myProfile?.email}
          </Typography.Paragraph>
        </div>

        <div className=" text-purple-50 font-small cursor-pointer">
          <Button
            type="text"
            size="middle"
            onClick={openModal}
            className="flex ml-auto border-none text-purple-50"
          >
            Edit
          </Button>
        </div>
      </div>

      <div
        // size={95}
        className="flex justify-between mb-3 border-gray-300 border-[1px] bg-gray-100 p-3 rounded-lg lg:w-1/2 md:w-[50%] sm-w-full"
      >
        {!editUsername ? (
          <div className="flex gap-4 w-full justify-between ">
            <div className="flex items-center flex-row gap-8">
              <Typography.Paragraph className="m-0 font-semibold">
                Username:
              </Typography.Paragraph>
              <Typography.Paragraph className="m-0 font-semibold">
                {myProfile?.username}
              </Typography.Paragraph>
            </div>
            <Text
              className="text-purple-50 font-small cursor-pointer"
              onClick={() => setEditUsername(true)}
            >
              Edit
            </Text>
          </div>
        ) : (
          <div>
            <Form
              layout="vertical"
              size="large"
              form={usernameForm}
              className="flex gap-4 items-center"
            // onFinish={handlePasswordReset}
            >
              <Form.Item required name="username" className="mb-0">
                <Input
                  defaultValue={myProfile?.username}
                  className="rounded-sm"
                  placeholder="Enter username"
                />
              </Form.Item>
              <div className="flex gap-2">
                <Button
                  type="primary"
                  size="middle"
                  className="rounded-sm"
                  onClick={handleUserName}
                  loading={usernameLoading}
                >
                  Change
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  type="text"
                  size="middle"
                  onClick={() => setEditUsername(false)}
                />
              </div>
            </Form>
          </div>
        )}
      </div>

      <Space
        size={95}
        className="border-gray-300 border-[1px] bg-gray-100 p-3 rounded-lg lg:w-1/2 md:w-[50%] sm-w-full"
      >
        <Text className="font-small">Password</Text>
        <Text
          className="text-purple-50 font-small cursor-pointer"
          onClick={openPasswordModal}
        >
          Change Password
        </Text>
      </Space>
      <Divider />

      {allPartners && allPartners.length > 0 && (
        <div className="my-3 lg:w-1/2 md:w-1/2 sm-w-full">
          <Typography.Paragraph className="text-lg font-bold ">
            Business Manage Access
          </Typography.Paragraph>
          {allPartners.map((partner: any) => {
            const currentBusiness = session?.user?.businessAccess;
            const business = partner.ownerDetails;
            const isAccessable = partner.status === "accepted";
            return isAccessable ? (
              <div
                key={partner.id}
                className="flex justify-between items-center"
              >
                <Typography.Paragraph className="m-0">
                  {business.companyName ||
                    `${business.firstname} ${business.lastname}`}
                </Typography.Paragraph>
                {!currentBusiness ||
                  currentBusiness.ownerDetails.id !== business.id ? (
                  <Button
                    size="middle"
                    icon={<PlusOutlined />}
                    type="text"
                    className="text-blue-700 font-bold text-base"
                    loading={accessLoading}
                    onClick={() => handleAccessBusiness(partner)}
                  >
                    Access
                  </Button>
                ) : (
                  <div className="flex justify-between gap-2 items-center">
                    <Typography.Paragraph className=" m-0 italic text-gray-600 font-bold text-base">
                      Accessed
                    </Typography.Paragraph>
                    <Button
                      size="middle"
                      type="text"
                      className="text-blue-700 font-bold text-base"
                      onClick={() => handleSignOut()}
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            ) : (<></>);
          })}
          <Divider />
        </div>
      )}
      <div className="my-3">
        <Typography.Paragraph>
          <span className="font-bold">Warning: </span>
          this action can not be undone. Your information will be deleted.
        </Typography.Paragraph>
        {myProfile && myProfile?.status ? (
          <Button
            className="w-[45%] bg-transparent h-[50px] rounded-sm  text-red-500 border-red-500"
            onClick={getAccountDeactivationToken}
            loading={loading}
          >
            Deactivate Account
          </Button>
        ) : (
          <Button
            className="w-[45%] bg-transparent h-[50px] rounded-sm  text-green-500 border-green-500"
            onClick={getAccountDeactivationToken}
            loading={loading}
          >
            Activate Account
          </Button>
        )}

        <Modal
          onCancel={closeDeleteAccount}
          open={deleteAccount}
          onOk={closeDeleteAccount}
          footer={null}
        >
          <Typography className="text-red-500 font-semibold pt-4">
            Do you want to deactivate your account?
          </Typography>

          <Paragraph className="capitalize pt-[1rem] font-bold">
            Please provide the 6 digit token sent to your email
          </Paragraph>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={verifyTokenForAccountDeactivation}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[8, 4]}>
              <Col xl={24} sm={24} xs={24} className="pt-5">
                <Form.Item
                  name="Token"
                  label="6-Digit Token"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please provide the 6 digit token sent to your email for verification",
                    },
                    {
                      len: 6,
                      message: "Token must me a 6-Digit character",
                    },
                  ]}
                >
                  <Input placeholder="000000" size="large" />
                </Form.Item>
              </Col>
              <Col xl={24} xs={24} className="text-base font-semibold">
                <Form.Item>
                  <Button
                    className="text-base font-bold"
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    Verify Token
                  </Button>
                </Form.Item>
              </Col>
              <Col
                xl={24}
                xs={24}
                className="text-center text-base font-semibold"
              ></Col>
            </Row>
          </Form>
        </Modal>
      </div>
      {/* Edit Name and Email Modal */}
      <Modal
        onCancel={closeModal}
        open={isModalVisible}
        onOk={closeModal}
        footer={null}
      >
        <Form
          layout="vertical"
          size="large"
          form={editForm}
          onFinish={updateUserNames}
        >
          <Form.Item
            required
            label="First Name"
            name="FirstName"
            className="mb-0"
          >
            <Input
              className="rounded-sm"
              placeholder="First Name"
              defaultValue={myProfile?.firstname}
            />
          </Form.Item>
          <Form.Item
            required
            label="Last Name"
            name="LastName"
            className="mb-0 mt-5"
          >
            <Input
              className="rounded-sm"
              placeholder="Last Name"
              defaultValue={myProfile?.lastname}
            />
          </Form.Item>
          {/* <Form.Item
            required
            label="Email Address"
            name="email"
            className="mb-0"
          >
            <Input className="rounded-sm" placeholder="example@gmail.com" />
          </Form.Item> */}
          <div className="mt-4">
            <Button
              type="primary"
              size="large"
              className="flex ml-auto"
              loading={loading}
              htmlType="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        onCancel={closePasswordModal}
        open={isPasswordModalVisible}
        onOk={closePasswordModal}
        footer={null}
      >
        <Form
          layout="vertical"
          size="large"
          form={passwordForm}
          onFinish={handlePasswordReset}
        >
          <Form.Item
            required
            label="Old Password"
            name="OldPassword"
            className="mb-0"
          >
            <Input.Password
              className="rounded-sm"
              placeholder="Enter Previous Password"
            />
          </Form.Item>
          <Form.Item
            name="Password"
            label="New Password"
            className="mb-0"
            rules={[
              {
                required: true,
                message:
                  "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
                pattern: new RegExp(
                  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
                ),
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              className="rounded-sm"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="Confirm"
            label="Confirm Password"
            dependencies={["Password"]}
            hasFeedback
            className="mb-0"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("Password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder=" Confrim Password"
              className="rounded-sm"
              size="large"
            />
          </Form.Item>

          <div className="mt-4">
            <Button
              type="primary"
              size="large"
              className="flex ml-auto"
              loading={loading}
              htmlType="submit"
            >
              Change
            </Button>
          </div>
        </Form>
      </Modal>
      {isSmallScreen ? <MobileView /> : null}
    </>
  );
};
export default Account;
