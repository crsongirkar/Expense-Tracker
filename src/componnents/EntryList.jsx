import React from "react";

const EntryList = ({ entries, deleteEntry }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Expense Record
      </h2>
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No entries to display.</p>
      ) : (
        <ul className="space-y-6">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
            >
              {/* Entry Details */}
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {entry.description}
                </p>
                <p className="text-sm text-gray-500">{entry.date}</p>
                <span
                  className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium ${
                    entry.type === "Income"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {entry.type}
                </span>
              </div>

              {/* Entry Amount */}
              <p
                className={`text-lg font-bold ${
                  entry.type === "Income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{entry.amount.toFixed(2)}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => deleteEntry(entry.id)}
                className="py-2 px-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryList;
