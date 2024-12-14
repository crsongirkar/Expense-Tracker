import React, { useState } from "react";
import AddEntryForm from "./componnents/AddEntryForm";
import EntryList from "./componnents/EntryList";
import NetBalance from "./componnents/NetBalances";

const App = () => {
  const [ExpensRecord, setEntries] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const addEntry = (entry) => {
    setEntries([...ExpensRecord, entry]);
  };

  const deleteEntry = (id) => {
    setEntries(ExpensRecord.filter((entry) => entry.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isDarkTheme ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto shadow-lg rounded-lg p-6 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Expense Tracker Application</h1>
          <button
            onClick={toggleTheme}
            className="py-2 px-4 rounded-full text-sm font-medium shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            style={{
              backgroundColor: isDarkTheme ? "#4CAF50" : "#333",
              color: isDarkTheme ? "#fff" : "#fff",
            }}
          >
            {isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        {/* Net Balance Component */}
        <NetBalance entries={ExpensRecord} />

        {/* Add Entry Form Component */}
        <AddEntryForm addEntry={addEntry} />

        {/* Entry List Component */}
        <EntryList entries={ExpensRecord} deleteEntry={deleteEntry} />
      </div>
    </div>
  );
};

export default App;
