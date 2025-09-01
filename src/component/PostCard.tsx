import tBlogPost from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostCard = ({ post }: { post: tBlogPost }) => {
  return (
    <Link
      href={`/blog/${post._id}`}
      className="block border border-gray-800 rounded-b-sm hover:shadow-gray-700 hover:scale-105 shadow-2xl duration-500 rounded-t-md"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <Image
          width={400}
          height={200}
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-md transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="bg-gray-900/80 backdrop-blur-md px-3 pb-4 pt-2  shadow-xl  hover:shadow-2xl  cursor-pointer">


        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 text-indigo-400 hover:text-indigo-300 transition">
          {post.title}
        </h2>

        {/* Author and Date */}
        <p className="text-gray-400 text-sm mb-2">
          By <span className="font-medium text-white">{post.author}</span> •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0,3)?.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-xs bg-indigo-800/50 text-indigo-300 px-2 py-1 rounded-full backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
