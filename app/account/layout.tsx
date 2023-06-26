import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayoutAccount({
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
                {children}
        </>
    );
}