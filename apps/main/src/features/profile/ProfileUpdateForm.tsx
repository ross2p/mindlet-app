"use client";

import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "@/shared";
import { UpdateUserDto, updateUserSchema } from "@ross2p/types";
import { useUpdateMe } from "@/entities/user";

export const ProfileUpdateForm = () => {
  const { mutate: updateMe, isPending } = useUpdateMe();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: joiResolver(updateUserSchema),
  });

  const onSubmit = (data: UpdateUserDto) => {
    updateMe(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ""}
            label="First Name"
            type="text"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={isPending}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ""}
            label="Last Name"
            type="text"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            disabled={isPending}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ""}
            label="Email"
            type="email"
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
            value={field.value ?? ""}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isPending}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ""}
            label="Phone"
            type="tel"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            disabled={isPending}
          />
        )}
      />
      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? "Loading... " : "Login"}
      </Button>
    </form>
  );
};
