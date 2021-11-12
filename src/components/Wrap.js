import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import { contractAddress } from "../utils/config";

export default function Wrap() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    async function init() {
      const chainId = await web3.eth.getChainId();
      if (chainId !== 19) {
      }
      const _account = await web3.eth.getAccounts();
      setAccount(_account);
      const _balance = await web3.eth.getBalance(_account[0]);
      setBalance(_balance);
    }
    init();
  }, [amount]);

  const wrap = async () => {
    await contract.methods
      .deposit()
      .send({
        from: account[0],
        value: amount * 10 ** 18,
      })
      .then(async (res) => {
        if (res.status === true) {
          const _balance = await web3.eth.getBalance(account[0]);
          setBalance(_balance);
        } else {
        }
      });
  };
  return (
    <>
      <div className="flex flex-col w-1/2 h-auto p-10 mx-10 mx-auto my-10 bg-red-100 border border-collapse border-red-100 rounded-md">
        <label className="m-10 mx-auto text-2xl text-gray-700 md:w-auto">Wrap</label>
        <div className="flex justify-between w-2/3 p-1 pl-3 mx-auto mb-5 bg-white border border-collapse border-red-100 rounded-md">
          <input
            className="focus:outline-none md:w-full"
            type="text"
            name="amount_wrap"
            placeholder="Amount to wrap"
            onChange={(e) => setAmount(e.target.value)}
          ></input>
          {/* <button className="mr-3">Max</button> */}
        </div>
        <label className="mx-auto md:w-auto">
          Available : {balance / 10 ** 18} SGB
        </label>
        <button
          className="w-2/3 p-1 mx-auto my-5 transition duration-500 ease-in-out bg-red-100 border border-collapse border-black h-9 rounded-3xl hover:bg-red-400 hover:text-white hover:border-opacity-0"
          onClick={wrap}
        >
          Wrap
        </button>
      </div>
    </>
  );
}
