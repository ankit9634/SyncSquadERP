import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, Mail, MessageSquare, Calendar, AlertCircle, 
  CheckCircle, Info, Clock, Settings, Send 
} from "lucide-react";

const NotificationCenter = () => {
  const notifications = [
    {
      id: 1,
      type: "warning",
      icon: AlertCircle,
      title: "Low Attendance Alert",
      message: "Your attendance has dropped below 75% in Mathematics",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      icon: Calendar,
      title: "Exam Schedule Released",
      message: "Mid-term examinations will begin from March 15, 2024",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      icon: CheckCircle,
      title: "Fee Payment Confirmed",
      message: "Your semester fee payment of ₹45,000 has been received",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "info",
      icon: Info,
      title: "Library Book Due",
      message: "Please return 'Advanced Algorithms' by tomorrow",
      time: "2 days ago",
      read: true,
    },
  ];

  const channels = [
    { id: "email", label: "Email", icon: Mail, enabled: true },
    { id: "sms", label: "SMS", icon: MessageSquare, enabled: true },
    { id: "whatsapp", label: "WhatsApp", icon: Send, enabled: false },
    { id: "push", label: "Push Notifications", icon: Bell, enabled: true },
  ];

  const preferences = [
    { category: "Academic", email: true, sms: false, push: true },
    { category: "Attendance", email: true, sms: true, push: true },
    { category: "Fee Reminders", email: true, sms: true, push: false },
    { category: "Library", email: false, sms: false, push: true },
    { category: "Hostel", email: true, sms: false, push: true },
    { category: "Examinations", email: true, sms: true, push: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Center
            </div>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Notifications</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all hover:shadow-soft ${
                    !notification.read ? 'bg-primary/5 border-primary/20' : 'bg-card'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'warning' ? 'bg-warning/20 text-warning' :
                      notification.type === 'success' ? 'bg-success/20 text-success' :
                      'bg-info/20 text-info'
                    }`}>
                      <notification.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <Badge variant="secondary" className="ml-2">New</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="unread" className="space-y-4 mt-6">
              {notifications.filter(n => !n.read).map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 rounded-lg border bg-primary/5 border-primary/20 transition-all hover:shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'warning' ? 'bg-warning/20 text-warning' :
                      notification.type === 'success' ? 'bg-success/20 text-success' :
                      'bg-info/20 text-info'
                    }`}>
                      <notification.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-6">
              {/* Notification Channels */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {channels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <channel.icon className="h-5 w-5 text-muted-foreground" />
                        <Label htmlFor={channel.id} className="cursor-pointer">
                          {channel.label}
                        </Label>
                      </div>
                      <Switch id={channel.id} checked={channel.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Preferences */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                        <th className="px-4 py-3 text-center text-sm font-medium">Email</th>
                        <th className="px-4 py-3 text-center text-sm font-medium">SMS</th>
                        <th className="px-4 py-3 text-center text-sm font-medium">Push</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preferences.map((pref, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-3 text-sm">{pref.category}</td>
                          <td className="px-4 py-3 text-center">
                            <Switch checked={pref.email} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Switch checked={pref.sms} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Switch checked={pref.push} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="gradient">
                  <Settings className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;