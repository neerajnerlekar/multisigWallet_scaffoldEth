"use client";

import { parseEther } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const SubmitTransaction = () => {
  const value = parseEther("10000000000000");
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "submit",
    args: ["0x722f147699D6089711EBc8Fd3E3371Ea95F16EDD", value, "0x"],
  });
  return (
    <div>
      <button className="btn btn-primary" onClick={() => writeAsync()}>
        Send TX
      </button>
    </div>
  );
};
export default SubmitTransaction;
