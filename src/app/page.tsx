// app/page.tsx

import PostCard from "@/component/PostCard";
import tBlogPost from "@/type";
 

export default async function HomePage() {
 
  const res = await fetch("https://mini-blog-backend-10400.vercel.app/api/post", {cache: "no-store",});

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();
 

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-indigo-600   text-center mt-3 mb-5">Latest Blog Posts</h1>

      {posts?.data.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts?.data?.map((post: tBlogPost) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
