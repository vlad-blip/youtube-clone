"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Upload } from "lucide-react";
import { type FormValues } from "./types";
import { type Channel } from "@/utils/typeorm/entity/channel.entity";
import { getUserChannel } from "./actions";

export default function ChannelPage() {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<null | string>();

  console.log("channel", channel);

  useEffect(() => {
    getUserChannel()
      .then((response) => setChannel(response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
    // const response = await uploadVideo(data);
    // console.log("upload video front", response);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Channel</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Channel title *
            </label>
            <input
              id="title"
              type="text"
              required={true}
              placeholder="Add a title for your channel"
              className={`w-full px-3 py-2 border rounded-md placeholder-neutral-400 text-neutral-600  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              value={channel?.title}
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
              placeholder="Tell viewers about your channel"
              rows={4}
              value={channel?.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-neutral-400 text-neutral-600  focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description")}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 placeholder-neutral-400 text-neutral-600 bg-gray-50 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            >
              {imagePreview ? (
                <div className="w-full">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
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
                id="image"
                type="file"
                accept="image/*"
                className={imagePreview ? "mt-2 w-full" : "hidden"}
                {...register("image", {
                  required: "Image is required",
                  onChange: handleThumbnailChange,
                })}
              />
              {!imagePreview && (
                <button
                  type="button"
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => document.getElementById("thumbnail")?.click()}
                >
                  Select Thumbnail
                </button>
              )}
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-neutral-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
