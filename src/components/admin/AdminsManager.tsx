import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Trash2 } from "lucide-react";
import { Session, User } from "@supabase/supabase-js";

interface Admin {
  id: string;
  email: string;
  created_at: string;
}

interface AdminsManagerProps {
  session: Session | null;
  user: User | null;
}

const AdminsManager = ({ session, user }: AdminsManagerProps) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchAdmins = async () => {
    if (!session?.access_token) return;
    
    setLoadingAdmins(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-admins', {
        body: { action: 'list' },
      });

      if (error) throw error;
      setAdmins(data.admins || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
    setLoadingAdmins(false);
  };

  useEffect(() => {
    if (session) {
      fetchAdmins();
    }
  }, [session]);

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast({
        title: "Error",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    setAddingAdmin(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-admins', {
        body: { action: 'add', email: newAdminEmail, password: newAdminPassword },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin added successfully",
      });
      setNewAdminEmail("");
      setNewAdminPassword("");
      setDialogOpen(false);
      fetchAdmins();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setAddingAdmin(false);
  };

  const handleRemoveAdmin = async (adminId: string) => {
    if (adminId === user?.id) {
      toast({
        title: "Error",
        description: "You cannot remove yourself",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('manage-admins', {
        body: { action: 'remove', user_id: adminId },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin removed successfully",
      });
      fetchAdmins();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Administrator Management</CardTitle>
              <CardDescription>Add or remove administrators</CardDescription>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Administrator</DialogTitle>
                <DialogDescription>
                  Enter the credentials for the new administrator
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleAddAdmin}
                  disabled={addingAdmin}
                >
                  {addingAdmin ? "Adding..." : "Add Administrator"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loadingAdmins ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {admin.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{admin.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Added: {new Date(admin.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                {admin.id !== user?.id ? (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveAdmin(admin.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    You
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminsManager;
