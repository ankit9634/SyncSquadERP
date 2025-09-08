import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  User, Mail, Phone, MapPin, Calendar, Award, 
  TrendingUp, BookOpen, Activity, DollarSign 
} from "lucide-react";

const StudentProfile = () => {
  const performanceData = {
    attendance: 89,
    academics: 78,
    assignments: 92,
    participation: 85,
  };

  const subjects = [
    { name: "Mathematics", grade: "A", attendance: 92 },
    { name: "Physics", grade: "B+", attendance: 88 },
    { name: "Computer Science", grade: "A+", attendance: 95 },
    { name: "English", grade: "B", attendance: 85 },
    { name: "Chemistry", grade: "A-", attendance: 90 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Student Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-24 h-24 bg-gradient-primary" />
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Student ID: STU2024001</p>
                <Badge className="mt-2">B.Tech Computer Science - 3rd Year</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">john.doe@edumanage.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Hostel Block A, Room 203</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Enrolled: July 2021</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(performanceData).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm capitalize">{key}</span>
                  <span className="text-sm font-medium">{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjects.map((subject, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">Attendance: {subject.attendance}%</p>
                  </div>
                  <Badge variant="secondary">{subject.grade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-module-attendance/20">
                <Activity className="h-5 w-5 text-module-attendance" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Attendance</p>
                <p className="text-lg font-bold">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-module-academics/20">
                <Award className="h-5 w-5 text-module-academics" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">CGPA</p>
                <p className="text-lg font-bold">8.2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-module-library/20">
                <BookOpen className="h-5 w-5 text-module-library" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Books Issued</p>
                <p className="text-lg font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-module-fees/20">
                <DollarSign className="h-5 w-5 text-module-fees" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fee Status</p>
                <p className="text-lg font-bold text-success">Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;