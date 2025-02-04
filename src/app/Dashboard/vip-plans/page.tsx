import DashboardLayout from "../../components/DashboardLayout";

const VIPPlansPage = () => {
  const vipUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      plan: "Platinum VIP",
      amountPaid: "$99.99",
      paymentDate: "2025-02-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      plan: "Gold VIP",
      amountPaid: "$69.99",
      paymentDate: "2025-01-28",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      plan: "Silver VIP",
      amountPaid: "$39.99",
      paymentDate: "2025-01-25",
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">VIP Membership Users</h1>
      <p className="text-lg text-center text-gray-600 mb-10">Manage and track VIP users who have subscribed to exclusive plans.</p>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-xl border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Plan</th>
              <th className="py-3 px-6 text-left">Amount Paid</th>
              <th className="py-3 px-6 text-left">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {vipUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 font-semibold text-indigo-600">{user.plan}</td>
                <td className="py-3 px-6 text-green-600 font-bold">{user.amountPaid}</td>
                <td className="py-3 px-6 text-gray-500">{user.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default VIPPlansPage;
