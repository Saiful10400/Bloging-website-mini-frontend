import PostCardHorizontal from '@/component/PostCardHorizontal';
import tBlogPost from '@/type';
import React from 'react';

export default async function Update() {
 
  const res = await fetch("https://mini-blog-backend-10400.vercel.app/api/post", {cache: "no-store",});

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();
 

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-indigo-600   text-center mt-3 mb-5">Update Blog Posts</h1>

      {posts?.data.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {posts?.data?.map((post: tBlogPost) => (
            <PostCardHorizontal key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
