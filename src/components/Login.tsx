import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Users, UserCheck, UserCog } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = ({ onLogin }: { onLogin: (role: string) => void }) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [credentials, setCredentials] = useState({ email: "", password: "", fullName: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const roles = [
    { id: "student", label: "Student", icon: GraduationCap, color: "from-module-academics to-module-academics/70" },
    { id: "faculty", label: "Faculty", icon: UserCheck, color: "from-module-library to-module-library/70" },
    { id: "admin", label: "Administrator", icon: UserCog, color: "from-primary to-primary-dark" },
    { id: "parent", label: "Parent", icon: Users, color: "from-module-admission to-module-admission/70" },
  ];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password || !selectedRole) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a role",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            role: selectedRole,
            full_name: credentials.fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        // Update profile with additional info
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: credentials.fullName,
            email: credentials.email,
            [`${selectedRole}_id`]: `${selectedRole.toUpperCase()}${Date.now()}`,
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error("Profile update error:", profileError);
        }

        toast({
          title: "Account created successfully!",
          description: "Welcome to EduManage ERP",
        });
        onLogin(selectedRole);
      } else {
        toast({
          title: "Please check your email",
          description: "We've sent you a confirmation link to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Error",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile to determine role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const userRole = profile?.role || 'student';
        
        toast({
          title: "Login Successful",
          description: `Welcome back to EduManage ERP`,
        });
        onLogin(userRole);
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-5xl font-bold text-foreground">
            EduManage <span className="text-primary">ERP</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Integrated Student Management System
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-muted-foreground">Real-time Attendance & Academic Tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
              <p className="text-muted-foreground">Integrated Fee & Hostel Management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
              <p className="text-muted-foreground">AI-Powered Analytics & Predictions</p>
                 </div>
              <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
              <p className="text-muted-foreground">DEMO LOGIN CREDENTIALS</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-succes animate-pulse" />
              <p className="text-muted-foreground">Email : demo1@demo.com</p>
              <p className="text-muted-foreground">password : 123456</p>
            </div>
         
          </div>
        </div>

        <Card className="p-8 shadow-card backdrop-blur-sm bg-card/95">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Welcome Back</h2>
                <p className="text-muted-foreground mt-2">Login to your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" variant="gradient" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Create Account</h2>
                <p className="text-muted-foreground mt-2">Select your role and sign up</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedRole === role.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    disabled={loading}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-2`}>
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">{role.label}</p>
                  </button>
                ))}
              </div>

              {selectedRole && (
                <form onSubmit={handleSignUp} className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={credentials.fullName}
                      onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="gradient" disabled={loading}>
                    {loading ? "Creating account..." : `Sign up as ${roles.find(r => r.id === selectedRole)?.label}`}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};


export default Login;
