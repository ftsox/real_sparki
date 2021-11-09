import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import { contractAddress } from "../utils/config";

export default function Undelegate() {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    async function init() {
      setAccount(await web3.eth.getAccounts());
      //   const balance = await web3.eth.getBalance(account);
      console.log("balance : ", account);
    }
    init();
  }, [amount]);

  const undelegation = async () => {
    await contract.methods.undelegateAll().send({
      from: account[0],
    });
  };
  return (
    <>
      <div className="flex flex-col bg-red-100 w-1/2 mx-10 mx-auto my-10 h-auto p-10 mx-10 border-collapse border border-red-100 rounded-md">
        <label className="m-10 md:w-auto  mx-auto text-2xl">Your Delegation</label>
        
        <button
          className="h-9 w-2/3 mx-auto p-1 border-collapse border border-black rounded-3xl bg-red-100"
          onClick={undelegation}
        >
          Undelegate All
        </button>
      </div>
    </>
  );
}
