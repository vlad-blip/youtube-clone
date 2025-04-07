import Categories from "@/modules/home/ui/categories";
import Videos from "@/modules/shared/videos/videos";

const DUMMY_ITEMS = [
  {
    id: "1",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "2",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "3",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "4",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "5",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "6",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "7",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "8",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "9",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
  {
    id: "10",
    thumbnail: "",
    title: "How to make a website in 10 minutes",
    channel: {
      name: "CodeWithHarry",
      avatar: "",
    },
    views: "1M views",
    date: "1 day ago",
    duration: "10:00",
  },
];

export default function Home() {
  return (
    <div className="grid gap-y-10 overflow-hidden px-2">
      <Categories />
      <Videos items={DUMMY_ITEMS} />
    </div>
  );
}
