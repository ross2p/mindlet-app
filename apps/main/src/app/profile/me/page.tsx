import { Metadata } from "next";

import { UnauthorisedRoute } from "@/pages/unauthorised-route/UnauthorisedRoute";
import { RegistrationPage } from "@/pages/registration/RegistrationPage";

export const metadata: Metadata = {
  title: "My Profile",
  description: "My profile page",
};

export default function MyProfile() {
  return (
    <UnauthorisedRoute>
      <RegistrationPage />
    </UnauthorisedRoute>
  );
}
