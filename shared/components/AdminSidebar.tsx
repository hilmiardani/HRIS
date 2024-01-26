import Admin from "@/icons/Admin";
import Booking from "@/icons/Booking";
import Calendar from "@/icons/Calendar";
import Electricity from "@/icons/Electricity";
import Employee from "@/icons/Employee";
import Inventory from "@/icons/Inventory";
import Overview from "@/icons/Overview";
import Paper from "@/icons/Paper";
import Promo from "@/icons/Promo";
import Property from "@/icons/Property";
import Rate from "@/icons/Rate";
import Report from "@/icons/Report";
import Unit from "@/icons/Unit";
import User from "@/icons/User";
import { ScrollArea } from "@mantine/core";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "shared/contracts/sidebar";

export default function AdminSidebar({ toggleOpen, opened, role }: { toggleOpen: () => void, opened: boolean, role: string }) {
  // Define the allowed modules for each role
  const allowedModulesByRole: { [key: string]: string[] } = {
    admin: ['overview', 'calendar', 'employee', 'admin', 'attendance', 'request'],
    developer: ['overview', 'calendar', 'employee', 'admin', 'attendance', 'request'],
  };

  const menu: Menu[] = [
    {
      label: "Overview",
      module: "overview",
      url: "/overview",
      icon: (active) => <Overview active={active} className="w-6" />,
    },
    {
      label: "Calendar",
      module: "calendar",
      url: "/calendar",
      icon: (active) => <Calendar active={active} className="w-6" />,
    },
    {
      label: "Employee",
      module: "employee",
      url: "/employee",
      icon: (active) => <Employee active={active} className="w-6" />,
    },
    {
      label: "Admin",
      module: "admin",
      url: "/admin",
      icon: (active) => <Admin active={active} className="w-6" />,
    },
    {
      label: "Attendance",
      module: "attendance",
      url: "/attendance",
      icon: (active) => <Calendar active={active} className="w-6" />,
    },
    {
      label: "Request",
      module: "request",
      url: "/request",
      icon: (active) => <Paper active={active} className="w-6" />,
    }
  ];

  // Function to filter the menu based on user's role
  const filteredMenu = menu.filter(item => {
    // Show all menu items for admins
    if (role === 'admin') {
      return allowedModulesByRole.admin.includes(item.module);
    }
    // Show only specific menu items for developers
    if (role === 'developer') {
      // Specify the module names that developers can access
      return allowedModulesByRole.developer.includes(item.module);
    }
    return false; // Default to hiding the item
  });

  const pathname = usePathname();

  return (
    <div>
      <ScrollArea.Autosize mah={"90vh"} pb={"md"}>
        <ul> {
          filteredMenu.map(({ url, icon, label, module }) => (
            <li key={label} className="p-1 w-full">
              <NextLink
                href={url}
                onClick={toggleOpen}
                className={`hover:bg-red-50 rounded hover:text-primary w-full text-sm p-2 items-center flex flex-row ${pathname?.split("/")[1] === module ? "text-primary" : "text-secondary"}`} >
                {icon(pathname?.split("/")[1] === module)} &nbsp; {label}
              </NextLink>
            </li>
          ))
        } </ul>
      </ScrollArea.Autosize>
    </div>
  );
}
