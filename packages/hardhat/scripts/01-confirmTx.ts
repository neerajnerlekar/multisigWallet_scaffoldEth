import { ethers } from "hardhat";

async function main() {
  const [, acc1] = await ethers.getSigners();
  console.log("Account 1 address:", acc1.address);

  const contract = await ethers.getContractAt("YourContract", "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

  const approveTxAcc1 = await contract.connect(acc1).approve("0");
  await approveTxAcc1.wait();
  console.log("approveTxAcc1 confirmed");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
