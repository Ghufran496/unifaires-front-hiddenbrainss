import { toast } from "react-hot-toast";

export function handleAxiosError(error: any): string {
  let errorMessage: string = "";
  if (error?.response) {
    if (error.response.status === 400 || error.response.status === 409) {
      errorMessage = "Error occuried";
      if (
        typeof error?.response?.data?.data === "string" &&
        error.response.data.data.trim() !== ""
      ) {
        errorMessage = error.response.data.data;
      } else if (
        typeof error?.response?.message === "string" &&
        error.response.message.trim() !== ""
      ) {
        errorMessage = error.response.message;
      } else if (
        typeof error?.response?.data?.message === "string" &&
        error.response.data.message.trim() !== ""
      ) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    } else if (error.response.status > 400 && error.response.status < 500) {
      if (Array.isArray(error.response.data)) {
        const sanitizedData = error.response.data.map((item: any) =>
          item.replace(/_/g, "").replace(/"/g, "")
        );
        // Join the sanitized array elements with line breaks
        errorMessage = sanitizedData.join("<br>");
      } else if (typeof error.response.data === "string") {
        errorMessage = error.response.data.message
          .replace(/_/g, "")
          .replace(/"/g, "");
      } else if (typeof error?.response?.data?.message === "string") {
        errorMessage = error.response.data.message
          .replace(/_/g, "")
          .replace(/"/g, "");
      }

      toast.error(`${errorMessage}`);
    } else if (error.response.status === 500) {
      toast.error("Oops! an error has occurred please try again");
      errorMessage = "Oops! an error has occurred please try again";
    }
  } else if (error.request) {
    toast.error("Checkout your network connection");
    errorMessage = "Checkout your network connection";
  } else {
    toast.error("Request failed");
    errorMessage = "Request failed";
  }

  return errorMessage;
}
export function handleError(error: any) {
  toast.error(`${error}`);
}

export function showSuccess(message: any) {
  toast.success(`${message}`);
}
export function showError(message: any) {
  toast.error(`${message}`);
}
