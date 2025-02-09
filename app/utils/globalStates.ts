import axiosInstance from "./axios-config";
import { getSession } from "next-auth/react";

export const getUserType = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.roleId) {
      console.error("User role ID not available in the session.");
      return null;
    }

    const response = await axiosInstance.get(`/roles/${session.user.roleId}`);
    const data = response.data;

    if (!data || !data.data || !data.data.title) {
      console.error("Error: Role title not found in the response.");
      return null;
    }

    const userRoleTitle = data.data.title;
    // console.log("User Role Title:", userRoleTitle);
    return userRoleTitle;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

export const userCart = async () => {
  try {
    const fetchCart = await axiosInstance.get("/cart/my-cart");
    if (fetchCart) {
      // console.log("hereee", fetchCart.data);
      return fetchCart.data;
    }
  } catch (error) {
    console.log("Error getting userCart", error);
  }
};
