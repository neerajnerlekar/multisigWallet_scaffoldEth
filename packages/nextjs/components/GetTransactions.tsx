"use client";

import { formatEther } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const GetTransactions = () => {
  const { data } = useScaffoldContractRead({ contractName: "YourContract", functionName: "getTransactions" });
  return (
    <div>
      {data?.map((tx: any, i: number) => (
        <div key={i}>
          <p>Transaction: {tx.to}</p>
          <p>Transaction: {formatEther(tx.value)}</p>
          <p>Transaction: {tx.data}</p>
          <p>Transaction: {tx.executes ? tx.executes : "0"}</p>
        </div>
      ))}
    </div>
  );
};
export default GetTransactions;
