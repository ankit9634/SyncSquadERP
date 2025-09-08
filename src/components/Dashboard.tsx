import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Users, DollarSign, Building, GraduationCap, 
  Library, FileText, Bell, TrendingUp, Calendar,
  BarChart3, PieChart, Activity, AlertCircle, LogOut
} from "lucide-react";
import Sidebar from "./Sidebar";
import ModuleView from "./ModuleView";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userRole, user }: { userRole: string; user: User | null }) => {
  const [activeModule, setActiveModule] = useState<string>("overview");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    }
  };

  const stats = [
    { label: "Total Students", value: "2,450", change: "+12%", icon: Users, color: "text-module-admission" },
    { label: "Fee Collection", value: "₹45.2L", change: "+8%", icon: DollarSign, color: "text-module-fees" },
    { label: "Attendance Today", value: "89%", change: "-2%", icon: Activity, color: "text-module-attendance" },
    { label: "Library Books", value: "12,500", change: "+5%", icon: Library, color: "text-module-library" },
  ];

  const modules = [
    { id: "admission", label: "Admissions", icon: Users, color: "bg-module-admission", count: "45 New" },
    { id: "attendance", label: "Attendance", icon: Activity, color: "bg-module-attendance", count: "89%" },
    { id: "fees", label: "Fee Management", icon: DollarSign, color: "bg-module-fees", count: "₹45.2L" },
    { id: "hostel", label: "Hostel", icon: Building, color: "bg-module-hostel", count: "85% Full" },
    { id: "academics", label: "Academics", icon: GraduationCap, color: "bg-module-academics", count: "12 Courses" },
    { id: "library", label: "Library", icon: Library, color: "bg-module-library", count: "450 Active" },
    { id: "examination", label: "Examinations", icon: FileText, color: "bg-module-examination", count: "3 Upcoming" },
  ];

  const alerts = [
    { type: "warning", message: "15 students have attendance below 75%", time: "2 hours ago" },
    { type: "info", message: "New admissions portal opens tomorrow", time: "5 hours ago" },
    { type: "success", message: "Fee collection target achieved for this month", time: "1 day ago" },
  ];

  if (activeModule !== "overview") {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} userRole={userRole} />
        <ModuleView module={activeModule} userRole={userRole} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} userRole={userRole} />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome to EduManage ERP</h1>
              <p className="text-muted-foreground">Integrated Student Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                {user?.email}
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="gradient">
                <Calendar className="h-4 w-4" />
                Today's Schedule
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Quick Access Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className="group p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all hover:shadow-soft"
                  >
                    <div className={`w-10 h-10 rounded-lg ${module.color} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                      <module.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-xs font-medium">{module.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{module.count}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Performance Analytics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Academic Performance</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Fee Collection Rate</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Resource Utilization</span>
                      <span className="text-sm font-medium">73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          alert.type === 'warning' ? 'bg-warning' :
                          alert.type === 'info' ? 'bg-info' : 'bg-success'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;