import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
export const APIContext = createContext();
import { contractAddress, contractABI } from "../utils/Contract";

const Context = ({ children }) => {
  const [rotationX, setRotationX] = useState(3);
  const [fileUrl, setFileurl] = useState("");
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [formData, setformData] = useState({
    keyword: "",
    message: "",
  });

  const makeItShort = (str) => {
    return str.slice(0, 6) + "..." + str.slice(str.length - 4, str.length);
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(formData);
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionContract;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Update rotation value in each interval
      setRotationX((prevRotation) => prevRotation + 0.01);
    }, 50); // Interval time in milliseconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  // communicate with the blockchain
  const getTransactionHistory = async () => {
    try {
      if (!window.ethereum) {
        alert("Install Metamask");
        return;
      }

      const transactionContract = getContract();
      const transactions = await transactionContract.getAllTransactions();

      setTransactions(transactions);
      console.log(transactions);
    } catch (err) {
      console.log(err);
    }
  };

  // Metamask
  const checkIfWalletIsconnected = async () => {
    try {
      if (!window.ethereum) {
        alert("Install Metamask");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) setAccount(accounts[0]);

      getTransactionHistory();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsconnected();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Metamask not installed");
    }
  };

  // Contribute file
  const submitFile = async (file) => {
    const { keyword, message } = formData;
    if (!file || !keyword || !message) {
      alert("Please fill all the fields");
      return;
    }

    if (!account) {
      alert("Please connect your wallet");
      return;
    }

    if (!window.ethereum) {
      alert("Install Metamask");
      return;
    }
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      console.log(formData);

      const responseFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": `multipart/form-data`,
        },
      });
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${responseFile.data.IpfsHash}`;
      // setFileurl(fileUrl);
      try {
        const transactionContract = getContract();

        const transactionHash = await transactionContract.addToBlockchain(
          fileUrl,
          message,
          keyword
        );

        setIsLoading(true);
        await transactionHash.wait();
        setIsLoading(false);
      } catch (err) {
        throw err;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <APIContext.Provider
      value={{
        test: "test",
        rotationX,
        submitFile,
        connectWallet,
        account,
        getTransactionHistory,
        transactions,
        makeItShort,
        isLoading,
        handleChange,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default Context;
