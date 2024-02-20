"use client";

import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const NumConfirmations = () => {
  const { data: transactions } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "numConfirmationsRequired",
  });
  return <div>{transactions?.toString()}</div>;
};
export default NumConfirmations;
