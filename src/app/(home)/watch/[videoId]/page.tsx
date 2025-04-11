import { getDataSource } from "@/utils/typeorm/client";
import { notFound } from "next/navigation";
import { Video } from "@/utils/typeorm/entity/video.entity";
import { getPublicUrl } from "@/utils/storage/client";
import Image from "next/image";
import VideoPlayer from "@/modules/watch/player";
import { Download, ThumbsDown, ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import SideVideos from "@/modules/shared/side-videos/videos";
import { FormEvent } from "react";
import PostComment from "@/modules/shared/comments/post-comment";
import VideoActions from "@/modules/shared/videos/video-actions";
import Description from "@/modules/shared/videos/description";

interface WatchPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { videoId } = await params;

  const dataSource = await getDataSource();
  const videoRepository = await dataSource.getRepository(Video);

  const existingVideo = await videoRepository.findOne({
    where: {
      id: Number(videoId),
    },
    relations: {
      channel: true,
    },
  });

  if (!existingVideo) {
    return notFound();
  }

  const path = `channel_${existingVideo.channel.id}/videos/${encodeURIComponent(
    existingVideo.media_name
  )}`;

  const videoUrl = getPublicUrl(path);

  if (!videoUrl) {
    return notFound();
  }

  const baseQuery = dataSource
    .getRepository(Video)
    .createQueryBuilder("video")
    .leftJoinAndSelect("video.channel", "channel");

  const videos = await baseQuery.getMany();

  const items = videos.map((video) => {
    const path = `channel_${video.channel.id}/thumbnails/${encodeURIComponent(
      video.thumbnail_name
    )}`;

    return {
      thumbnail: getPublicUrl(path),
      id: video.id,
      title: video.title,
      views: video.view_count,
      duration: video.duration,
      date: new Date(video.created_at).toLocaleDateString(),
      channel: video.channel,
    };
  });

  const video = structuredClone(existingVideo);

  return (
    <div className="grid grid-cols-[1fr_0.4fr] gap-4">
      <div>
        <VideoPlayer className="max-h-[500px] rounded-md" videoUrl={videoUrl} />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mt-2">{existingVideo.title}</h2>
          <VideoActions video={video} videoUrl={videoUrl} />
          <Description video={existingVideo} />
          <PostComment />
        </div>
      </div>
      <SideVideos items={items} />
    </div>
  );
}
