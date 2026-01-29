import { apiV1Client } from "@/shared";
import { type GlobalResponse, type UserEntity } from "@ross2p/types";

export const getMe = async (): Promise<GlobalResponse<UserEntity>> => {
    const response = await apiV1Client.get("/user/me");
    return response.data;
};