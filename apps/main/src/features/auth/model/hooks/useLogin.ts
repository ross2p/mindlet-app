import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import { type LoginDto } from "@ross2p/types";
import { useToast } from "@/shared";

export const useLogin = () => {
    const toaster = useToast();
    return useMutation({
        mutationFn: (credentials: LoginDto) => login(credentials),
        onSuccess: (data) => {
            toaster.success(data.message);
        },
        onError: (err) => {
            toaster.error(err.message);
        },
    });
};
