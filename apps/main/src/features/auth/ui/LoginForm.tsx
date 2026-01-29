'use client';

import { joiResolver } from "@hookform/resolvers/joi";
import { LoginDto, loginSchema } from "@ross2p/types";
import { useForm } from "react-hook-form";
import { useLogin } from "../model/hooks/useLogin";

export const LoginForm = () => {

    const {mutate: login} = useLogin()

    const {handleSubmit} = useForm<LoginDto>({
        resolver: joiResolver(loginSchema),
    })

    const onSubmit = (data: LoginDto) => {
        login(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

        
    </form>
  );
};
