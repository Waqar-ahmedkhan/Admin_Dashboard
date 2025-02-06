import React from "react";

const PaymentSettings: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Settings</h2>
      <p className="text-gray-600 mb-4">Manage your payment methods and preferences.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Default Payment Method
        </label>
        <select className="border rounded-lg p-3 w-full focus:ring focus:ring-indigo-300">
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition">
        Update Payment Method
      </button>
    </div>
  );
};

export default PaymentSettings;
