/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import EditJobComp from "@/components/shared/manageAccess/Jobs/Edit";
import { useParams, useRouter } from "next/navigation";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-hot-toast";

const EditJob = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [editDatas, setEditDatas] = useState<any>(undefined);
  const params = useParams();
  const jobId = params?.JobId;

  /**
   * Fetch job data
   */
  const fetchJobData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/jobs/${jobId}`);
      if (res?.data?.data) {
        setEditDatas(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Save edited datas
   */
  const saveDatas = async (inputDatas: any) => {
    try {
      const response = await axiosAccessInstance.put(
        `/manage-jobs/user/${jobId}`,
        inputDatas
      );

      if (response.status === 200) {
        toast.success("Job Updated Successfully");
        setCurrentStep((prevState) => {
          return prevState + 1;
        });
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle make payment
   */
  const handleMakePayment = async (jobPayment: any = undefined) => {
    try {
      setLoading(true);
      const payForJob = await axiosAccessInstance.post(
        `/payment/jobs-payment`,
        {
          ...jobPayment,
        }
      );
      if (payForJob.status) {
        toast.success("Payment made Sucessfully");
        setTimeout(function () {
          router.push(`/user/business-access/jobs`);
        }, 2000);
      }
    } catch (error: any) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof jobId === "string" && jobId.trim() !== "") {
      fetchJobData();
    }
  }, [jobId]);

  return (
    <>
      <EditJobComp
        breadCombs={{
          items: [
            { title: "Jobs", href: "/user/business-access/jobs" },
            { title: "Update Jobs" },
          ],
        }}
        pageLoading={loading}
        setPageLoading={(isLoading: boolean = false) => {
          setLoading(isLoading);
        }}
        steps={{
          current: currentStep,
          setCurrent: (stepNo: number = 0) => {
            setCurrentStep(stepNo);
          },
        }}
        handleSave={saveDatas}
        jobInfo={editDatas}
        fetchDatas={fetchJobData}
        makePayment={handleMakePayment}
      />
    </>
  );
};

export default EditJob;
