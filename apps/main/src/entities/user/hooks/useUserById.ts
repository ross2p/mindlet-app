import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/getUserById";

export const useUserById = (userId: string) => {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUserById(userId),
    });
}