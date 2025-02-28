"use client";
import React, { useState } from "react";

const PaymentSettings: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

  const handleSave = () => {
    console.log("Payment Method Updated:", paymentMethod);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300"
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
      >
        Save
      </button>
    </div>
  );
};

export default PaymentSettings;