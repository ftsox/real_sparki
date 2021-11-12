import React from "react";
import logo from "../logo.svg";

export default function Home() {
  return (
    <div className="min-h-full">
      <div className="min-h-full font-mono text-gray-500 bg-gray-100">
        <div className="max-w-5xl min-h-screen mx-auto space-y-4 bg-white p-28">
          <p className="mb-10">
            <a
              href="mailto:info@sparkifi.xyz"
              className="text-3xl no-underline titlelink"
            >
              SparkiFi
            </a>
          </p>
          <p className="font-thin">
            SparkiFi is an independent infrastructure provider on the{" "}
            <span className="font-medium">Songbird</span> and{" "}
            <span className="font-medium">Flare</span> ecosystems. We provide the
            highest quality and lowest cost data delegate services.
          </p>
          <p className="font-thin">
            Delegate to us at&nbsp;
            <a
              className="no-underline titlelink"
              href="https:songbird-explorer.flare.network/address/0x153aD30381b11DCE62f349c97a54c2a58956B992"
              target="_blank"
              rel="noreferrer"
            >
              0x153aD30381b11DCE62f349c97a54c2a58956B992
            </a>
          </p>

          <div className="absolute bottom-0 pb-8">
            <p className="text-xs font-thin">
              Copyright 2021 SparkiFi |&nbsp;
              <a
                href="mailto:info@sparkifi.xyz"
                className="transition duration-700 ease-in-out hover:text-red-500"
                target="_blank"
                rel="noreferrer"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
