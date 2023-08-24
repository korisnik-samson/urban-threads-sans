import React from 'react'
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import '../globals.css';
import { Metadata } from "next";
import { dark } from "@clerk/themes";
import Image from "next/image";
import { background_two } from "@/public/assets";

export const metadata: Metadata = {
    title: 'Threads',
    description: 'A Next.js 13 Meta Threads Application'
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={ { baseTheme: dark } }>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    <Image src={background_two} alt="background" fill/>
                    <div className="w-full flex justify-center items-center min-h-screen">
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}