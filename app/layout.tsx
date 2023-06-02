// app/layout.tsx
import { Providers } from "./providers";

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
                    {children}
                </Providers>
            </body>
        </html>
    );
}