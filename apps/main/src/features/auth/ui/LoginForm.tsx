'use client';

import { joiResolver } from "@hookform/resolvers/joi";
import {type LoginDto, loginSchema} from "@ross2p/types";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../model/hooks/useLogin";
import { Input, Button } from "@/shared";

export const LoginForm = () => {

    const {mutate: login, isPending} = useLogin()

    const {handleSubmit, control, formState: {errors}} = useForm<LoginDto>({
        resolver: joiResolver(loginSchema),
    })

    const onSubmit = (data: LoginDto) => {
        login(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name="email"
            control={control}
            render={({ field }) => (
            <Input
                {...field}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isPending}
            />
            )}
        />
        <Controller
            name="password"
            control={control}
            render={({ field }) => (
            <Input
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isPending}
            />
            )}
        />
        <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            disabled={isPending}
        >
            {isPending ? 'Loading... ' : 'Login'}
        </Button>
    </form>
    );
};

