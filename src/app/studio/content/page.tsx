import Link from "next/link";

export default function ContentPage() {
  return (
    <div>
      <h1>Content page</h1>
      <Link
        href={"/studio/upload-video"}
        className="cursor-pointer bg-white text-black rounded-full px-4 py-2"
      >
        Upload video
      </Link>
    </div>
  );
}
