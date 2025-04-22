import Videos from "@/modules/shared/videos/videos";
import { getPublicUrl } from "@/utils/storage/client";

import { getDataSource } from "@/utils/typeorm/client";
import { Video } from "@/utils/typeorm/entity/video.entity";
import Link from "next/link";

export default async function YouPage() {
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
    <div className="grid gap-y-10 overflow-hidden px-2">
      <div className="mt-10">
        <div className="flex justify-between items-center py-2">
          <h3 className="text-2xl font-bold mb-2">History</h3>
          <Link
            className="border-1 border-neutral-700 py-2 px-4 rounded-full font-bold text-[14px] cursor-pointer hover:bg-neutral-700"
            href={"/feed/history"}
          >
            View all
          </Link>
        </div>
        <Videos items={items} size="sm" />
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold mb-2">Watch Later</h3>
          <Link
            className="border-1 border-neutral-700 py-2 px-4 rounded-full font-bold text-[14px] cursor-pointer hover:bg-neutral-700"
            href={"/feed/history"}
          >
            View all
          </Link>
        </div>
        <Videos items={items} size="sm" />
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold mb-2">Liked</h3>
          <Link
            className="border-1 border-neutral-700 py-2 px-4 rounded-full font-bold text-[14px] cursor-pointer hover:bg-neutral-700"
            href={"/feed/history"}
          >
            View all
          </Link>
        </div>
        <Videos items={items} size="sm" />
      </div>
    </div>
  );
}
