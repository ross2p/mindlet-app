import { Metadata } from "next";


import { UnauthorisedRoute } from "@/pages/unauthorised-route/UnauthorisedRoute";
import { RegistrationPage } from "@/pages/registration/RegistrationPage";

export const metadata: Metadata = {
  title: "Registration",
  description: "Registration page",
};

export default function Registration() {
    return (
        <UnauthorisedRoute>
            <RegistrationPage />
        </UnauthorisedRoute>
    )
}