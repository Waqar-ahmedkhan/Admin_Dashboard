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
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">VIP Membership Users</h1>
        <p className="text-lg text-center text-gray-600 mb-6">Manage and track VIP users who have subscribed to exclusive plans.</p>

        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="py-4 px-6 text-center">User</th>
                <th className="py-4 px-6 text-center">Email</th>
                <th className="py-4 px-6 text-center">Plan</th>
                <th className="py-4 px-6 text-center">Amount Paid</th>
                <th className="py-4 px-6 text-center">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {vipUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b text-gray-700 hover:bg-indigo-50 transition duration-200"
                >
                  <td className="py-4 px-6 text-center">{user.name}</td>
                  <td className="py-4 px-6 text-center">{user.email}</td>
                  <td className="py-4 px-6 font-semibold text-indigo-600 text-center">{user.plan}</td>
                  <td className="py-4 px-6 text-green-600 font-bold text-center">{user.amountPaid}</td>
                  <td className="py-4 px-6 text-gray-500 text-center">{user.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VIPPlansPage;
