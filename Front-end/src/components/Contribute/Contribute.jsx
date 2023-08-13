import React, { useContext, useState } from "react";
import { APIContext } from "../../context/context";
import Transactions from "../Transaction/Transactions";

import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Contribute = () => {
  const {
    submitFile,
    connectWallet,
    account,
    getTransactionHistory,
    makeItShort,
    handleChange,
    isLoading,
  } = useContext(APIContext);
  const [file, setFile] = useState(null);
  const handleFile = (e) => {
    e.preventDefault();
    submitFile(file);
  };
  // return (
  //   <div className="bgCommon">
  //     <form>
  //       <input
  //         type="file"
  //         name="file"
  //         id="file"
  //         className="inputfile"
  //         onChange={(e) => setFile(e.target.files[0])}
  //       />
  //       <div>
  //         <button type="submit" onClick={handleFile}>
  //           Submit
  //         </button>
  //       </div>
  //     </form>
  //     <div>
  //       {account ? (
  //         <p>Account: {account}</p>
  //       ) : (
  //         <button onClick={connectWallet}>Connect Wallet</button>
  //       )}
  //       <div>
  //         <button onClick={getTransactionHistory}>Transaction</button>
  //       </div>
  //     </div>
  //     <Transactions />
  //   </div>
  // );
  return (
    <div className="gradient-bg-welcome">
      <div className="flex-row w-full justify-center items-center">
        <div className="flex md:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col lg:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white py-1 font-extrabold">
              Machine Learning <br /> Models NFT Marketplace
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Explore the ML world. Contribute your best trained models here.
            </p>
            {!account && (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <AiFillPlayCircle className="text-white mr-2" />
                Connect Wallet
              </button>
            )}

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

          <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {account && makeItShort(account)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              {/* <Input
                placeholder="Model"
                name="uploadFile"
                type="file"
                handleChange={handleChange}
              /> */}
              {/* <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                name="uploadFile"
              /> */}

              <input
                class="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-md file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                name="uploadFile"
              />
              <Input
                placeholder="Model Name"
                name="keyword"
                type="text"
                handleChange={handleChange}
              />
              <Input
                placeholder="About your model"
                name="message"
                type="text"
                handleChange={handleChange}
              />

              <div className="h-[1px] w-full bg-black my-2" />

              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleFile}
                  className="text-white w-full mt-2 border-[1px] p-2 border-black bg-[#3d4f7c5c] hover:bg-[#3d4f7c] hover:text-white rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
            </div>
          </div>
        </div>

        <Transactions />
      </div>
    </div>
  );
};

export default Contribute;
