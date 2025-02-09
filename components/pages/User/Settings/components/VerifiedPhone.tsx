"use client";
import VerifedPhone from "@/public/verified-phone.svg";
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const VerifiedPhone = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={VerifedPhone} {...props} />
);

export default VerifiedPhone;
