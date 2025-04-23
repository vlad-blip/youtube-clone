"use client";

import PostComment from "@/modules/shared/comments/post-comment";
import Comments from "@/modules/shared/comments/comments";
import { type Comment } from "@/utils/typeorm/entity/comment.entity";

interface ICommentsSectionProps {
  items: Comment[] | [];
  commentsCount: number;
}

export default function CommentsSection({
  items,
  commentsCount,
}: ICommentsSectionProps) {
  return (
    <div className="py-4">
      <p className="font-bold text-xl mb-4">
        {commentsCount.toLocaleString()} Comments
      </p>
      <PostComment />
      <Comments className="mt-4" items={items} />
    </div>
  );
}
