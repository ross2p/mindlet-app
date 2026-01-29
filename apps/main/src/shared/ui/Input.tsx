'use client';

import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";

export type InputProps = MuiTextFieldProps;

export const Input = (props: InputProps) => {
  return <MuiTextField {...props} />;
};
