import Videos from "@/modules/shared/videos/videos";
import { getPublicUrl } from "@/utils/storage/client";

import { getDataSource } from "@/utils/typeorm/client";
import { createClient } from "@/utils/supabase/server";
import { Video } from "@/utils/typeorm/entity/video.entity";
import { redirect } from "next/navigation";
import { Subscription } from "@/utils/typeorm/entity/subscription.entity";
import { In } from "typeorm";

export default async function SubscriptionsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const dataSource = await getDataSource();

  if (!user) {
    return redirect("/login");
  }

  const subscriptionsRepository = await dataSource.getRepository(Subscription);
  const videosRepository = await dataSource.getRepository(Video);

  const subscriptions = await subscriptionsRepository.find({
    where: {
      user_id: user.id,
    },
    relations: {
      channel: true,
    },
  });

  console.log("subbs", subscriptions);

  let videos: Video[] | [] = [];

  if (subscriptions.length) {
    const subscribedChannels = subscriptions.map(
      (subscription) => subscription.channel?.id
    );

    console.log("sub channels", subscribedChannels);

    videos = await videosRepository.find({
      where: {
        channel: {
          id: In(subscribedChannels),
        },
      },
      relations: {
        channel: true,
      },
    });
  }

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

  return (
    <div className="grid gap-y-2 overflow-hidden px-2">
      <h1 className="text-2xl font-bold">Latest</h1>
      {videos.length === 0 ? (
        <p>You are not subscribed to any channel</p>
      ) : (
        <Videos items={items} size="md" />
      )}
    </div>
  );
}
