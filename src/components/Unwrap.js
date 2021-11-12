import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import { contractAddress } from "../utils/config";
import BigNumber from "bignumber.js";

export default function Unwrap() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [notify, setNotify] = useState("");
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);
  useEffect(() => {
    async function init() {
      const _account = await web3.eth.getAccounts();
      setNotify("")
      setAccount(_account);
      if (_account[0]) {
        const _balance = await contract.methods.balanceOf(_account[0]).call()
        setBalance(_balance)
      }
    }
    init();
  }, [amount]);

  const unwrap = async () => {
    const amount_withdraw = new BigNumber(amount * 10 ** 18);
    await contract.methods.withdraw(amount_withdraw.toFixed()).send({
      from: account[0],
    })
    .then(async (res) => {
      if (res.status === true) {
        const _balance = await contract.methods.balanceOf(account[0]).call()
        setBalance(_balance)
      }
      else {
        setNotify("Transaction Failed.")
      }
    });
  };
  return (
    <>
      <div className="flex flex-col w-1/2 h-auto p-10 mx-10 mx-auto my-10 bg-red-100 border border-collapse border-red-100 rounded-md">
        <label className="m-10 mx-auto text-2xl text-gray-700 md:w-auto">Unwrap</label>
        <div className="flex justify-between w-2/3 p-1 pl-3 mx-auto mb-5 bg-white border border-collapse border-red-100 rounded-md">
          <input
            className="focus:outline-none md:w-full"
            type="number"
            name="amount_wrap"
            placeholder="Amount to unwrap"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <label className="mx-auto md:w-auto">Available : {balance / 10 ** 18} WSGB</label>
        <button
          className="w-2/3 p-1 mx-auto my-5 transition duration-500 ease-in-out bg-red-100 border border-collapse border-black h-9 rounded-3xl hover:bg-red-400 hover:text-white hover:border-opacity-0"
          onClick={unwrap}
        >
          Unwrap
        </button>
        <label className="mx-auto md:w-auto">{notify}</label>
      </div>
    </>
  );
}
