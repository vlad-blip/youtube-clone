import { getDataSource } from "@/utils/typeorm/client";
import { notFound } from "next/navigation";
import { Video } from "@/utils/typeorm/entity/video.entity";
import { getPublicUrl } from "@/utils/storage/client";
import VideoPlayer from "@/modules/watch/player";

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

  return (
    <div className="grid grid-cols-[1fr_0.4fr]">
      <VideoPlayer className="max-h-[500px]" videoUrl={videoUrl} />
    </div>
  );
}
