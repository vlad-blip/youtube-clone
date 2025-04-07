import { UserCircle2 } from "lucide-react";

export default function AuthButton() {
  return (
    <button className="flex items-center gap-2 rounded-full border-neutral-500 border-1 py-2 px-4">
      <UserCircle2 />
      <span>Sign in</span>
    </button>
  );
}
