import { cn } from "@/lib/utils";

interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

const PageHeader = ({
  topTitle,
  bottomDescription,
  topDescription,
  bottomTitle,
  connectBank,
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col">
      <h1 className="text-30 font-semibold text-gray-900">{topTitle}</h1>
      <p
        className={cn("text-16 py-2 font-normal text-gray-600", {
          "pb-8": connectBank,
        })}
      >
        {topDescription}
      </p>
      <div
        className={cn("flex flex-col gap-1 pt-8", {
          "border-t border-gray-200 pb-5 pt-6": connectBank,
        })}
      >
        <h2 className="text-18 font-semibold text-gray-900">{bottomTitle}</h2>
        <p className="text-16 font-normal text-gray-600">{bottomDescription}</p>
      </div>
    </header>
  );
};

export default PageHeader;
