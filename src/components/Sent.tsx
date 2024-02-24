/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "./Input";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  // useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { ethers } from "ethers";
// import erc20ABI from "../abis/erc20Abi.json";
export const Sent = () => {
  const [sentData, setSentData] = useState<{
    to: string;
    amount: string;
  }>({
    to: "0x5fD3b839960fff70560cB397E8d6Adb1bA13e378",
    amount: "0.00001",
  });
  // console.log("🚀 ~ Sent ~ events:", events);
  const { sendTransaction, error, data, isPending } = useSendTransaction();
  const {
    signMessage,
    data: signMessageData,
    error: signMessageError,
  } = useSignMessage();
  const {
    signTypedData,
    data: signTypedDataRes,
    error: signTypedDataError,
  } = useSignTypedData();
  console.log("sendTransaction result:", data, error);
  console.log("signMessage result:", signMessageData, signMessageError);
  console.log("signMessageData result:", signTypedDataRes, signTypedDataError);
  const account = useAccount();
  // const { writeContract, data: writeContractData } = useWriteContract();
  // console.log("🚀 ~ Sent ~ writeContractData:", writeContractData);

  useEffect(() => {
    if (signTypedDataRes) {
      toast.success(<div>signTypedData successfully {signTypedDataRes}</div>);
    }
  }, [signTypedDataRes]);

  useEffect(() => {
    if (signMessageData) {
      toast.success(<div>signMessage successfully {signMessageData}</div>);
    }
  }, [signMessageData]);

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
      <button
        onClick={() =>
          signMessage({
            message: "Sign message",
          })
        }
      >
        Sign message
      </button>
      <button
        onClick={() => {
          signTypedData({
            types: {
              Test: [{ name: "Request", type: "string" }],
            },
            message: {
              Request: "This is a request",
            },
            domain: {
              name: "Ether Mail",
              version: "1",
              chainId: 1,
              verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
            },
            primaryType: "Test",
          });
        }}
      >
        Sign type data
      </button>
      {/* <button
        onClick={() => {
          if (!account.address) return;
          const contractAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
          const testAddress = "0x5b8f1310A956ee1521A7bB56160451C786289aa9";
          writeContract({
            address: contractAddress,
            abi: erc20ABI,
            functionName: "transfer",
            args: [testAddress, ethers.parseEther("100")],
          });
        }}
      >
        Transfer
      </button> */}
    </div>
  );
};
