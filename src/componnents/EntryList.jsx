import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const EntryList = ({ entries, deleteEntry }) => {
  const entryListRef = useRef();

  const saveAsPDF = async () => {
    const element = entryListRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Expense_Record.pdf");
  };

  // Group entries by user
  const userBalances = entries.reduce((acc, entry) => {
    if (!acc[entry.name]) {
      acc[entry.name] = { income: 0, expense: 0 };
    }
    if (entry.type === "Income") {
      acc[entry.name].income += entry.amount;
    } else {
      acc[entry.name].expense += entry.amount;
    }
    return acc;
  }, {});

  return (
    <div
      className="bg-gray-50 p-6 rounded-lg shadow-lg relative"
      ref={entryListRef}
    >
      {/* Save PDF Button */}
      <button
        onClick={saveAsPDF}
        className="absolute top-6 right-6 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Save As PDF
      </button>

      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Expense Record
      </h2>
      {entries.length === 0 ? (
        <p className="text-gray-500 text-center">No entries to display.</p>
      ) : (
        <>
          {/* List of Entries */}
          <ul className="space-y-6">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {entry.name}
                  </p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {entry.description}
                  </p>
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
                <p
                  className={`text-lg font-bold ${
                    entry.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹{entry.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="py-2 px-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* User Balances */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              User Balances
            </h3>
            <ul className="space-y-4">
              {Object.entries(userBalances).map(([user, balance]) => (
                <li
                  key={user}
                  className="bg-white p-4 rounded-lg shadow-md border"
                >
                  <p className="text-lg font-bold text-gray-800">{user}</p>
                  <p className="text-green-600">
                    Total Income: ₹{balance.income.toFixed(2)}
                  </p>
                  <p className="text-red-600">
                    Total Expense: ₹{balance.expense.toFixed(2)}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    Net Balance: ₹
                    {(balance.income - balance.expense).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default EntryList;
