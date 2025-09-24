import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  UserCircle,
  Trash2,
  Flag,
  Star,
  ShoppingCart,
  Bell,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/Dashboard" },
    { name: "User", icon: Users, path: "/Dashboard/user" },
    { name: "Profiles", icon: UserCircle, path: "/Dashboard/profiles" },
    { name: "User Delete Requests", icon: Trash2, path: "/Dashboard/user-delete-requests" },
    { name: "Reported User", icon: Flag, path: "/Dashboard/reported-user" },
    { name: "VIP Plans", icon: Star, path: "/Dashboard/vip-plans" },
    { name: "Purchase History", icon: ShoppingCart, path: "/Dashboard/purchase-history" },
    { name: "Notification", icon: Bell, path: "/Dashboard/notification" },
    { name: "Setting", icon: Settings, path: "/Dashboard/setting" },
  ];

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 md:hidden p-2.5 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-700 transition-all duration-200 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-slate-900 border-r border-slate-700 text-white p-6 z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:shadow-xl`}
      >
        {/* Brand — Clean, bold, professional */}
        <h1 className="text-xl font-bold mb-8 text-center text-white tracking-wide">
          MeetAny
        </h1>

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              const isDashboard = item.name === "Dashboard";

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 group relative ${
                      isActive
                        ? isDashboard
                          ? "bg-blue-600 text-white border-l-4 border-blue-400"
                          : "bg-slate-700 text-white border-l-4 border-purple-500"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      }
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;