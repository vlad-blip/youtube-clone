import Video from "./video";

import type { IVideo } from "./types";

interface VideosProps {
  items: IVideo[];
}

export default function Videos({ items }: VideosProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 ">
      {items.map((item: IVideo) => (
        <li key={item.id} className="flex flex-col gap-4">
          <Video {...item} />
        </li>
      ))}
    </ul>
  );
}
