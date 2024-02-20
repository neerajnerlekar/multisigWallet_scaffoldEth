import type { NextPage } from "next";
import GetTransactions from "~~/components/GetTransactions";
import NumConfirmations from "~~/components/NumConfirmations";
import Owners from "~~/components/Owners";
import SubmitTransaction from "~~/components/SubmitTransaction";
import { Address, Balance } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">MultiSig Wallet</span>
          </h1>
          <Address address="0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9" />
          <Balance address="0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" />
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-evenly items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 mb-6 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              Number of Confirmations Required to Execute a Transaction
              <div className="flex flex-col bg-base-200 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                <NumConfirmations />
              </div>
            </div>
            <div className="flex flex-col bg-base-100 mb-6 px-10 py-10 text-center items-center max-w-fit rounded-3xl">
              OWNERS of the Wallet
              <div className="flex flex-col bg-base-200 px-10 py-10 text-center items-center max-w-fit rounded-3xl">
                <Owners />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-fit rounded-3xl">
              <h1>List of Transactions</h1>
              <GetTransactions />
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <h1>Submit Transactions</h1>
              <SubmitTransaction />
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <h1>Approve Transaction</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
