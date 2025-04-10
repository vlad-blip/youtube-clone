import Categories from "@/modules/home/ui/categories/categories";
import Videos from "@/modules/shared/videos/videos";
import { getPublicUrl } from "@/utils/storage/client";

import { getDataSource } from "@/utils/typeorm/client";
import { Video } from "@/utils/typeorm/entity/video.entity";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string; category: string };
}) {
  const { search, category } = await searchParams;

  const dataSource = await getDataSource();

  const baseQuery = dataSource
    .getRepository(Video)
    .createQueryBuilder("video")
    .leftJoinAndSelect("video.channel", "channel");

  if (category) {
    baseQuery
      .innerJoinAndSelect("video.categories", "category")
      .where("category.id = :category", { category })
      .getMany();
  }

  if (search) {
    baseQuery.andWhere("LOWER(video.title) LIKE LOWER(:search)", {
      search: `%${search}%`,
    });
  }

  const videos = await baseQuery.getMany();

  const items = videos.map((video) => {
    const path = `channel_${video.channel.id}/thumbnails/${encodeURIComponent(
      video.thumbnail_name
    )}`;

    return {
      thumbnail: getPublicUrl(path),
      id: video.id,
      title: video.title,
      views: "1312323",
      duration: video.duration,
      date: new Date(video.created_at).toLocaleString(),
      channel: video.channel,
    };
  });

  return (
    <div className="grid gap-y-10 overflow-hidden px-2">
      <Categories />
      <Videos items={items} />
    </div>
  );
}
