import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Home, Users, DollarSign, Building, GraduationCap, 
  Library, FileText, Activity, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, BarChart, Menu
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  userRole: string;
}

const Sidebar = ({ activeModule, setActiveModule, userRole }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: Home, color: "text-primary" },
    { id: "admission", label: "Admissions", icon: Users, color: "text-module-admission" },
    { id: "attendance", label: "Attendance", icon: Activity, color: "text-module-attendance" },
    { id: "fees", label: "Fee Management", icon: DollarSign, color: "text-module-fees" },
    { id: "hostel", label: "Hostel", icon: Building, color: "text-module-hostel" },
    { id: "academics", label: "Academics", icon: GraduationCap, color: "text-module-academics" },
    { id: "library", label: "Library", icon: Library, color: "text-module-library" },
    { id: "examination", label: "Examinations", icon: FileText, color: "text-module-examination" },
    { id: "analytics", label: "Analytics", icon: BarChart, color: "text-info" },
    { id: "notifications", label: "Notifications", icon: Bell, color: "text-warning" },
  ];

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-sidebar text-sidebar-foreground h-full transition-all duration-300 flex flex-col border-r border-sidebar-border`}>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">EduManage</h2>
                <p className="text-xs text-sidebar-foreground/70">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? '' : item.color}`} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground transition-all ${collapsed ? 'justify-center' : ''}`}>
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </button>
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/20 text-sidebar-foreground/80 hover:text-destructive transition-all ${collapsed ? 'justify-center' : ''}`}>
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;