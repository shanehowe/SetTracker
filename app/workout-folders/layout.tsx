import { getServerSession } from "next-auth";
import { Providers } from "../providers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
  children: React.ReactNode;
}) {
    const session = await getServerSession()
    if (!session) {
        return redirect("/")
    }
    return (
        <>
                {/* @ts-ignore */}
                <Providers>
                    {children}
                </Providers>
        </>
    );
}