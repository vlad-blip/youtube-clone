interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <h1>Home Layout</h1>
      {children}
    </div>
  );
}
