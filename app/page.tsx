import { CreateAccountButton } from "@/components/shared/CreateAccountButton";

export default function Home() {
  // const PlatformClientId = "ca_Pu0KaEGbSzwQ9airIOQKuK2IUlJHCKXk";
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      Stripe Test
      <CreateAccountButton />
    </main>
  );
}
