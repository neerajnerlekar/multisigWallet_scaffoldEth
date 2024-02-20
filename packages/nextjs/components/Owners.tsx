"use client";

import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Owners = () => {
  const { data: owners } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "getOwners",
  });
  return (
    <div>
      {owners?.map((owner: string, index: number) => (
        <div className="" key={index}>
          {owner}
        </div>
      ))}
    </div>
  );
};
export default Owners;
