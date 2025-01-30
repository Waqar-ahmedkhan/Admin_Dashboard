import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const ContactListPage = () => {
  const contacts = [
    {
      id: 1,
      name: 'Askash Nishad',
      email: 'jsetukashyori139@gmail.com',
      mobileNo: '7990114340',
      message: 'jigigjaaj More',
      date: '05/02/2024',
    },
    {
      id: 2,
      name: 'fgg',
      email: 's2@gmail.com',
      mobileNo: '9889686768',
      message: 'dcbbb More',
      date: '01/12/2023',
    },
    {
      id: 3,
      name: 'asakash',
      email: 'hhhj@',
      mobileNo: '7990114340',
      message: 'hkqyt More',
      date: '13/10/2023',
    },
    {
      id: 4,
      name: 'sheet',
      email: 'fgfefan@',
      mobileNo: '548595598888',
      message: 'vndn6gjgd More',
      date: '06/10/2023',
    },
    {
      id: 5,
      name: 'egg hu DG hy',
      email: 'fggggg@',
      mobileNo: '55599685555',
      message: 'ggbh More',
      date: '14/08/2023',
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Contact List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ENTRY</th>
              <th className="py-2 px-4 border-b">NAME</th>
              <th className="py-2 px-4 border-b">EMAIL</th>
              <th className="py-2 px-4 border-b">MOBILE NO</th>
              <th className="py-2 px-4 border-b">MESSAGE</th>
              <th className="py-2 px-4 border-b">DATE</th>
              <th className="py-2 px-4 border-b">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{contact.name}</td>
                <td className="py-2 px-4 border-b">{contact.email}</td>
                <td className="py-2 px-4 border-b">{contact.mobileNo}</td>
                <td className="py-2 px-4 border-b">{contact.message}</td>
                <td className="py-2 px-4 border-b">{contact.date}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700">More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ContactListPage;