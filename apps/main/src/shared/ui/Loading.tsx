'use client';

import { CircularProgress, CircularProgressProps, Box } from "@mui/material";

export type LoadingProps = CircularProgressProps;

export const Loading = (props: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress {...props} />
    </Box>
  );
};
