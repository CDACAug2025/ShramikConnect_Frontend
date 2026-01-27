import { useEffect, useState } from "react";
import {
  getClientProfile,
  updateClientProfile
} from "../services/clientProfileService";

export const useClientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getClientProfile();
      setProfile(res.data);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (data) => {
    await updateClientProfile(data);
    loadProfile();
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    saveProfile
  };
};
