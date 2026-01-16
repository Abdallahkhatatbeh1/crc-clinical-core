import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Stethoscope, Save, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useAllTherapeuticAreas, TherapeuticArea } from "@/hooks/useTherapeuticAreas";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const TherapeuticAreasManager = () => {
  const { areas, isLoading, addArea, updateArea, deleteArea, refetch } = useAllTherapeuticAreas();
  const [newTitle, setNewTitle] = useState("");
  const [newShortTitle, setNewShortTitle] = useState("");
  const [newConditions, setNewConditions] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!newTitle.trim() || !newShortTitle.trim() || !newConditions.trim()) {
      toast({ title: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }

    const maxOrder = areas.length > 0 
      ? Math.max(...areas.map(a => a.display_order)) 
      : 0;

    const { error } = await addArea({
      title: newTitle.trim(),
      short_title: newShortTitle.trim(),
      conditions: newConditions.trim(),
      display_order: maxOrder + 1,
      is_active: true,
      image_url: null,
    });

    if (error) {
      toast({ title: "خطأ في إضافة المجال العلاجي", variant: "destructive" });
    } else {
      toast({ title: "تمت إضافة المجال العلاجي بنجاح" });
      setNewTitle("");
      setNewShortTitle("");
      setNewConditions("");
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    setSavingId(id);
    const { error } = await updateArea(id, { is_active: isActive });
    if (error) {
      toast({ title: "خطأ في تحديث الحالة", variant: "destructive" });
    }
    setSavingId(null);
  };

  const handleSave = async (id: string, updates: Partial<TherapeuticArea>) => {
    setSavingId(id);
    const { error } = await updateArea(id, updates);
    if (error) {
      toast({ title: "خطأ في تحديث البيانات", variant: "destructive" });
    } else {
      toast({ title: "تم حفظ التغييرات" });
    }
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteArea(id);
    if (error) {
      toast({ title: "خطأ في حذف المجال العلاجي", variant: "destructive" });
    } else {
      toast({ title: "تم حذف المجال العلاجي" });
    }
  };

  const handleImageUpload = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingId(id);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image_type', 'therapeutic');

      const { data, error } = await supabase.functions.invoke('upload-image', {
        body: formData,
      });

      if (error) throw error;

      await updateArea(id, { image_url: data.url });
      toast({ title: "تم رفع الصورة بنجاح" });
    } catch (error) {
      toast({ title: "خطأ في رفع الصورة", variant: "destructive" });
    }
    setUploadingId(null);
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
          <Stethoscope className="h-5 w-5" />
          إدارة المجالات العلاجية
        </CardTitle>
        <CardDescription>
          أضف وعدّل واحذف المجالات العلاجية التي تظهر في صفحة الدراسات
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new area */}
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-3">
          <h3 className="font-medium text-foreground">إضافة مجال علاجي جديد</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="العنوان الكامل (مثال: Cardiovascular)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Input
              placeholder="العنوان المختصر (مثال: Cardio)"
              value={newShortTitle}
              onChange={(e) => setNewShortTitle(e.target.value)}
            />
          </div>
          <Textarea
            placeholder="الحالات المرضية (مفصولة بـ |) مثال: Heart Failure|Hypertension|Arrhythmia"
            value={newConditions}
            onChange={(e) => setNewConditions(e.target.value)}
            rows={2}
          />
          <Button onClick={handleAdd} disabled={!newTitle.trim() || !newShortTitle.trim() || !newConditions.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            إضافة مجال علاجي
          </Button>
        </div>

        {/* Areas list */}
        <div className="space-y-3">
          {areas.map((area) => (
            <Collapsible
              key={area.id}
              open={expandedId === area.id}
              onOpenChange={() => setExpandedId(expandedId === area.id ? null : area.id)}
            >
              <div className="bg-muted/50 rounded-lg border overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/70 transition-colors">
                    {/* Image Preview */}
                    <div className="w-12 h-12 bg-background rounded-lg border flex items-center justify-center overflow-hidden flex-shrink-0">
                      {area.image_url ? (
                        <img src={area.image_url} alt={area.title} className="w-full h-full object-cover" />
                      ) : (
                        <Stethoscope className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{area.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{area.short_title}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${area.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {area.is_active ? 'نشط' : 'غير نشط'}
                      </span>
                      {expandedId === area.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="p-4 border-t bg-background space-y-4">
                    {/* Image Upload */}
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-muted rounded-lg border flex items-center justify-center overflow-hidden">
                        {area.image_url ? (
                          <img src={area.image_url} alt={area.title} className="w-full h-full object-cover" />
                        ) : (
                          <Stethoscope className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(area.id, e)}
                          disabled={uploadingId === area.id}
                        />
                        <Button variant="outline" asChild disabled={uploadingId === area.id}>
                          <span>
                            {uploadingId === area.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                            ) : (
                              <Upload className="h-4 w-4 mr-2" />
                            )}
                            رفع صورة
                          </span>
                        </Button>
                      </label>
                    </div>

                    {/* Edit Fields */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">العنوان الكامل</label>
                        <Input
                          defaultValue={area.title}
                          onBlur={(e) => handleSave(area.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">العنوان المختصر</label>
                        <Input
                          defaultValue={area.short_title}
                          onBlur={(e) => handleSave(area.id, { short_title: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">الحالات المرضية (مفصولة بـ |)</label>
                      <Textarea
                        defaultValue={area.conditions}
                        onBlur={(e) => handleSave(area.id, { conditions: e.target.value })}
                        rows={3}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">نشط</span>
                        <Switch
                          checked={area.is_active}
                          onCheckedChange={(checked) => handleToggleActive(area.id, checked)}
                        />
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4 mr-1" />
                            حذف
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                            <AlertDialogDescription>
                              سيتم حذف المجال العلاجي "{area.title}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(area.id)}>
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}

          {areas.length === 0 && (
            <p className="text-center text-muted-foreground py-8 bg-muted/30 rounded-lg">
              لا توجد مجالات علاجية. أضف مجالاً جديداً للبدء.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapeuticAreasManager;