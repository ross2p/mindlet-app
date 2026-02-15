import { apiV1Client } from "@/shared";
import { GlobalResponse, UserEntity } from "@ross2p/types";

export const deleteMe = async (): Promise<GlobalResponse<UserEntity>> => {
    const response = await apiV1Client.delete(`/user/me`);
    return response.data;
};