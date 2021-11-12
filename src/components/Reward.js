import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi_reward from "../utils/abi_reward.json";
import { rewardcontractAddress } from "../utils/config";

export default function Reward() {
  const [account, setAccount] = useState("");
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abi_reward, rewardcontractAddress);
  const [unclaimedReward, setUnclaimedReward] = useState([]);
  const [epochIds, setEpochIds] = useState([]);
  const [sumRewards, setSumRewards] = useState(0);

  useEffect(() => {
    async function init() {
      const _account = await web3.eth.getAccounts();
      let _sum = 0;
      setAccount(_account);
      if (_account) {
        const _epochIds = await contract.methods
          .getEpochsWithUnclaimedRewards(_account[0])
          .call();
        setEpochIds(_epochIds);
        _epochIds.map((ele, idx) => {
          const unclaimedReward = contract.methods
            .getUnclaimedReward(ele, _account[0])
            .call()
            .then((res) => {
              setSumRewards((sum) => sum + Number(res[0]) / 10 ** 18);
              setUnclaimedReward((s = []) => [...s, res]);
            });
        });
      }
    }
    init();
  }, []);
  const claimReward = () => {
    contract.methods
      .claimReward(account[0], epochIds)
      .send({
        from: account[0],
      })
      .then(async (res) => {
        if (res.status === true) {
          setUnclaimedReward(null);
          setSumRewards(0);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col w-1/2 h-auto p-10 mx-10 mx-auto my-10 bg-red-100 border border-collapse border-red-100 rounded-md">
        <label className="m-10 mx-auto text-2xl text-gray-700 md:w-auto">Claim Reward</label>
        <table class="table-fixed py-8 text-center">
          <thead className="space-y-5 border-b-4 border-green-900 border-double">
            <tr>
              <td>No</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {unclaimedReward
              ? unclaimedReward.map((ele, idx) => {
                  return (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{(Number(ele["_amount"]) / 10 ** 18).toFixed(2)}</td>
                    </tr>
                  );
                })
              : "No Data"}
          </tbody>
        </table>
        <div className="flex px-3 flex-justify">
          <label className="text-xl">
            {sumRewards.toFixed(2) !== 0.00
              ? "Sum : " + sumRewards.toFixed(2)
              : ""}
          </label>
          <label className="items-center text-xl">
            {unclaimedReward !== null ? "" : "Succeeded to Claim"}
          </label>
        </div>

        <button
          className="w-2/3 p-1 mx-auto mt-10 transition duration-500 ease-in-out bg-red-100 border border-collapse border-black h-9 rounded-3xl hover:bg-red-400 hover:text-white hover:border-opacity-0"
          onClick={claimReward}
        >
          Claim All Rewards
        </button>
      </div>
    </>
  );
}
