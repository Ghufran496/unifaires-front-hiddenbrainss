"use client";
import Image from "next/image";
import { Fragment } from "react";
import { useEffect, useState } from "react";

export interface UserDetailsProps {
  fullname?: string;
}

const SidebarHeader = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsProps>({});
  useEffect(() => {
    const user: any = localStorage.getItem("userDetails");
    setUserDetails(JSON.parse(user));
  }, []);

  return (
    <Fragment>
      <div className="bg-white text-center px-6">
        <div className="flex items-center justify-start gap-6 content-center justify-items-center">
          <Image
            src="/user-icon.png"
            alt="profile picture"
            className="justify-self-start"
            width={60}
            height={60}
          />
          <div>
            <div className="flex items-center justify-between capitalize">
              <h3>{userDetails?.fullname}</h3>
              <span>
                <Image
                  width={15}
                  height={20}
                  src="/verified.svg"
                  alt="verified"
                  className="self-start"
                />
              </span>
            </div>
            <small className="text-start ">Student, Harvard University</small>
          </div>
        </div>
        {/* <div className="bg-purple-60 rounded-full p-3  my-6 text-purple-50 font-semibold leading[16.8px] text-sm">
          Individual Account
        </div> */}
      </div>
    </Fragment>
  );
};

export default SidebarHeader;
