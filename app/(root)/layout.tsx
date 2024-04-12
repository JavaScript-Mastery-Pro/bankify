import Sidebar from "@/components/shared/Sidebar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />
      {children}
    </main>
  );
};

export default RootLayout;
