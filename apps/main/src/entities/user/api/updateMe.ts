import { UpdateUserDto } from "@ross2p/types";
import { apiV1Client } from "@/shared";
import { type GlobalResponse, type UserEntity } from "@ross2p/types";

export const updateMe = async (user: UpdateUserDto): Promise<GlobalResponse<UserEntity>> => {
    const response = await apiV1Client.patch(`/user/me`, user);
    return response.data;
};