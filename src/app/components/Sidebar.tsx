import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserCircle,
  Video,
  Trash2,
  Flag,
  Star,
  ShoppingCart,
  Bell,
  Contact,
  Settings,
} from "lucide-react"; // Icons for menu items

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  // Menu items with corresponding icons
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "User", icon: <Users size={18} /> },
    { name: "Profiles", icon: <UserCircle size={18} /> },
    { name: "Live Stream", icon: <Video size={18} /> },
    { name: "User Delete Requests", icon: <Trash2 size={18} /> },
    { name: "Reported User", icon: <Flag size={18} /> },
    { name: "VIP Plans", icon: <Star size={18} /> },
    { name: "Purchase History", icon: <ShoppingCart size={18} /> },
    { name: "Notification", icon: <Bell size={18} /> },
    { name: "Contact List", icon: <Contact size={18} /> },
    { name: "Setting", icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 md:hidden p-2 bg-gray-800 text-white rounded-md shadow-lg hover:bg-gray-700 transition-colors duration-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 z-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        {/* Brand Logo */}
        <h1 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          MeetHub
        </h1>

        {/* Menu Items */}
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const path =
              item.name === "Dashboard"
                ? "/Dashboard"
                : `/Dashboard/${item.name.toLowerCase().replace(/ /g, "-")}`;

            const isActive =
              pathname === path ||
              (item.name === "Dashboard" && pathname === "/Dashboard");

            return (
              <li key={index}>
                <Link
                  href={path}
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "hover:bg-gray-700 hover:text-gray-100"
                  }`}
                  onClick={toggleSidebar} // Close sidebar on link click
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;