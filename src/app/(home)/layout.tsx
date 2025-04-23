import Image from "next/image";
import Search from "@/modules/home/ui/nav-bar/search";
import SideBar from "@/modules/home/ui/side-bar";
import AuthButton from "@/modules/auth/ui/auth-button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import UserButton from "@/modules/user/ui/user-button";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center px-4 py-2">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="Youtube logo" width={40} height={40} />
        </Link>
        <Search />
        <div className="flex items-center gap-4">
          <Link
            href={"/studio/upload-video"}
            className="rounded-full bg-neutral-600 py-2 px-4"
          >
            + Create
          </Link>
          {data ? <UserButton /> : <AuthButton />}
        </div>
      </div>
      <div className="grid  grid-cols-[0.1fr_1fr] min-h-full grow">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
