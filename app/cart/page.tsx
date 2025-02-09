import CartPage from "@/components/pages/Cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unifaires | Cart",
  description: "Unifaires cart page",
  referrer: "no-referrer",
};

const Cart = () => {
  return <CartPage />;
};

export default Cart;
