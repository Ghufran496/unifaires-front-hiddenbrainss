import Loading from "@/app/loading";
import CourseCheckout from "@/components/pages/CourseCheckout";
import { Metadata } from "next";
import { Suspense } from "react";
// app components

export const metadata: Metadata = {
  title: "Unifaires | Course Checkout ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Checkout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CourseCheckout />
    </Suspense>
  );
};

export default Checkout;
