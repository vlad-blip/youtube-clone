import { Comment as TComment } from "@/utils/typeorm/entity/comment.entity";
import Comment from "./comment";

interface ICommentsProps {
  items: Partial<TComment[]> | [];
  className?: string;
}

export default function Comments({ items, className }: ICommentsProps) {
  return (
    <ul className={`flex flex-col gap-4 ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item?.id}>
          <Comment item={item} />
        </li>
      ))}
    </ul>
  );
}
