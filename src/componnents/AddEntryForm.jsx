import React, { useState } from "react";

const AddEntryForm = ({ addEntry }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Income");
  const [isCustomType, setIsCustomType] = useState(false);
  const [customType, setCustomType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description || !date) {
      alert("Please fill in all fields.");
      return;
    }

    // Validation: Check for special symbols in the description
    const specialSymbolRegex = /[^a-zA-Z0-9\s]/;
    if (specialSymbolRegex.test(description)) {
      alert("Description should not contain special characters.");
      return;
    }

    // Validation: Prevent future dates
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we compare dates without time
    if (selectedDate > today) {
      alert("Date cannot be in the future.");
      return;
    }

    const entryType = isCustomType ? customType : type;

    if (isCustomType && !customType.trim()) {
      alert("Custom type cannot be empty.");
      return;
    }

    const entry = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      date,
      type: entryType,
    };

    addEntry(entry);
    setAmount("");
    setDescription("");
    setDate("");
    setType("Income");
    setCustomType("");
    setIsCustomType(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Entry
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="date"
          max={new Date().toISOString().split("T")[0]} // Prevent future dates
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        {!isCustomType ? (
          <select
            value={type}
            onChange={(e) => {
              if (e.target.value === "Custom") {
                setIsCustomType(true);
              } else {
                setType(e.target.value);
              }
            }}
            className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Custom">Add Custom Type</option>
          </select>
        ) : (
          <input
            type="text"
            placeholder="Enter custom type"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-3 px-6 rounded-lg shadow hover:bg-indigo-600 transition-all"
      >
        Add Entry
      </button>
    </form>
  );
};

export default AddEntryForm;
