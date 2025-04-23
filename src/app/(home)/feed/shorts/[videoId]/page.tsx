import { getDataSource } from "@/utils/typeorm/client";
import { notFound } from "next/navigation";
import { Video, VideoType } from "@/utils/typeorm/entity/video.entity";
import { getPublicUrl } from "@/utils/storage/client";
import VideoPlayer from "@/modules/watch/player";
import SideVideos from "@/modules/shared/side-videos/videos";
import PostComment from "@/modules/shared/comments/post-comment";
import VideoActions from "@/modules/shared/videos/video-actions";
import Image from "next/image";
import Description from "@/modules/shared/videos/description";
import { createClient } from "@/utils/supabase/server";
import { Reaction, ReactionType } from "@/utils/typeorm/entity/reaction.entity";
import { videoView } from "@/modules/shared/videos/actions";
import { Subscription } from "@/utils/typeorm/entity/subscription.entity";
import { Suspense } from "react";
import {
  ArrowBigDown,
  ArrowDown,
  ArrowUp,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";

interface IShortsPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export default async function ShortsPage({ params }: IShortsPageProps) {
  const { videoId } = await params;

  const dataSource = await getDataSource();
  const videoRepository = await dataSource.getRepository(Video);

  const existingVideo = await videoRepository.findOne({
    where: {
      id: Number(videoId),
    },
    relations: {
      channel: true,
      reactions: true,
    },
  });

  if (!existingVideo) {
    return notFound();
  }

  videoView({ videoId: Number(videoId) });

  let reactionPromise: Promise<ReactionType | null> = Promise.resolve(null);
  let subscriptionPromise: Promise<number | null> = Promise.resolve(null);

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    const [reactionsRepository, subscriptionsRepository] = await Promise.all([
      dataSource.getRepository(Reaction),
      dataSource.getRepository(Subscription),
    ]);

    reactionPromise = reactionsRepository
      .findOne({
        where: {
          video: {
            id: Number(videoId),
          },
          user_id: data.user.id,
        },
      })
      .then((reaction) => reaction?.type ?? null);

    subscriptionPromise = subscriptionsRepository
      .findOne({
        where: {
          channel: {
            id: Number(existingVideo.channel.id),
          },
          user_id: data.user.id,
        },
      })
      .then((result) => result?.id ?? null);
  }

  const path = `channel_${existingVideo.channel.id}/videos/${encodeURIComponent(
    existingVideo.media_name
  )}`;

  const videoUrl = getPublicUrl(path);

  if (!videoUrl) {
    return notFound();
  }

  const video = structuredClone(existingVideo);

  return (
    <div className="flex items-center px-6">
      <div className="m-auto h-full flex items-center gap-2">
        <div className="relative max-w-[350px] h-full">
          <VideoPlayer
            className="w-full h-full rounded-md"
            videoUrl={videoUrl}
            style={{ height: "100%" }}
          />
          <div className="flex flex-col gap-4 absolute bottom-20">
            <div className="flex items-center gap-2">
              <Link href={`/channels/${video.channel.id}`}>
                <Image
                  src={"/globe.svg"}
                  width={30}
                  height={30}
                  alt={`${video.channel.title} image`}
                />
              </Link>
              <Link href={`/channels/${video.channel.id}`}>
                <h3 className="font-semibold">{video.channel.title}</h3>
              </Link>
              <button className="px-3 py-1 bg-white text-black rounded-full text-[12px] font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-md">{existingVideo.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 items-center flex-col">
            <button className="bg-neutral-800 rounded-full p-3 hover:bg-neutral-600 cursor-pointer">
              <ThumbsUp />
            </button>
            <p className="font-semibold">{video.like_count}</p>
          </div>
          <div className="flex gap-1 items-center flex-col">
            <button className="bg-neutral-800 rounded-full p-3 hover:bg-neutral-600 cursor-pointer">
              <ThumbsDown />
            </button>
            <p className="font-semibold">{video.dislike_count}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="bg-neutral-800 rounded-full p-4 hover:bg-neutral-600 cursor-pointer">
          <ArrowUp />
        </button>
        <button className="bg-neutral-800 rounded-full p-4 hover:bg-neutral-600 cursor-pointer">
          <ArrowDown />
        </button>
      </div>
    </div>
  );
}
