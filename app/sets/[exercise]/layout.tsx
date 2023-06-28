import { getServerSession } from "next-auth";
import Head from "next/head";
import { redirect } from "next/navigation";

export default async function AuthLayoutSets({
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
            <Head key={2}>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </Head>
            {/* @ts-ignore */}
            {children}
        </>
    );
}