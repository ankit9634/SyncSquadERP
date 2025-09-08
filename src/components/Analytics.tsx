import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, TrendingDown, BarChart3, PieChart, 
  Activity, Users, DollarSign, AlertTriangle,
  Target, Brain, Calendar, Download
} from "lucide-react";

const Analytics = () => {
  const predictions = [
    {
      title: "Dropout Risk Analysis",
      risk: "High Risk Students",
      count: 23,
      percentage: 2.8,
      trend: "decreasing",
      factors: ["Low Attendance", "Poor Grades", "Fee Delays"],
    },
    {
      title: "Performance Prediction",
      risk: "Below Average",
      count: 145,
      percentage: 18,
      trend: "stable",
      factors: ["Attendance < 75%", "Assignment Pending", "Low Quiz Scores"],
    },
    {
      title: "Fee Default Prediction",
      risk: "Likely Defaulters",
      count: 67,
      percentage: 8.2,
      trend: "increasing",
      factors: ["Past Delays", "Economic Background", "Communication Gap"],
    },
  ];

  const performanceMetrics = [
    { label: "Overall Pass Rate", value: 87, target: 90, status: "warning" },
    { label: "Average CGPA", value: 7.8, target: 8.0, status: "warning" },
    { label: "Placement Rate", value: 92, target: 85, status: "success" },
    { label: "Research Output", value: 78, target: 80, status: "warning" },
  ];

  const departmentAnalytics = [
    { name: "Computer Science", students: 450, performance: 85, placement: 95 },
    { name: "Electronics", students: 380, performance: 78, placement: 88 },
    { name: "Mechanical", students: 420, performance: 82, placement: 90 },
    { name: "Civil", students: 350, performance: 80, placement: 85 },
    { name: "Chemical", students: 280, performance: 76, placement: 82 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Predictive Analytics Dashboard</h1>
          <p className="text-muted-foreground">AI-powered insights and predictions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="gradient">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictions.map((pred, idx) => (
          <Card key={idx} className="hover:shadow-card transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5 text-primary" />
                {pred.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{pred.count}</p>
                  <p className="text-sm text-muted-foreground">Students at risk</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {pred.trend === "decreasing" ? (
                      <TrendingDown className="h-4 w-4 text-success" />
                    ) : pred.trend === "increasing" ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <Activity className="h-4 w-4 text-warning" />
                    )}
                    <span className="text-sm font-medium">{pred.percentage}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pred.trend}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Key Factors:</p>
                <div className="flex flex-wrap gap-1">
                  {pred.factors.map((factor, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Performance vs Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <Badge 
                    variant={metric.status === "success" ? "default" : "secondary"}
                    className={metric.status === "success" ? "bg-success" : "bg-warning"}
                  >
                    {metric.value}{metric.label.includes("CGPA") ? "" : "%"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={(metric.value / metric.target) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Target: {metric.target}{metric.label.includes("CGPA") ? "" : "%"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentAnalytics.map((dept, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <span className="text-xs text-muted-foreground">{dept.students} students</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Performance</span>
                      <span>{dept.performance}%</span>
                    </div>
                    <Progress value={dept.performance} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Risk Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/20">
                    <Users className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">High Absenteeism</p>
                    <p className="text-sm text-muted-foreground">
                      156 students below 60% attendance
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/20">
                    <DollarSign className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Fee Collection Gap</p>
                    <p className="text-sm text-muted-foreground">
                      ₹12.3L pending from 89 students
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/20">
                    <Activity className="h-5 w-5 text-info" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Academic Performance</p>
                    <p className="text-sm text-muted-foreground">
                      234 students need remedial classes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;