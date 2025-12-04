import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, Lock, User } from "lucide-react";
import crcLogo from "@/assets/crc-logo-full.png";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin already exists
    const checkAdmin = async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("id")
        .eq("role", "admin")
        .limit(1);

      if (!error && data && data.length > 0) {
        setHasAdmin(true);
      } else {
        setHasAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "خطأ",
        description: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (signUpError) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: signUpError.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (signUpData.user) {
      // Add admin role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: signUpData.user.id,
          role: "admin",
        });

      if (roleError) {
        toast({
          title: "خطأ في تعيين الصلاحيات",
          description: roleError.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "تم إنشاء حساب المسؤول",
        description: "يمكنك الآن تسجيل الدخول",
      });

      navigate("/admin");
    }

    setIsSubmitting(false);
  };

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crc-light-blue">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-crc-light-blue via-white to-crc-light-blue p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img src={crcLogo} alt="CRC Logo" className="h-16 object-contain" />
            </div>
            <CardTitle className="text-xl text-destructive">غير مسموح</CardTitle>
            <CardDescription>
              تم إنشاء حساب المسؤول مسبقاً. يرجى تسجيل الدخول.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/admin")} className="w-full">
              الذهاب لصفحة تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-crc-light-blue via-white to-crc-light-blue p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="flex justify-center">
            <img src={crcLogo} alt="CRC Logo" className="h-16 object-contain" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-crc-green" />
            <CardTitle className="text-2xl text-primary">إنشاء حساب المسؤول</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            أنشئ حساب المسؤول الأول للموقع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-right block">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  dir="ltr"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-6" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإنشاء..." : "إنشاء حساب المسؤول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
