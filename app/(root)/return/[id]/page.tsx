import { DeleteAccountButton } from "@/components/shared/DeleteAccountButton";

const Return = async ({ params: { id } }: SearchParamProps) => {
  // Get Account
  const account = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/account_get`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: id,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const { account } = data;
      console.log("Retrieved Account Client", account);
      return account;
    });

  console.log(account);

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1 className="font-bold">Dashboard (Return Page)</h1>
      <p>
        Landing page after onboarding.
        <a
          href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-purple-900 underline"
        >
          View docs
        </a>
      </p>
      <p>
        Account email: <span className="font-bold">{account.email}</span>
      </p>
      <DeleteAccountButton accountId={id} />
    </div>
  );
};

export default Return;
