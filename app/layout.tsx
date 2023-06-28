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