interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
}

const PageHeader = ({
  topTitle,
  bottomDescription,
  topDescription,
  bottomTitle,
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col">
      <h1 className="text-30 font-semibold text-gray-900">{topTitle}</h1>
      <p className="text-16 py-2 font-normal text-gray-600">{topDescription}</p>
      <div className="flex flex-col gap-1 border-t border-gray-200 py-6">
        <h2 className="text-18 font-semibold text-gray-900">{bottomTitle}</h2>
        <p className="text-16 font-normal text-gray-600">{bottomDescription}</p>
      </div>
    </header>
  );
};

export default PageHeader;
