import type { Metadata } from "next";
import SignUpForm from "@/components/forms/SignUpForm";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Register an account for Set Tracker"
}

export default function Page({}) {
    return (
        <>
            <SignUpForm/>
        </>
    )
}