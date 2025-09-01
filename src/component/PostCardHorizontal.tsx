import tBlogPost from '@/type';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
const PostCardHorizontal = ({ post }: { post: tBlogPost }) => {


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Link href={"update/"+post._id} className="block border border-gray-800  rounded-b-sm hover:shadow-gray-700  bg-gray-800 shadow-2xl duration-500 rounded-t-md">
            <div className="flex items-center p-4">
                {/* Image Section */}
                <div className="w-20 h-20 flex-shrink-0 mr-4">
                    <Image
                        width={80}
                        height={80}
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-md"

                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h2 className="text-lg font-semibold  mb-1 truncate hover:text-blue-600 transition-colors cursor-pointer">
                        {post.title}
                    </h2>

                    {/* Description - Single Line */}
                    <p className="  text-sm mb-2 truncate">
                        {post.description}
                    </p>

                    {/* Tags and Meta Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-xs  ">{post.author}</span>
                            <span className="text-xs  ">•</span>
                            <time className="text-xs  ">
                                {formatDate(post.createdAt)}
                            </time>
                        </div>

                        {/* Tags - Show only first 2 */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-1">
                                {post.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {post.tags.length > 2 && (
                                    <span className="text-xs   ml-1">
                                        +{post.tags.length - 2}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCardHorizontal;