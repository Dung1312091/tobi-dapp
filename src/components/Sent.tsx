/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "./Input";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Sent = () => {
  const [sentData, setSentData] = useState<{
    to: string;
    amount: string;
  }>({
    to: "0x5fD3b839960fff70560cB397E8d6Adb1bA13e378",
    amount: "0.00001",
  });
  const { sendTransaction, error, data, isPending } = useSendTransaction();
  console.log("sendTransaction result:", data, error);
  const account = useAccount();

  useEffect(() => {
    if (data) {
      toast.success(
        <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
          Transaction successfully
        </a>
      );
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      toast.error("Transaction failed", {
        autoClose: 5000,
      });
    }
  }, [error]);

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
      <button
        onClick={async () => {
          if (isPending) return;
          sendTransaction({
            to: sentData.to as any,
            value: parseEther(sentData.amount),
          });
        }}
        disabled={!account?.isConnected}
      >
        {isPending ? "Sending..." : "Sent"}
      </button>
    </div>
  );
};
