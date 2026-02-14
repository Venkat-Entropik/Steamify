import { useQuery } from "@tanstack/react-query";
import authServices from "../services/auth.services";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await authServices.getCurrentUser();
        return res.data;
      } catch (error) {
        console.error("error", error);
        return null;
      }
    },
    retry: false,
  });

  return { isLoading: authUser.isLoading, authData: authUser };
};

export default useAuthUser;
