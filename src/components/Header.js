import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";

let address;
export default function Header() {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const connectMetamask = async () => {
    const connected_wallet = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (connected_wallet) {
      address =
        connected_wallet[0].substr(0, 7) +
        "..." +
        connected_wallet[0].substr(
          connected_wallet[0].length - 7,
          connected_wallet[0].length
        );
      if (chainId !== "0x13") {
        address = address + " | Wrong Network";
      }
      setConnectedWallet(address);
    }
  };

  window.ethereum.on("connect", (info) => {
    connectMetamask();
  });

  return (
    <div className="flex justify-between font-mono text-center text-gray-700 bg-red-50 pt-7">
      <img src={logo} className="w-24 ml-7" alt="logo" />
      <div className="flex">
        <p className="p-6 pt-9 md:w-auto">
          <NavLink className="transition duration-300 ease-in-out hover:text-red-700" to="/">Home</NavLink>
        </p>
        <p className="p-6 pt-9 md:w-auto">
          <NavLink className="transition duration-300 ease-in-out hover:text-red-700 " to="/wrap">Wrap</NavLink>
        </p>
        <p className="p-6 pt-9 md:w-auto">
          <NavLink className="transition duration-300 ease-in-out hover:text-red-700 " to="/unwrap">Unwrap</NavLink>
        </p>
        <p className="p-6 pt-9 md:w-auto">
          <NavLink className="transition duration-300 ease-in-out hover:text-red-700 " to="/delegate">Delegate</NavLink>
        </p>
        <p className="p-6 pt-9 w-27 md:w-auto">
          <NavLink className="transition duration-300 ease-in-out hover:text-red-700 " to="/undelegate">Undelegate</NavLink>
        </p>
        <p className="p-6 pt-9 w-27 md:w-auto">
          <NavLink className="transition duration-300 ease-in-out hover:text-red-700 " to="/reward">Claim Reward</NavLink>
        </p>
      </div>
      <div className="flex justify-between mr-5 md:text-lg">
        <button
          className="pl-5 pr-5 m-10 mt-8 transition duration-500 ease-in-out border border-collapse border-black rounded-3xl hover:bg-red-400 hover:text-white hover:border-opacity-0"
          onClick={connectMetamask}
        >
          {connectedWallet ? connectedWallet : "Connect Metamask"}
        </button>
      </div>
    </div>
  );
}
