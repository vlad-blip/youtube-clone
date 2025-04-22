import Videos from "@/modules/shared/videos/videos";
import { getPublicUrl } from "@/utils/storage/client";

import { getDataSource } from "@/utils/typeorm/client";
import { Video } from "@/utils/typeorm/entity/video.entity";

export default async function SubscriptionsPage() {
  const dataSource = await getDataSource();
  const videoRepository = await dataSource.getRepository(Video);

  const videos = await videoRepository.find({
    take: 4,
    relations: {
      channel: true,
    },
  });

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
      <Videos items={items} size="md" />
    </div>
  );
}
