import { DeleteAccountButton } from "@/components/shared/DeleteAccountButton";
import { DepositButton } from "@/components/shared/DespositButton";
import { GenerateBankTokenButton } from "@/components/shared/GenerateBankTokenButton";
import { GetBalanceButton } from "@/components/shared/GetBalanceButton";
import { GetBankListButton } from "@/components/shared/GetBankListButton";
import { TopUpBalanceButton } from "@/components/shared/TopUpBalanceButton";
import { TransferToAccountButton } from "@/components/shared/TransferToAccountButton";
import { TransferToPlatformButton } from "@/components/shared/TransferToPlatformButton";
import { WithdrawButton } from "@/components/shared/WithdrawButton";
import { AppFixedFee } from "@/constants";
import { calculateStripeFee } from "@/lib/utils";

const Return = async ({ params: { id } }: SearchParamProps) => {
  const topUpAmountInDollar = 20;
  const depositAmountInDollar = 5;
  const withdrawAmountInDollar = 2;
  const transferAmountInDollar = 2;
  const transactionFee = calculateStripeFee(depositAmountInDollar);

  const total = AppFixedFee + transactionFee + depositAmountInDollar;
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

      return account;
    });

  console.log({ account });

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1 className="font-bold">Dashboard (Return Page)</h1>
      <p>Deposit {depositAmountInDollar}</p>
      <p>Stripe fee {transactionFee}</p>
      <p>App fee {AppFixedFee.toFixed(2)}</p>
      <p>Total Fee{transactionFee + AppFixedFee}</p>
      <p>Total Amount {total}</p>
      <p>Receive Amount {total - (transactionFee + AppFixedFee)}</p>
      <p>
        Account email: <span className="font-bold">{account.email}</span>
      </p>
      <DeleteAccountButton accountId={account.id} />
      <TopUpBalanceButton amountInDollar={topUpAmountInDollar} />
      <DepositButton
        amountInDollar={depositAmountInDollar}
        account={account.id}
      />
      <TransferToPlatformButton
        amountInDollar={transferAmountInDollar}
        account={account.id}
      />
      <TransferToAccountButton
        amountInDollar={transferAmountInDollar}
        account={account.id}
      />

      <GetBalanceButton account={account.id} />

      <GenerateBankTokenButton
        accountName="John Doe"
        routingNumber="110000000"
        accountNumber="000123456789"
        account={account.id}
      />
      <GetBankListButton account={account.id} />
      <WithdrawButton
        amountInDollar={withdrawAmountInDollar}
        bankId="ba_1P5WHRCE6Xl11oKt27zbzotI"
        account={account.id}
      />
    </div>
  );
};

export default Return;
