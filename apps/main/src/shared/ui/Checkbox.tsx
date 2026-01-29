'use client';

import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from "@mui/material";

export type CheckboxProps = MuiCheckboxProps;

export const Checkbox = (props: CheckboxProps) => {
  return <MuiCheckbox {...props} />;
};
