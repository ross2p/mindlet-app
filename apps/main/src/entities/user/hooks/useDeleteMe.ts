import { useToast } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { deleteMe } from "../api/deleteMe";

export const useDeleteMe = () => {
    const toaster = useToast();
    return useMutation({
        mutationFn: () => deleteMe(),
        onSuccess: (data) => {
            toaster.success(data.message);
        },
        onError: (err) => {
            toaster.error(err.message);
        },
    });
}   