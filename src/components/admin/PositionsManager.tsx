import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";

interface Position {
  id: string;
  title: string;
  is_active: boolean;
  display_order: number;
}

const PositionsManager = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPositions = async () => {
    const { data, error } = await supabase
      .from("job_positions")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "خطأ في تحميل الوظائف", variant: "destructive" });
    } else {
      setPositions(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    const maxOrder = positions.length > 0 
      ? Math.max(...positions.map(p => p.display_order)) 
      : 0;

    const { error } = await supabase
      .from("job_positions")
      .insert({ title: newTitle.trim(), display_order: maxOrder + 1 });

    if (error) {
      toast({ title: "خطأ في إضافة الوظيفة", variant: "destructive" });
    } else {
      toast({ title: "تمت إضافة الوظيفة بنجاح" });
      setNewTitle("");
      fetchPositions();
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    setSavingId(id);
    const { error } = await supabase
      .from("job_positions")
      .update({ is_active: isActive })
      .eq("id", id);

    if (error) {
      toast({ title: "خطأ في تحديث الحالة", variant: "destructive" });
    } else {
      setPositions(prev => 
        prev.map(p => p.id === id ? { ...p, is_active: isActive } : p)
      );
    }
    setSavingId(null);
  };

  const handleUpdateTitle = async (id: string, title: string) => {
    setSavingId(id);
    const { error } = await supabase
      .from("job_positions")
      .update({ title })
      .eq("id", id);

    if (error) {
      toast({ title: "خطأ في تحديث الوظيفة", variant: "destructive" });
    } else {
      toast({ title: "تم حفظ التغييرات" });
    }
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("job_positions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "خطأ في حذف الوظيفة", variant: "destructive" });
    } else {
      toast({ title: "تم حذف الوظيفة" });
      setPositions(prev => prev.filter(p => p.id !== id));
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GripVertical className="h-5 w-5" />
          إدارة الوظائف المتاحة
        </CardTitle>
        <CardDescription>
          أضف أو عدّل أو احذف الوظائف التي تظهر في فورم التقديم
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new position */}
        <div className="flex gap-2">
          <Input
            placeholder="اسم الوظيفة الجديدة..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1"
          />
          <Button onClick={handleAdd} disabled={!newTitle.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            إضافة
          </Button>
        </div>

        {/* Positions list */}
        <div className="space-y-2 mt-4">
          {positions.map((position) => (
            <div
              key={position.id}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border"
            >
              <Input
                value={position.title}
                onChange={(e) => 
                  setPositions(prev => 
                    prev.map(p => p.id === position.id ? { ...p, title: e.target.value } : p)
                  )
                }
                className="flex-1 bg-background"
              />
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">نشط</span>
                <Switch
                  checked={position.is_active}
                  onCheckedChange={(checked) => handleToggleActive(position.id, checked)}
                />
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateTitle(position.id, position.title)}
                disabled={savingId === position.id}
              >
                <Save className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(position.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {positions.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              لا توجد وظائف. أضف وظيفة جديدة للبدء.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionsManager;
