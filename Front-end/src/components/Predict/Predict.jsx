import React from "react";
import "./Predict.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Predict = () => {
  return (
    <div className="gradient-bg-welcome">
      <div className="predict_main">
        {/* <h1>Predict</h1> */}
        <div className="flex-row w-full justify-center items-center">
          <div className="flex md:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col lg:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white py-1 font-extrabold">
                Machine Learning <br /> Models NFT Marketplace
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Explore the ML world. Contribute your best trained models here.
              </p>

              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Reliability
                </div>
                <div className={companyCommonStyles}>Security</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>NFT</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Blockchain
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="/child/game1" className="btn">
        Play Now
      </Link>
    </div>
  );
};

export default Predict;
