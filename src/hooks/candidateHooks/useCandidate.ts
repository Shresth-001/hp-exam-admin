import {
  deleteUser,
  getCandidateById,
} from "@/app/api/candidateApi/candidates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
interface props {
  user_id?: string|null;
}
export const useCandidate = ({ user_id }: props) => {
  const [token, setToken] = useState<string | null>();
  const queryClient = useQueryClient();
  const { data:userData, isLoading, isError, error } = useQuery({
    queryKey: ["user", user_id],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      return await getCandidateById({ user_id, token })
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!user_id,
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (user_id: string) => {
      return await deleteUser({ user_id, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
  });
  return{userData,isLoading,isError,error,deleteUserMutation}
};
