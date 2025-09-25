import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthWorking = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    document.title = isLogin ? "Login - FiveM Database CDN" : "Sign Up - FiveM Database CDN";
  }, [isLogin]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailClean = formData.email.trim().toLowerCase();
      if (!emailRegex.test(emailClean)) {
        toast.error("Please enter a valid email (words@words.words)");
        setLoading(false);
        return;
      }

      if (isLogin) {
        const { error } = await signIn(emailClean, formData.password);
        if (error) {
          toast.error("Login failed: " + error.message);
        } else {
          toast.success("Successfully logged in!");
          navigate("/");
        }
      } else {
        const { error } = await signUp(emailClean, formData.password, formData.username.trim());
        if (error) {
          const raw = error.message || "";
          let friendly = raw;
          if (/invalid/i.test(raw)) {
            friendly = "This email is being rejected by your Supabase auth settings. Clear the Email allow list (Auth > Providers > Email) or add your domain to allow words@domain.tld.";
          }
          toast.error("Sign up failed: " + friendly);
        } else {
          toast.success("Account created successfully!");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An unexpected error occurred");
    }

    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://FiveM Database.com/cdn/VelocityNetwork/banners/background.png')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="bg-background/95 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Login" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Welcome back to FiveM Database CDN" 
                : "Join FiveM Database CDN today"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input 
                    placeholder="Choose a username" 
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    required
                    minLength={3}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input 
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input 
                  type="password"
                  placeholder={isLogin ? "Enter your password" : "Choose a password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary underline hover:no-underline"
                  >
                    {isLogin ? "Create an account" : "Login"}
                  </button>
                </p>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading 
                    ? (isLogin ? "Logging in..." : "Creating account...") 
                    : (isLogin ? "Login" : "Create Account")
                  }
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthWorking;