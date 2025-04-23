import { getDataSource } from "@/utils/typeorm/client";
import { notFound } from "next/navigation";
import { Video } from "@/utils/typeorm/entity/video.entity";
import { getPublicUrl } from "@/utils/storage/client";
import VideoPlayer from "@/modules/watch/player";
import SideVideos from "@/modules/shared/side-videos/videos";
import PostComment from "@/modules/shared/comments/post-comment";
import VideoActions from "@/modules/shared/videos/video-actions";
import Description from "@/modules/shared/videos/description";
import { createClient } from "@/utils/supabase/server";
import { Reaction, ReactionType } from "@/utils/typeorm/entity/reaction.entity";
import { videoView } from "@/modules/shared/videos/actions";
import { Subscription } from "@/utils/typeorm/entity/subscription.entity";
import { Suspense } from "react";
import Comments from "@/modules/shared/comments/comments";
import CommentsSection from "@/modules/home/ui/sections/comments-section";
import { Comment } from "@/utils/typeorm/entity/comment.entity";
import { User } from "@supabase/supabase-js";

interface WatchPageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export async function generateMetadata({ params }: WatchPageProps) {
  const { videoId } = await params;

  const dataSource = await getDataSource();
  const videoRepository = await dataSource.getRepository(Video);

  const existingVideo = await videoRepository.findOne({
    where: {
      id: Number(videoId),
    },
    select: {
      title: true,
    },
  });

  if (!existingVideo) return null;

  return {
    title: existingVideo.title,
  };
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

  const baseQuery = dataSource
    .getRepository(Video)
    .createQueryBuilder("video")
    .leftJoinAndSelect("video.channel", "channel");

  const videos = baseQuery.getMany();

  const itemsPromise = videos.then(async (videos) => {
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

    return items;
  });

  const video = structuredClone(existingVideo);

  const DUMMY_COMMENTS: (Pick<Comment, "content" | "created_at" | "id"> & {
    profle: { name: string };
  })[] = [
    {
      content: "test content",
      profle: {
        name: "Test name",
      },
      created_at: new Date(),
      id: 1,
    },
    {
      content: "test content 2",
      profle: {
        name: "Test name 2",
      },
      created_at: new Date(),
      id: 2,
    },
    {
      content: "test content 3",
      profle: {
        name: "Test name 3",
      },
      created_at: new Date(),
      id: 3,
    },
  ];

  return (
    <div className="grid grid-cols-[1fr_0.4fr] gap-4">
      <div>
        <VideoPlayer className="max-h-[500px] rounded-md" videoUrl={videoUrl} />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mt-2">{existingVideo.title}</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <VideoActions
              video={video}
              videoUrl={videoUrl}
              reactionPromise={reactionPromise}
              subscriptionPromise={subscriptionPromise}
            />
          </Suspense>
          <Description
            video={{
              created_at: existingVideo.created_at,
              description: existingVideo.description,
              view_count: existingVideo.view_count,
            }}
          />
          <CommentsSection commentsCount={12032} items={DUMMY_COMMENTS} />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SideVideos itemsPromise={itemsPromise} />
      </Suspense>
    </div>
  );
}
