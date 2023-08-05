import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, '3 characters needed'),
    accountId: z.string(),
});

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, '3 characters needed')
});