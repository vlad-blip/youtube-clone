"use server";

import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormValues } from "./types";
import { Video } from "@/utils/typeorm/entity/video.entity";
import { getDataSource } from "@/utils/typeorm/client";
import { uploadFile } from "@/utils/storage/client";
import { Channel } from "@/utils/typeorm/entity/channel.entity";
import { Category } from "@/utils/typeorm/entity/category.entity";
import { In } from "typeorm";

export async function uploadVideo(formData: FormValues) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (!data.user || error) {
      return redirect("/login");
    }

    const dataSource = await getDataSource();
    const channelsRepository = await dataSource.getRepository(Channel);

    const existingChannel = await channelsRepository.findOne({
      where: {
        user: data.user.id,
      },
    });

    if (!existingChannel) {
      throw new Error("Channel not found");
    }

    const [videoFile] = formData.video;
    const [thumbnailFile] = formData.thumbnail;

    const [buffer, thumbnailBuffer] = await Promise.all([
      videoFile.arrayBuffer(),
      thumbnailFile.arrayBuffer(),
    ]);

    const bytes = Buffer.from(buffer);
    const fileName = `${uuidv4()}-${videoFile.name}`;
    const path = `channel_${existingChannel.id}/videos/${fileName}`;

    const thumnbnailBytes = Buffer.from(thumbnailBuffer);
    const thumnbnailFilename = `${uuidv4()}-${thumbnailFile.name}`;
    const thumnbnailPath = `channel_${existingChannel.id}/thumbnails/${thumnbnailFilename}`;

    await Promise.all([
      uploadFile({ bytes, contentType: videoFile.type, fileName, path }),
      uploadFile({
        bytes: thumnbnailBytes,
        contentType: videoFile.type,
        fileName: thumnbnailFilename,
        path: thumnbnailPath,
      }),
    ]);

    const video = new Video();

    video.channel = existingChannel;
    video.description = formData.description;
    video.duration = 31323;
    video.file_size = videoFile.size;
    video.media_name = fileName;
    video.status = "test";
    video.thumbnail_name = thumnbnailFilename;
    video.title = formData.title;
    video.type = "video";

    const categoriesRepository = await dataSource.getRepository(Category);

    const categories = await categoriesRepository.find({
      where: {
        id: In(formData.categories.map((category) => Number(category.value))),
      },
    });

    video.categories = categories;

    const videoRepository = await dataSource.getRepository(Video);

    const savedVideo = await videoRepository.save(video);

    return redirect(`/watch/${savedVideo.id}`);
  } catch (error) {
    if (error instanceof Error && error?.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("[server uploadVideo]", error);

    return { error };
  }
}

export async function getCategories() {
  try {
    const dataSource = await getDataSource();
    const categoriesRepository = await dataSource.getRepository(Category);
    const categories = await categoriesRepository.find();

    const categoriesOptions = categories.map((category) => ({
      label: category.title,
      value: String(category.id),
    }));

    console.log("categoriesOptions", categoriesOptions);

    return categoriesOptions;
  } catch (error) {
    console.error("[getCategories]", error);
  }
}
