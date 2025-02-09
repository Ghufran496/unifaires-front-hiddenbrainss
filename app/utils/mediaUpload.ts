
import axiosInstance from "./axios-config";
import { handleAxiosError, showSuccess } from "./axiosError";

export async function uploadToAPI(file: any) {
  const formData = new FormData();
  formData.append("media", file);

  try {
    const imgRes = await axiosInstance.post("/media", formData);
    if (imgRes.status) {
      const isImage = file.type?.startsWith("image/");
      const isVideo = file.type?.startsWith("video/");
      if (isImage) {
        // showSuccess("Image uploaded successfully.");
        return imgRes.data.data.url;
      } else if (isVideo) {
        showSuccess("Video uploaded successfully.");
        return imgRes.data.data.url;
      } else {
        showSuccess("File Uploaded Successfully");
        return imgRes.data.data.url;
      }
    }
  } catch (error) {
    handleAxiosError(error);
    // toast.error("Image Upload Failed, try again.");
  }
}
