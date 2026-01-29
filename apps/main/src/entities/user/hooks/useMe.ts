import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/me";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    });
}