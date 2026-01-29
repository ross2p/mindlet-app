import { useToast } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import type { CreateUserDto } from "@ross2p/types";

export const useRegistration = () => {
    const { success, error } = useToast();

    return useMutation({
        mutationFn: (credentials: CreateUserDto) => register(credentials),
        onSuccess: (data) => {
            success(data.message);
        },
        onError: (err) => {
            error(err.message);
        },
    });
}