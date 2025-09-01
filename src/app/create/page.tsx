"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image: "",
    tags: "",
  });
  const [imageloading, setImageLoading] = useState(false);
  const [submitloading, setsubmitLoading] = useState(false);

  const IMGBB_API_KEY = "1dee2a8fb008a9e4013e3fcb8506eceb";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      setImageLoading(true);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formDataImg,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setsubmitLoading(true);

      // 🔥 Replace `/api/posts` with your actual backend API endpoint
      const response = await axios.post("https://mini-blog-backend-10400.vercel.app/api/post", newPost);

      console.log("Post submitted successfully:", response.data);
      alert("Post created successfully ✅");

      // reset form after success
      setFormData({
        title: "",
        description: "",
        author: "",
        image: "",
        tags: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error submitting post:", error.response?.data || error.message);
      } else {
        console.error("Error submitting post:", error);
      }
      alert("Failed to submit post ❌");
    } finally {
      setsubmitLoading(false);
    }
  };

  return (
    <div className="  mx-auto mt-10 bg-black text-white  p-8 pt-5 rounded-b-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-indigo-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-indigo-400"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm mb-1">Author</label>
          <input 
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-indigo-400"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input required
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-2 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none"
          />
          {imageloading && <p className="text-indigo-400 mt-2">Uploading...</p>}
          {formData.image && (
            <Image
              width={160}
              height={160}
              src={formData.image}
              alt="Preview"
              className="mt-3 rounded-lg w-40 border border-gray-700"
            />
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm mb-1">Tags (comma separated)</label>
          <input required
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. typescript, javascript, programming"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-indigo-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg cursor-pointer bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
          disabled={submitloading || imageloading || !formData.image}
        >
          {submitloading ? "Submitting..." : "Submit Post"}
        </button>
      </form>
    </div>
  );
}
