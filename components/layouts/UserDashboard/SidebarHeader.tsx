"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export interface UserDetailsProps {
  fullname?: string;
}

const SidebarHeader = () => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const [firstName, setFirstName] = useState("");

  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const imageUrl = myProfile && myProfile.imageUrl;

  return (
    <Fragment>
      <div className="bg-white text-center px-6">
        <div className="flex items-center justify-start gap-6 content-center justify-items-center">
          {imageUrl ? (
            <div className="">
              <Avatar
                size={50}
                icon={
                  <Image
                    src={imageUrl}
                    alt="profile picture"
                    className="rounded-full justify-self-start"
                    width={60}
                    height={60}
                  />
                }
              />
            </div>
          ) : (
            <Avatar size={50} icon={<UserOutlined />} />
          )}
          <div>
            <div className="flex items-center justify-between gap-2 capitalize">
              <h3 className="font-bold text-base ">{myProfile?.firstname}</h3>
            </div>
            <small className="text-start font-medium ">{myProfile.email}</small>
          </div>
        </div>
        <div className="bg-purple-60 rounded-full p-3  my-6 text-purple-50 font-semibold leading[16.8px] text-sm">
          Individual Account
        </div>
      </div>
    </Fragment>
  );
};

export default SidebarHeader;
