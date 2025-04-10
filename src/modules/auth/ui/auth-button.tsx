import { UserCircle2 } from "lucide-react";
import Link from "next/link";
export default function AuthButton() {
  return (
    <Link
      href={"/login"}
      type="submit"
      className="flex items-center gap-2 rounded-full border-neutral-500 border-1 py-2 px-4 cursor-pointer"
    >
      <UserCircle2 />
      <span>Sign in</span>
    </Link>
  );
}
