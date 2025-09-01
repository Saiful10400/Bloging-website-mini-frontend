
import Image from 'next/image';
import React from 'react';
interface PostData {
  id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  tags: string[];
}
 


const Blog = async ({params}:{params:Promise<{ id: string }>}) => {

 const {id}=await params

    const res = await fetch("https://mini-blog-backend-10400.vercel.app/api/post?id=" +id, { cache: "no-store", });

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    const post:{statusCode:number,message:string,data:PostData} = await res.json();



    return (
        <div className="  mx-auto bg-gray-900 text-white rounded-2xl shadow-xl overflow-hidden   p-2 lg:p-6 my-6">
            {/* Image */}
            <div className="w-full h-[30vh] md:h-[50vh] relative mb-4">
                <Image
                    height={300}
                    width={500}
                    src={post?.data.image}
                    alt={post?.data.title}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">{post?.data.title}</h2>

            {/* Author */}
            <p className="text-gray-400 text-sm mb-4">By {post?.data.author}</p>

            {/* Description */}
            <div className="prose prose-invert mb-4">
                <p>{post?.data.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {post?.data.tags.map((tag: string) => (
                    <span
                        key={tag}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Blog;