"use client";
// next
import Link from "next/link";
// antd components
import { Menu } from "antd";
import { useAppSelector } from "@/redux/hooks";

interface JobsMenuProps {
  activeKey: string;
}

const JobsMenu = ({ activeKey }: JobsMenuProps) => {
  const appliedJobs = useAppSelector((state: any) => state.job.myJobs);
  const savedJobs = useAppSelector((state: any) => state.job.savedJobs);
  const acceptedJobs = useAppSelector((state: any) => state.job.acceptedJobs);
  const interviewedJobs = useAppSelector(
    (state: any) => state.job.interviewedJobs
  );
  const rejectedJobs = useAppSelector((state: any) => state.job.rejectedJobs);
  const withdrawnJobs = useAppSelector((state: any) => state.job.withdrawnJobs);
  const archivedJobs = useAppSelector((state: any) => state.job.archivedJobs);
  const items = [
    {
      label: <Link href="/user/jobs">{`Applied (${appliedJobs.length})`}</Link>,
      key: "my-jobs",
    },
    {
      label: (
        <Link href="/user/jobs/saved-jobs">{`Saved (${savedJobs.length})`}</Link>
      ),
      key: "saved",
    },
    {
      label: (
        <Link href="/user/jobs/interviews">{`Interviews (${interviewedJobs.length})`}</Link>
      ),
      key: "interviews",
    },
    {
      label: (
        <Link href="/user/jobs/accepted-jobs">{`Accepted (${acceptedJobs.length})`}</Link>
      ),
      key: "accepted",
    },
    {
      label: (
        <Link href="/user/jobs/rejected-jobs">{`Rejected (${rejectedJobs.length})`}</Link>
      ),
      key: "rejected",
    },
    // {
    //   label: (
    //     <Link href="/user/jobs/archive">{`Archived (${archivedJobs.length})`}</Link>
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

export default JobsMenu;
