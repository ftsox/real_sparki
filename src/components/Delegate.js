import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import { contractAddress } from "../utils/config";
import { RangeStepInput } from "react-range-step-input";
import BigNumber from "big-number";

export default function Delegate() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [delegates, setDelegates] = useState(0);
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);
  useEffect(() => {
    async function init() {
      setAccount(await web3.eth.getAccounts());
      if (account) {
        setAmount(await contract.methods.balanceOf(account[0]).call());
      }
    }
    init();
  }, [amount]);

  const delegate = async () => {
    console.log("delegation amount : ", Number(BigNumber( amount * delegates / 100)))
    await contract.methods.delegate("0x029290c564Ef921c56a784AA16C97E930dAF7372", BigNumber( amount * delegates / 100) ).send({
      from: account[0],
    });
  };
  const onChangeSlider = (e) => {
    const newVal = Number(e.target.value);
    setDelegates(newVal);
  };
  return (
    <>
      <div className="flex flex-col bg-red-100 w-1/2 mx-10 mx-auto my-10 h-auto p-10 mx-10 border-collapse border border-red-100 rounded-md">
        <label className="m-10 md:w-auto  mx-auto text-2xl">Delegate</label>
        <label className="mx-auto text-6xl text-pink-700 mb-7">
          {delegates ? delegates : 0}%
        </label>

        <div className="flex justify-between w-2/3 p-1 pl-3 mb-5 bg-white border-collapse border border-red-100 rounded-md mx-auto">
          <RangeStepInput
            className="mx-auto w-full bg-opacity-100"
            min={0}
            max={100}
            value={delegates ? delegates : 0}
            step={1}
            onChange={onChangeSlider}
          />
        </div>
        <button
          className="h-9 w-2/3 mx-auto p-1 border-collapse border border-black rounded-3xl bg-red-100"
          onClick={delegate}
        >
          Delegate
        </button>
      </div>
    </>
  );
}
