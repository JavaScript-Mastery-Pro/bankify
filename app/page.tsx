import { CreateAccountButton } from "@/components/shared/CreateAccountButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      Stripe Test
      <CreateAccountButton />
    </main>
  );
}
