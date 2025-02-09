import Login from "@/components/pages/Auth/Login";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Unifaires | Login",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const CeoMessage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
};

export default CeoMessage;
