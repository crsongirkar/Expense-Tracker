import React, { useState } from "react";

const NetBalance = ({ entries }) => {
  const totalIncome = entries
    .filter((entry) => entry.type === "Income")
    .reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpense = entries
    .filter((entry) => entry.type === "Expense")
    .reduce((acc, entry) => acc + entry.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Net Balance</h2>
        <p
          className={`text-3xl font-bold ${
            netBalance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ₹{netBalance.toFixed(2)}
        </p>
      </div>
      <div>
        {netBalance >= 0 ? (
          <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11.41V14a1 1 0 11-2 0V6.59L6.7 8.29a1 1 0 11-1.4-1.42l4-4a1 1 0 011.4 0l4 4a1 1 0 01-1.4 1.42L11 6.59z"
                clipRule="evenodd"
              />
            </svg>
            Positive Balance
          </span>
        ) : (
          <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11.41V14a1 1 0 11-2 0V6.59L6.7 8.29a1 1 0 11-1.4-1.42l4-4a1 1 0 011.4 0l4 4a1 1 0 01-1.4 1.42L11 6.59z"
                clipRule="evenodd"
              />
            </svg>
            Negative Balance
          </span>
        )}
      </div>
    </div>
  );
};

const DeletedEntries = ({ deletedEntries }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Deleted Entries
      </h2>
      {deletedEntries.length === 0 ? (
        <p className="text-gray-500">No deleted entries to display.</p>
      ) : (
        <ul className="space-y-4">
          {deletedEntries.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div>
                <p className="text-sm text-gray-600">{entry.date}</p>
                <p className="text-lg font-medium text-gray-800">
                  {entry.description}
                </p>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    entry.type === "Income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {entry.type}
                </span>
              </div>
              <p
                className={`text-lg font-bold ${
                  entry.type === "Income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{entry.amount.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NetBalance;