"use client";

import { ProfileUpdateForm } from "@features/profile";
import { Card, CardContent } from "@shared/ui";

export const ProfileUpdate = () => {
  return (
    <Card>
      <CardContent>
        <ProfileUpdateForm />
      </CardContent>
    </Card>
  );
};
