import React, { useContext } from "react";
import { APIContext } from "../../context/context";
import "./Transactions.css";
const Transactions = () => {
  const { transactions, makeItShort } = useContext(APIContext);

  return (
    <div className="transaction_section">
      <div className="transaction-header">
        <h1>
          Transactions
          <span>All transactions</span>
        </h1>
      </div>
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">Owner</th>
            <th className="text-left">Model</th>
            <th className="text-left">Message</th>
            <th className="text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((transaction, idx) => (
              <tr key={idx}>
                <td className="text-left">
                  <a
                    href={`https://sepolia.etherscan.io/address/${transaction.owner}`}
                    target="_blank"
                  >
                    {makeItShort(transaction.owner)}
                  </a>
                </td>
                <td className="text-left">
                  <a href={transaction.link} target="_blank">
                    {transaction.keyword}
                  </a>
                </td>
                <td className="text-left">{transaction.message}</td>
                <td className="text-left">
                  {new Date(
                    transaction.timestamp.toNumber() * 1000
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
