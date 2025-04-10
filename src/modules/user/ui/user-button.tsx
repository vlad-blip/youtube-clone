import { UserCircle2 } from "lucide-react";

export default function UserButton() {
  return (
    <button className="flex items-center gap-2 rounded-full border-neutral-500 border-1 py-2 px-4 cursor-pointer">
      <UserCircle2 />
    </button>
  );
}
