"use server"

import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDB();

        const createdThread = await Thread.create({
            text, author, community: null,
        });

        await User.findByIdAndDelete(author, {
            $push: {threads: createdThread._id}
        });

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //calculate number of posts to be skipped
    const skipAmount = (pageNumber - 1) * pageSize;

    //find threads with no parents (top-level threads
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount).limit(pageSize).populate({ path: 'author', user: User })
        .populate({
            path: 'children',
            path: 'author',
            model: User,
            select: "_id name parentId image"
        })

    const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });
    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}