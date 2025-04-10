import Image from "next/image";
import AuthButton from "@/modules/auth/ui/auth-button";
import Link from "next/link";
import StudioSideBar from "@/modules/studio/ui/studio-side-bar";
import StudioNavBar from "@/modules/studio/ui/studio-nav-bar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="Youtube logo" width={40} height={40} />
        </Link>
        <StudioNavBar />
        <div className="flex items-center gap-4">
          <Link
            href={"/community"}
            className="rounded-full bg-neutral-600 py-2 px-4"
          >
            + Create
          </Link>
          <AuthButton />
        </div>
      </div>
      <div className="grid  grid-cols-[0.1fr_1fr]">
        <StudioSideBar />
        {children}
      </div>
    </div>
  );
}
