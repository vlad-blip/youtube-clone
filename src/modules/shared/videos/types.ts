export interface IVideo {
  id: string;
  thumbnail: string;
  title: string;
  channel: {
    name: string;
    avatar: string;
  };
  views: string;
  date: string;
  duration: string;
  link: string;
}
