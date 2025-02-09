"use client";
import Link from "next/link";
// antd components
import { Menu } from "antd";
import { useAppSelector } from "@/redux/hooks";

interface FundingsMenuProps {
  activeKey: string;
}

const FundingsMenu = ({ activeKey }: FundingsMenuProps) => {
  const appliedFundings = useAppSelector(
    (state: any) => state.funding.myFundings
  );
  const savedFundings = useAppSelector(
    (state: any) => state.funding.savedFundings
  );
  const acceptedFundings = useAppSelector(
    (state: any) => state.funding.acceptedFundings
  );
  const interviewedFundings = useAppSelector(
    (state: any) => state.funding.interviewedFundings
  );
  const rejectedFundings = useAppSelector(
    (state: any) => state.funding.rejectedFundings
  );

  const items = [
    {
      label: (
        <Link href="/user/funding">{`Applied (${appliedFundings.length})`}</Link>
      ),
      key: "my-funding",
    },
    {
      label: (
        <Link href="/user/funding/saved-funding">{`Saved (${savedFundings.length})`}</Link>
      ),
      key: "saved",
    },
    {
      label: (
        <Link href="/user/funding/interviews">{`Interviews (${interviewedFundings.length})`}</Link>
      ),
      key: "interviews",
    },
    {
      label: (
        <Link href="/user/funding/accepted-funding">{`Accepted (${acceptedFundings.length})`}</Link>
      ),
      key: "accepted",
    },
    {
      label: (
        <Link href="/user/funding/rejected-funding">{`Rejected (${rejectedFundings.length})`}</Link>
      ),
      key: "rejected",
    },
    // {
    //   label: (
    //     <Link href="/user/funding/archive">{`Archived (${archivedJobs.length})`}</Link>
    //   ),
    //   key: "archive",
    // },
  ];
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="bg-transparent font-semibold "
      defaultSelectedKeys={[activeKey]}
    />
  );
};

export default FundingsMenu;
