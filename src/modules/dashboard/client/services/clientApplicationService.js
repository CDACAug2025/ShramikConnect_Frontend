import axiosInstance from "@/services/axiosInstance";

// ✅ Get all applications for client jobs
export const getClientApplications = async () => {
  const res = await axiosInstance.get("/client/applications");
  return res.data;
};

// ✅ Update application status
export const updateClientApplicationStatus = async (applicationId, status) => {
  const res = await axiosInstance.put(
    `/client/applications/${applicationId}/status`,
    null,
    {
      params: { status },
    }
  );
  return res.data;
};
