import React from "react";
import { UserButton } from "@clerk/nextjs";
import { fetchPosts } from "@/lib/actions/thread.actions";

export default async function Home() {
    const result = await fetchPosts();

    return (
        <React.Fragment>
            <h1 className="head-text text-left">Home</h1>
        </React.Fragment>
    );
}