"use client";

import CountUp from "react-countup";

function AnimatedCounter({ amount }: { amount: string }) {
  const numericAmount = Number(amount.replace(/[^0-9.-]+/g, ""));

  return (
    <div className="w-full">
      <CountUp decimals={2} end={Number(numericAmount)} />
    </div>
  );
}

export default AnimatedCounter;
