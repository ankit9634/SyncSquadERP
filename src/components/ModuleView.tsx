import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, DollarSign, Building, GraduationCap, Library, 
  FileText, Activity, Search, Filter, Download, Plus,
  Calendar, Clock, CheckCircle, AlertCircle, TrendingUp,
  Bell, BarChart, User
} from "lucide-react";
import Analytics from "./Analytics";
import NotificationCenter from "./NotificationCenter";
import StudentProfile from "./StudentProfile";

interface ModuleViewProps {
  module: string;
  userRole: string;
}

const ModuleView = ({ module, userRole }: ModuleViewProps) => {
  // Special module views
  if (module === "analytics") {
    return <Analytics />;
  }
  
  if (module === "notifications") {
    return <NotificationCenter />;
  }
  
  if (module === "profile") {
    return <StudentProfile />;
  }
  const moduleConfigs: Record<string, any> = {
    admission: {
      title: "Admission Management",
      icon: Users,
      color: "text-module-admission",
      tabs: ["New Applications", "Approved", "Pending", "Rejected"],
      stats: [
        { label: "Total Applications", value: "245", trend: "+15%" },
        { label: "Approved", value: "180", trend: "+8%" },
        { label: "Pending Review", value: "45", trend: "-5%" },
        { label: "Seats Available", value: "120", trend: "60%" },
      ],
    },
    attendance: {
      title: "Attendance Management",
      icon: Activity,
      color: "text-module-attendance",
      tabs: ["Today", "Weekly Report", "Monthly Report", "Alerts"],
      stats: [
        { label: "Present Today", value: "2,180", trend: "89%" },
        { label: "Absent", value: "270", trend: "11%" },
        { label: "On Leave", value: "45", trend: "2%" },
        { label: "Late Arrivals", value: "32", trend: "-8%" },
      ],
    },
    fees: {
      title: "Fee Management",
      icon: DollarSign,
      color: "text-module-fees",
      tabs: ["Pending Fees", "Paid", "Overdue", "Reports"],
      stats: [
        { label: "Total Collection", value: "₹45.2L", trend: "+12%" },
        { label: "Pending", value: "₹8.5L", trend: "-5%" },
        { label: "Overdue", value: "₹2.3L", trend: "+3%" },
        { label: "This Month", value: "₹12.8L", trend: "+18%" },
      ],
    },
    hostel: {
      title: "Hostel Management",
      icon: Building,
      color: "text-module-hostel",
      tabs: ["Room Allocation", "Occupancy", "Maintenance", "Requests"],
      stats: [
        { label: "Total Rooms", value: "450", trend: "100%" },
        { label: "Occupied", value: "382", trend: "85%" },
        { label: "Available", value: "68", trend: "15%" },
        { label: "Maintenance", value: "12", trend: "3%" },
      ],
    },
    academics: {
      title: "Academic Management",
      icon: GraduationCap,
      color: "text-module-academics",
      tabs: ["Courses", "Timetable", "Assignments", "Performance"],
      stats: [
        { label: "Active Courses", value: "48", trend: "+4" },
        { label: "Total Faculty", value: "125", trend: "+8" },
        { label: "Avg Performance", value: "78%", trend: "+5%" },
        { label: "Assignments", value: "234", trend: "Active" },
      ],
    },
    library: {
      title: "Library Management",
      icon: Library,
      color: "text-module-library",
      tabs: ["Books", "Issued", "Returns", "Digital Resources"],
      stats: [
        { label: "Total Books", value: "12,500", trend: "+250" },
        { label: "Issued Today", value: "145", trend: "+12" },
        { label: "Pending Returns", value: "89", trend: "-5" },
        { label: "Digital Access", value: "2,450", trend: "Active" },
      ],
    },
    examination: {
      title: "Examination Management",
      icon: FileText,
      color: "text-module-examination",
      tabs: ["Upcoming Exams", "Results", "Hall Tickets", "Schedule"],
      stats: [
        { label: "Upcoming Exams", value: "12", trend: "Next Week" },
        { label: "Results Pending", value: "5", trend: "Processing" },
        { label: "Students Registered", value: "2,380", trend: "97%" },
        { label: "Exam Centers", value: "8", trend: "Active" },
      ],
    },
  };

  const config = moduleConfigs[module] || moduleConfigs.admission;

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-muted ${config.color}`}>
              <config.icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="text-muted-foreground">Manage and monitor {module} operations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export
            </Button>
            {userRole === "admin" && (
              <Button variant="gradient">
                <Plus className="h-4 w-4" />
                Add New
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.stats.map((stat: any, idx: number) => (
            <Card key={idx} className="hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <p className="text-sm text-muted-foreground">{stat.trend}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Content */}
        <Card>
          <CardHeader>
            <CardTitle>Module Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={config.tabs[0].toLowerCase().replace(/\s+/g, '-')}>
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                {config.tabs.map((tab: string) => (
                  <TabsTrigger key={tab} value={tab.toLowerCase().replace(/\s+/g, '-')}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {config.tabs.map((tab: string) => (
                <TabsContent key={tab} value={tab.toLowerCase().replace(/\s+/g, '-')} className="mt-6">
                  <div className="space-y-4">
                    {/* Sample Data Table */}
                    <div className="rounded-lg border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className="border-t hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3 text-sm">STU00{item}</td>
                              <td className="px-4 py-3 text-sm">Sample Student {item}</td>
                              <td className="px-4 py-3">
                                <Badge variant={item % 2 === 0 ? "default" : "secondary"}>
                                  {item % 2 === 0 ? "Active" : "Pending"}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">
                                {new Date().toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3">
                                <Button variant="ghost" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ModuleView;