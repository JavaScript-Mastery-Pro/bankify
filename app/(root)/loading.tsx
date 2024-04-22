import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex-center size-full gap-3 text-gray-500 ">
      <Image
        src="/icons/loader.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading...
    </div>
  );
}
