import { Video } from "@/utils/typeorm/entity/video.entity";

export default function Description({ video }: { video: Video }) {
  return (
    <div className="bg-neutral-700 rounded-lg p-2">
      <div className="font-bold flex gap-4">
        <span>{video.view_count} views</span>
        <span>{new Date(video.created_at).toLocaleDateString()}</span>
      </div>
      {video.description ? (
        <p>{video.description}</p>
      ) : (
        <p className="italic">No description</p>
      )}
    </div>
  );
}
