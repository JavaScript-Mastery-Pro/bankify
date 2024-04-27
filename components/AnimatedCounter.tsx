"use client";

import CountUp from "react-countup";

function AnimatedCounter({ amount }: { amount: string }) {
  return (
    <div className="w-full">
      <CountUp decimals={2} decimal="," prefix="$" end={Number(amount)} />
    </div>
  );
}

export default AnimatedCounter;
