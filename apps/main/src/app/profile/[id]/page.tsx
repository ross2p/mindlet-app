import { Metadata } from "next";

import { UnauthorisedRoute } from "@/pages/unauthorised-route/UnauthorisedRoute";
import { RegistrationPage } from "@/pages/registration/RegistrationPage";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page",
};

export default function Profile() {
  return (
    <UnauthorisedRoute>
      <RegistrationPage />
    </UnauthorisedRoute>
  );
}
