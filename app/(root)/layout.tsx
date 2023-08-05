import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSidebar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ModernThreads®',
    description: 'A Next.js 13 Meta Threads Application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <TopBar />
                    <main className= "flex flex-grow">
                        <LeftSideBar />
                        <section className="main-container">
                            <div className="w-full max-w-4xl">
                                {children}
                            </div>
                        </section>
                        <RightSideBar />
                    </main>
                    <BottomBar />
                </body>
            </html>
        </ClerkProvider>
    )
}
