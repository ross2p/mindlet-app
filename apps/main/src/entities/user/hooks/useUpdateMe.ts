import { useToast } from "@/shared";
import { UpdateUserDto } from "@ross2p/types";
import { useMutation } from "@tanstack/react-query";
import { updateMe } from "../api/updateMe";

export const useUpdateMe = () => {
    const toaster = useToast();
    return useMutation({
        mutationFn: (updateUserDto: UpdateUserDto) => updateMe(updateUserDto),
        onSuccess: (data) => {
            toaster.success(data.message);
        },
        onError: (err) => {
            toaster.error(err.message);
        },
    });
}   