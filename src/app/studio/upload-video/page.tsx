"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Image from "next/image";
import { type FormValues } from "./types";
import Select from "react-select";
import { uploadVideo, getCategories } from "./actions";

export default function VideoUploadPage() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { label: string; value: string }[] | undefined
  >([]);

  console.log("categories", categories);

  useEffect(() => {
    getCategories()
      .then((categories) => setCategories(categories))
      .catch((error) => console.error(error));
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await uploadVideo(data);

    console.log("upload video front", response);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const currentTitle = getValues("title");

    if (!currentTitle && file) {
      const customTitle = file.name;

      setValue("title", customTitle);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    } else {
      setVideoPreview(null);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    } else {
      setThumbnailPreview(null);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Upload Video</h1>
          <p className="text-gray-500 mt-1">
            Share your video with the world. Fill out the details below to get
            started.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <input
                id="title"
                type="text"
                required={true}
                placeholder="Add a title that describes your video"
                className={`w-full px-3 py-2 border rounded-md placeholder-neutral-400 text-neutral-600  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Tell viewers about your video"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-neutral-400 text-neutral-600  focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("description")}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categories
              </label>
              <Controller
                name="categories"
                control={control}
                rules={{ required: "Categories is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className={`w-full rounded-md placeholder-neutral-400 text-neutral-600  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    options={categories}
                    isMulti={true}
                  />
                )}
              />
              {errors.categories && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.categories.message}
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <label
                htmlFor="video"
                className="block text-sm font-medium text-gray-700"
              >
                Video *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 placeholder-neutral-400 text-neutral-600 bg-gray-50 ${
                  errors.video ? "border-red-500" : "border-gray-300"
                }`}
              >
                {videoPreview ? (
                  <div className="w-full">
                    <video
                      src={videoPreview}
                      controls
                      className="max-h-[200px] mx-auto mb-2"
                    />
                    <p className="text-sm text-center text-gray-600">
                      Video selected
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Drag and drop your video file here or click to browse
                    </p>
                    <p className="text-xs text-gray-400">
                      MP4, MOV, or AVI up to 10GB
                    </p>
                  </>
                )}
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  className={videoPreview ? "mt-2 w-full" : "hidden"}
                  {...register("video", {
                    required: "Video file is required",
                    onChange: handleVideoChange,
                  })}
                />
                {!videoPreview && (
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => document.getElementById("video")?.click()}
                  >
                    Select Video
                  </button>
                )}
              </div>
              {errors.video && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.video.message}
                </p>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Thumbnail *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 placeholder-neutral-400 text-neutral-600 bg-gray-50 ${
                  errors.thumbnail ? "border-red-500" : "border-gray-300"
                }`}
              >
                {thumbnailPreview ? (
                  <div className="w-full">
                    <Image
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="max-h-[150px] mx-auto mb-2 object-contain"
                      width={400}
                      height={400}
                    />
                    <p className="text-sm text-center text-gray-600">
                      Thumbnail selected
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      Upload a thumbnail image
                    </p>
                    <p className="text-xs text-gray-400">
                      JPG, PNG, or GIF (1280x720 recommended)
                    </p>
                  </>
                )}
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className={thumbnailPreview ? "mt-2 w-full" : "hidden"}
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                    onChange: handleThumbnailChange,
                  })}
                />
                {!thumbnailPreview && (
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() =>
                      document.getElementById("thumbnail")?.click()
                    }
                  >
                    Select Thumbnail
                  </button>
                )}
              </div>
              {errors.thumbnail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-500"
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
