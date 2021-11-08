import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";

export default function Header() {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const connectMetamask = async () => {
    const connected_wallet = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (connected_wallet) {
      const address =
        connected_wallet[0].substr(0, 7) +
        "..." +
        connected_wallet[0].substr(
          connected_wallet[0].length - 7,
          connected_wallet[0].length
        );
      setConnectedWallet(address);
      console.log(connected_wallet[0]);
    }

    // const donate = new web3.eth.Contract(abi, contractAddress)
    // console.log("ddddd", donate)

    // const accounts = await web3.eth.getAccounts();
    // const contract = await getContract(web3);
  };

  return (
    <div className="flex justify-between bg-red-50 pt-7 text-black">
      <img src={logo} className="w-24 ml-7" alt="logo" />
      <div className="flex">
        <p className="md:text-lg pt-9 w-24">
          <NavLink to="/">Home</NavLink>
        </p>
        <p className="md:text-lg pt-9 p-3 w-24">
          <NavLink to="/wrap">Wrap</NavLink>
        </p>
        <p className="md:text-lg pt-9 p-3 w-24">
          <NavLink to="/unwrap">Unwrap</NavLink>
        </p>
        <p className="md:text-lg pt-9 p-3 w-24">
          <NavLink to="/delegate">Delegate</NavLink>
        </p>
        <p className="md:text-lg pt-9 p-3 w-24">
          <NavLink to="/undelegate">Undelegate</NavLink>
        </p>
      </div>
      <div className="flex justify-between md:text-lg mr-5">
        <button
          className="m-10 pr-5 pl-5 border-collapse border border-black rounded-3xl"
          onClick={connectMetamask}
        >
          {connectedWallet ? connectedWallet : "Connect Metamask"}
        </button>
      </div>
    </div>
  );
}
