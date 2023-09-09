import React from "react";

interface ThreadPost {
    post_id: string;
    likes: number;
    replies: number;
    forwards: number;
    num_threads: number;
    num_tags: number;
}

export default function suggestPosts(posts: ThreadPost[]) {
    // Define weights for each factor
    const weights = {
        likes: 2,
        replies: 3,
        forwards: 1.5,
        num_threads: 2.5,
        num_tags: 1,
    };

    /*for (const post of posts) {
        post['score'] = (post.likes * weights.likes + post.replies * weights.replies +
        post.forwards * weights.forwards + post.num_threads * weights.num_threads +
        post.num_tags * weights.num_tags);
    }*/

    // Sort posts based on score in descending order
    // return posts.slice().sort((a: ThreadPost, b: ThreadPost) => b['score'] - a['score']);
}