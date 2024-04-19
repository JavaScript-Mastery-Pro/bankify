import AuthForm from "@/components/shared/AuthForm";

const Connect = ({ params: { id } }: SearchParamProps) => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="connect" id={id} />
    </section>
  );
};

export default Connect;
