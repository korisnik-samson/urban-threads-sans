"use client";

import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import { router } from "next/client";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
        form.reset();

        router.push('/')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field}) => (
                        <FormItem className="flex w-full items-center gap-3">
                            <FormLabel>
                                <Image src={currentUserImg} alt="profile Image" width={48} height={48}
                                className="rounded-fill object-cover" />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input type="text" placeholder="Comment..." className="no-focus text-light-2 outline-none" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">Reply</Button>
            </form>
        </Form>
    );
}

export default Comment;