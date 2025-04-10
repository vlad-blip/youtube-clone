type FormValues = {
  title: string;
  description: string;
  video: FileList;
  thumbnail: FileList;
  categories: { value: string; label: string }[];
};

export { type FormValues };
