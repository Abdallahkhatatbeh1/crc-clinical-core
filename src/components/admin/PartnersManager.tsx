import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Building2, Save, ExternalLink, Upload } from "lucide-react";
import { useAllPartners, Partner } from "@/hooks/usePartners";
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

const PartnersManager = () => {
  const { partners, isLoading, addPartner, updatePartner, deletePartner } = useAllPartners();
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<'cro' | 'pharma'>('cro');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!newName.trim()) return;

    const maxOrder = partners.length > 0 
      ? Math.max(...partners.map(p => p.display_order)) 
      : 0;

    const { error } = await addPartner({
      name: newName.trim(),
      category: newCategory,
      display_order: maxOrder + 1,
      is_active: true,
      logo_url: null,
      website_url: null,
    });

    if (error) {
      toast({ title: "خطأ في إضافة الشريك", variant: "destructive" });
    } else {
      toast({ title: "تمت إضافة الشريك بنجاح" });
      setNewName("");
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    setSavingId(id);
    const { error } = await updatePartner(id, { is_active: isActive });
    if (error) {
      toast({ title: "خطأ في تحديث الحالة", variant: "destructive" });
    }
    setSavingId(null);
  };

  const handleUpdateField = async (id: string, field: keyof Partner, value: string) => {
    setSavingId(id);
    const { error } = await updatePartner(id, { [field]: value });
    if (error) {
      toast({ title: "خطأ في تحديث البيانات", variant: "destructive" });
    } else {
      toast({ title: "تم حفظ التغييرات" });
    }
    setSavingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await deletePartner(id);
    if (error) {
      toast({ title: "خطأ في حذف الشريك", variant: "destructive" });
    } else {
      toast({ title: "تم حذف الشريك" });
    }
  };

  const handleLogoUpload = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingId(id);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image_type', 'partner');

      const { data, error } = await supabase.functions.invoke('upload-image', {
        body: formData,
      });

      if (error) throw error;

      await updatePartner(id, { logo_url: data.url });
      toast({ title: "تم رفع الشعار بنجاح" });
    } catch (error) {
      toast({ title: "خطأ في رفع الشعار", variant: "destructive" });
    }
    setUploadingId(null);
  };

  const croPartners = partners.filter(p => p.category === 'cro');
  const pharmaPartners = partners.filter(p => p.category === 'pharma');

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  const renderPartnersList = (partnersList: Partner[], title: string) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      {partnersList.map((partner) => (
        <div
          key={partner.id}
          className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border"
        >
          {/* Logo */}
          <div className="w-16 h-16 bg-background rounded-lg border flex items-center justify-center overflow-hidden">
            {partner.logo_url ? (
              <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-contain p-1" />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground" />
            )}
          </div>

          {/* Upload Logo */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleLogoUpload(partner.id, e)}
              disabled={uploadingId === partner.id}
            />
            <Button size="sm" variant="outline" asChild disabled={uploadingId === partner.id}>
              <span>
                {uploadingId === partner.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                ) : (
                  <Upload className="h-4 w-4" />
                )}
              </span>
            </Button>
          </label>

          {/* Name */}
          <Input
            value={partner.name}
            onChange={(e) => {
              const updated = partners.map(p => p.id === partner.id ? { ...p, name: e.target.value } : p);
            }}
            onBlur={(e) => handleUpdateField(partner.id, 'name', e.target.value)}
            className="flex-1 bg-background"
            placeholder="اسم الشريك"
          />

          {/* Website URL */}
          <Input
            value={partner.website_url || ''}
            onChange={(e) => {
              // Local state update handled by blur
            }}
            onBlur={(e) => handleUpdateField(partner.id, 'website_url', e.target.value)}
            className="w-48 bg-background"
            placeholder="رابط الموقع"
          />

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">نشط</span>
            <Switch
              checked={partner.is_active}
              onCheckedChange={(checked) => handleToggleActive(partner.id, checked)}
            />
          </div>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                <AlertDialogDescription>
                  سيتم حذف الشريك "{partner.name}" نهائياً. هذا الإجراء لا يمكن التراجع عنه.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(partner.id)}>
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
      {partnersList.length === 0 && (
        <p className="text-center text-muted-foreground py-4 bg-muted/30 rounded-lg">
          لا يوجد شركاء في هذه الفئة
        </p>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          إدارة الشركاء
        </CardTitle>
        <CardDescription>
          أضف وعدّل واحذف شركاء CRO والشركات الدوائية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new partner */}
        <div className="flex gap-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <Input
            placeholder="اسم الشريك الجديد..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1"
          />
          <Select value={newCategory} onValueChange={(v: 'cro' | 'pharma') => setNewCategory(v)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cro">CRO Partner</SelectItem>
              <SelectItem value="pharma">Pharma Partner</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} disabled={!newName.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            إضافة
          </Button>
        </div>

        {/* CRO Partners */}
        {renderPartnersList(croPartners, "شركاء CRO")}

        {/* Pharma Partners */}
        {renderPartnersList(pharmaPartners, "الشركات الدوائية")}
      </CardContent>
    </Card>
  );
};

export default PartnersManager;