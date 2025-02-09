import CheckoutPage from "@/components/pages/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Checkout ",
  description: "Find Jobs, Courses and Fundings or Scholarships on unifaires",
  referrer: "no-referrer",
};

const Checkout = () => {
  return <CheckoutPage />;
};

export default Checkout;
