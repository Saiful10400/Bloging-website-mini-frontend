import UpdateingForm from '@/component/UpdateingForm';
import React from 'react';

interface PostData {
    _id: string;
    title: string;
    description: string;
    author: string;
    image: string;
    tags: string[];
}



const UpdateSingleBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params



    const res = await fetch("https://mini-blog-backend-10400.vercel.app/api/post?id=" + id, { cache: "no-store", });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    const post: { statusCode: number, message: string, data: PostData } = await res.json();


    return (
        <div>
            <UpdateingForm postId={post.data._id} post={post.data} />
        </div>
    );
};

export default UpdateSingleBlog;