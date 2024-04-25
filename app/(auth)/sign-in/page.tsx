import { redirect } from "next/navigation";

import AuthForm from "@/components/shared/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const page = async () => {
  const loggedIn = await getLoggedInUser();
  if (loggedIn) redirect("/");
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-in" />
    </section>
  );
};

export default page;
