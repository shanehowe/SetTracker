import { Providers } from "./providers";
import "./globals.css"
import { NavBar } from "@/components/NavBar/NavBar";

export default function RootLayout({
    children,
}: {
  children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <body>
                
                {/* @ts-ignore */}
                <Providers>
                    <NavBar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}