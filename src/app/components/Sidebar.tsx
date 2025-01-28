import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    'Dashboard',
    'User',
    'Profiles',
    'Live Stream',
    'User Delete Requests',
    'Reported User',
    'VIP Plans',
    'Purchase History',
    'Notification',
    'Contact List',
    'Setting',
  ];

  return (
    <div className="w-64 text-black p-4">
      <h1 className="text-2xl font-bold mb-6">MeetHub</h1>
      <ul>
        {menuItems.map((item, index) => {
          // Special case for Dashboard
          const path = item === 'Dashboard' 
            ? '/Dashboard' 
            : `/Dashboard/${item.toLowerCase().replace(/ /g, '-')}`;
          
          // Check if the current path is active
          const isActive = pathname === path || (item === 'Dashboard' && pathname === '/Dashboard');

          return (
            <li key={index} className="mb-2">
              <Link
                href={path}
                className={`block p-2 rounded hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 text-white' : 'text-black'
                }`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;