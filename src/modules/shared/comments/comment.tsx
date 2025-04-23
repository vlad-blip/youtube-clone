import { Comment as TComment } from "@/utils/typeorm/entity/comment.entity";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

interface ICommentProps {
  item?: Partial<TComment>;
}

export default function Comment({ item }: ICommentProps) {
  return (
    <div className="flex items-start gap-4">
      <Image src={"/globe.svg"} width={40} height={40} alt="Profile picture" />
      <div className="w-full">
        <div className="flex gap-1">
          <h3 className="text-[13px] font-bold">@userslug</h3>
          <span className="text-[12px]">11 months ago</span>
        </div>
        <p className="text-[14px]">
          Finally Magnus has rememberd his youtube password.
        </p>
      </div>
      <MoreVertical />
    </div>
  );
}
