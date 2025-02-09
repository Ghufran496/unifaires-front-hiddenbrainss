"use client";
import { useState } from "react";
import CreateJobPage from "@/components/shared/manageAccess/Jobs/Create";
import axiosInstance from "@/app/utils/axios-config";
import { useAppSelector } from "@/redux/hooks";
import { getCookie } from "cookies-next";
import logo from "@/public/images/logo.png";
import { handleAxiosError } from "@/app/utils/axiosError";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CreateJob = () => {
  const [currentStepNo, setCurrentStepNo] = useState<number>(0);
  const [createFormDatas, setCreateFormDatas] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [jobCatId, setJobCatId] = useState<string>("");
  const router = useRouter();
  const myProfile: any = useAppSelector(
    (state: RootState) => state.user.myProfile
  );
  const myAddress: any = useAppSelector(
    (state: RootState) => state.address.defaultAddress
  );

  /**
   * Get full url
   */
  const getFullUrl = (relativePath: any) => {
    const host =
      (typeof window !== "undefined" && window.location.origin) ||
      "http://localhost:3000"; // Fallback to localhost
    return `${host}${
      relativePath.startsWith("/") ? relativePath : `/${relativePath}`
    }`;
  };

  /**
   * Get contact JSON parse
   */
  const getContactJSONParse = (inputStr: string = ""): any => {
    try {
      const result = JSON.parse(inputStr);
      return {
        address1:
          typeof result?.data?.regionName === "string" &&
          result.data.regionName.trim() !== ""
            ? result.data.regionName
            : "NA",
        city:
          typeof result?.data?.city === "string" &&
          result.data.city.trim() !== ""
            ? result.data.city
            : "NA",
        state:
          typeof result?.data?.regionName === "string" &&
          result.data.regionName.trim() !== ""
            ? result.data.regionName
            : "NA",
        zipcode:
          typeof result?.data?.zip === "string" && result.data.zip.trim() !== ""
            ? result.data.zip
            : "NA",
        country:
          typeof result?.data?.country === "string" &&
          result.data.country.trim() !== ""
            ? result.data.country
            : "NA",
      };
    } catch (error) {
      return {
        address1: "NA",
        city: "NA",
        state: "NA",
        zipcode: "NA",
        country: "NA",
      };
    }
  };

  /**
   * Handle job save
   */
  const handleJobSave = async () => {
    try {
      setLoading(true);
      let response = undefined;
      let data = {
        ...createFormDatas,
        jobcategoryId: jobCatId,
      };
      data.contact = [
        {
          firstname: myProfile.firstname,
          lastname: myProfile.lastname,
          email: myProfile.email,
          profileMediaUrl:
            myProfile.imageUrl && myProfile.imageUrl.trim() !== ""
              ? myProfile.imageUrl
              : getFullUrl(logo.src),
          ...getContactJSONParse(getCookie("ipInfo")),
        },
      ];
      response = await axiosInstance.post(`/jobs/`, data);
      if (response?.data?.data?.id) {
        toast.success("Job Saved Successfully");
        router.push("/business/jobs/create/" + response.data.data.id);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateJobPage
      breadCombs={{
        items: [
          { title: "Jobs", href: `/business/jobs` },
          { title: "Create Jobs" },
        ],
      }}
      steps={{
        current: currentStepNo,
        setCurrent: (stepNo: number) => {
          if ([0, 1].includes(stepNo)) {
            setCurrentStepNo(stepNo);
          }
        },
        requestBody: createFormDatas,
        setRequestBody: (formObj: any) => {
          setCreateFormDatas(formObj);
        },
        nextPage: () => {
          if (typeof currentStepNo === "number" && currentStepNo === 0) {
            setCurrentStepNo(1);
          }
        },
        prevPage: () => {
          if (typeof currentStepNo === "number" && currentStepNo === 1) {
            setCurrentStepNo(0);
          }
        },
      }}
      pageLoading={loading}
      setPageLoading={(loadingStatus: boolean) => {
        setLoading(loadingStatus);
      }}
      handleSave={handleJobSave}
      setJobCategoryId={(catId: string) => {
        setJobCatId(catId);
      }}
    />
  );
};

export default CreateJob;
