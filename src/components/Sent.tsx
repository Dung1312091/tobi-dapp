/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "./Input";
import { useConnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";
export const Sent = () => {
  const [sentData, setSentData] = useState<{
    to: string;
    amount: string;
  }>({
    to: "",
    amount: "",
  });
  const { sendTransaction } = useSendTransaction();
  const { isSuccess } = useConnect();

  const handleSentTransaction = () => {
    console.log("aaa");
    sendTransaction({
      to: sentData.to as any,
      value: parseEther(sentData.amount),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSentData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
        border: "1px solid",
        borderRadius: 16,
        width: 400,
        padding: "24px 36px",
      }}
    >
      <Input
        placeholder="To address"
        onChange={handleChange}
        name="to"
        value={sentData.to}
      />
      <Input
        placeholder="Amount"
        onChange={handleChange}
        name="amount"
        value={sentData.amount}
      />
      <button onClick={handleSentTransaction} disabled={!isSuccess}>
        Sent
      </button>
    </div>
  );
};
