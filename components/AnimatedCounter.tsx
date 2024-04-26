"use client";

import AnimatedNumbers from "react-animated-numbers";

function AnimatedCounter({ amount }: { amount: string }) {
  const numericAmount = Number(amount.replace(/[^0-9.-]+/g, ""));

  return (
    <div className="w-full">
      <AnimatedNumbers
        includeComma
        transitions={(index) => ({
          type: "spring",
          duration: index + 0.3,
        })}
        animateToNumber={numericAmount}
        fontStyle={{
          fontSize: "30px",
          lineHeight: "30px",
          fontWeight: "700",
          color: "#475467",
        }}
      />
    </div>
  );
}

export default AnimatedCounter;
