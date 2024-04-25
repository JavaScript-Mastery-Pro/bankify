import Image from "next/image";

const RootLayoutAuth = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-between  font-inter">
      {children}
      <div className="flex h-screen w-full items-center justify-end bg-sky-1 max-lg:hidden">
        <div className="rounded-xl border-y-[6px] border-l-[6px] border-gray-900">
          <Image
            src="/icons/auth-image.svg"
            alt="Auth Image"
            width={500}
            height={500}
            className="rounded-l-xl object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default RootLayoutAuth;
