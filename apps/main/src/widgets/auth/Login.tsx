'use client';

import { LoginForm } from "@features/auth";
import { Card, CardContent, Divider } from "@shared/ui";

export const Login = () => {

  return (
    <Card className="flex justify-center items-center h-screen" padding="lg">
      <CardContent>
        <LoginForm />  
      </CardContent>
      {/* <Divider />  */}
    </Card>
  );
};
