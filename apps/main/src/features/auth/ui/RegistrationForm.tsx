'use client';

import { joiResolver } from "@hookform/resolvers/joi";
import { type CreateUserDto, createUserSchema } from "@ross2p/types";
import { useForm } from "react-hook-form";
import { useRegistration } from "../model/hooks/useRegistration";

export const RegistrationForm = () => {

    const {mutate: register} = useRegistration()

    const {handleSubmit} = useForm<CreateUserDto>({
        resolver: joiResolver(createUserSchema),
    })

    const onSubmit = (data: CreateUserDto) => {
        register(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

        
    </form>
  );
};
