import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "../utils/abi.json";
import { contractAddress } from "../utils/config";

export default function Undelegate() {
  const [account, setAccount] = useState("");
  const [delegationInfo, setDelegationInfo] = useState(null);
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi, contractAddress);

  useEffect(() => {
    async function init() {
      const _account = await web3.eth.getAccounts();
      setAccount(_account);
      if (_account) {
        const delegate_info = await contract.methods
          .delegatesOf(_account[0])
          .call();
        setDelegationInfo(delegate_info);
      }
    }
    init();
  }, delegationInfo);

  const undelegation = async () => {
    await contract.methods
      .undelegateAll()
      .send({
        from: account[0],
      })
      .then(async (res) => {
        if (res.status === true) {
          setDelegationInfo(null);
        }
      });
  };
  return (
    <>
      <div className="flex flex-col w-1/2 h-auto p-10 mx-10 mx-auto my-10 bg-red-100 border border-collapse border-red-100 rounded-md">
        <label className="m-10 mx-auto text-2xl text-gray-700 md:w-auto">
          Current Delegation
        </label>
        {delegationInfo &&
          delegationInfo["_delegateAddresses"].map(function (item, i) {
            return (
              <label>
                {item}: {delegationInfo["_bips"][i]/100}%
              </label>
            );
          })}
        <button
          className="w-2/3 p-1 mx-auto mt-10 transition duration-500 ease-in-out bg-red-100 border border-collapse border-black h-9 rounded-3xl hover:bg-red-400 hover:text-white hover:border-opacity-0"
          onClick={undelegation}
        >
          Undelegate All
        </button>
      </div>
    </>
  );
}
