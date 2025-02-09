import { toast } from "react-hot-toast";

export function showSuccess(message: any) {
  toast.success(message);
}
export function showError(message: any) {
  toast.error(message);
}

export function handleAxiosError(error: any) {
  if (error.response) {
    // The error is an HTTP error with a response object.
    console.log(error.response);

    console.log("Error Status Code:", error.response.status);
    console.log("Error data ", error.response.data);
    console.log(error.response.status === 400);

    if (error.response.status === 400) {
      if (
        error.response.data.message === "validation error" &&
        Array.isArray(error.response.data.data)
      ) {
        const validationErrors = error.response.data.data.map((item: any) =>
          item.replace(/_/g, "").replace(/"/g, "")
        );
        const errorMessage = validationErrors.join(", ");
        showError(errorMessage);
      } else {
        showError(error.response.data.message);
      }
    } else if (error.response.status === 409) {
      showError(error.response.data.message);
    } else if (error.response.status > 400) {
      let errorMessage = "";

      if (Array.isArray(error.response.data)) {
        const sanitizedData = error.response.data.map((item: any) =>
          item.replace(/_/g, "").replace(/"/g, "")
        );
        // Join the sanitized array elements with line breaks
        errorMessage = sanitizedData.join(", ");
      } else if (typeof error.response.data === "string") {
        errorMessage = error.response.data.replace(/_/g, "").replace(/"/g, "");
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message
          .replace(/_/g, "")
          .replace(/"/g, "");
      }

      showError(errorMessage);
    } else if (error.response.status === 500) {
      showError("Network error");
    }
  } else if (error.request) {
    showError("Check your network connection.");
  } else {
    // The error is not related to the HTTP request.
    console.log("Request failed:", error.message);
    showError("Request failed");
  }
}

// export function handleAxiosError(error: any) {
//   if (error.response) {
//     // The error is an HTTP error with a response object.
//     console.log(error.response);

//     console.log("Error Status Code:", error.response.status);
//     console.log("Error data ", error.response.data);
//     console.log(error.response.status === 400);

//     if (error.response.status === 400 || error.response.status === 409) {
//       showError(error.response.data.message);
//     } else if (error.response.status > 400) {
//       let errorMessage = "";

//       if (Array.isArray(error.response.data)) {
//         const sanitizedData = error.response.data.map((item: any) =>
//           item.replace(/_/g, "").replace(/"/g, "")
//         );
//         // Join the sanitized array elements with line breaks
//         errorMessage = sanitizedData.join("<br>");
//       } else if (typeof error.response.data === "string") {
//         errorMessage = error.response.message
//           .replace(/_/g, "")
//           .replace(/"/g, "");
//       }

//       showError(errorMessage);
//     } else if (error.response.status === 500) {
//       showError("Network error");
//     }
//   } else if (error.request) {
//     showError("Check your network connection.");
//   } else {
//     // The error is not related to the HTTP request.
//     console.log("Request failed:", error.message);
//     showError("Request failed");
//   }
// }
