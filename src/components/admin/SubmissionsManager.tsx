import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  User,
  Briefcase,
  MessageSquare,
  Search,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Filter,
  RefreshCw,
} from "lucide-react";

type ContactSubmission = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

type JobApplication = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience: string | null;
  message: string | null;
  cv_url: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const statusConfig = {
  new: { label: "جديد", color: "bg-blue-500", icon: Clock },
  contacted: { label: "تم التواصل", color: "bg-green-500", icon: CheckCircle },
  in_progress: { label: "قيد المراجعة", color: "bg-yellow-500", icon: AlertCircle },
  not_interested: { label: "غير مهم", color: "bg-gray-500", icon: XCircle },
  rejected: { label: "مرفوض", color: "bg-red-500", icon: XCircle },
  hired: { label: "تم التوظيف", color: "bg-emerald-500", icon: CheckCircle },
};

const SubmissionsManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contact");
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<ContactSubmission | JobApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const [contactRes, jobRes] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("job_applications").select("*").order("created_at", { ascending: false }),
      ]);

      if (contactRes.error) throw contactRes.error;
      if (jobRes.error) throw jobRes.error;

      setContactSubmissions(contactRes.data || []);
      setJobApplications(jobRes.data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast({
        title: "خطأ",
        description: "فشل في جلب البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id: string, type: "contact" | "job", newStatus: string, notes: string) => {
    try {
      const table = type === "contact" ? "contact_submissions" : "job_applications";
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus, notes })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "تم التحديث بنجاح" });
      fetchSubmissions();
      setIsDetailOpen(false);
    } catch (error) {
      console.error("Error updating:", error);
      toast({
        title: "خطأ",
        description: "فشل في التحديث",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, type: "contact" | "job") => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;

    try {
      const table = type === "contact" ? "contact_submissions" : "job_applications";
      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error) throw error;

      toast({ title: "تم الحذف بنجاح" });
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "خطأ",
        description: "فشل في الحذف",
        variant: "destructive",
      });
    }
  };

  const openDetail = (item: ContactSubmission | JobApplication) => {
    setSelectedItem(item);
    setEditNotes(item.notes || "");
    setEditStatus(item.status);
    setIsDetailOpen(true);
  };

  const filterItems = <T extends { full_name: string; email: string; status: string }>(items: T[]): T[] => {
    return items.filter((item) => {
      const matchesSearch =
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-JO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredContacts = filterItems(contactSubmissions);
  const filteredApplications = filterItems(jobApplications);

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            إدارة الطلبات والرسائل
          </CardTitle>
          <Button onClick={fetchSubmissions} variant="outline" size="sm" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            تحديث
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث بالاسم أو البريد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="all">جميع الحالات</SelectItem>
                {Object.entries(statusConfig).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="h-4 w-4" />
              رسائل التواصل ({filteredContacts.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="h-4 w-4" />
              طلبات التوظيف ({filteredApplications.length})
            </TabsTrigger>
          </TabsList>

          {/* Contact Submissions Tab */}
          <TabsContent value="contact">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد رسائل</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.full_name}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(submission.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDetail(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(submission.id, "contact")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {/* Job Applications Tab */}
          <TabsContent value="jobs">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد طلبات توظيف</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الاسم</TableHead>
                      <TableHead>الوظيفة</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.full_name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{application.position}</Badge>
                        </TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(application.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDetail(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(application.id, "job")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {activeTab === "contact" ? (
                  <>
                    <Mail className="h-5 w-5 text-primary" />
                    تفاصيل الرسالة
                  </>
                ) : (
                  <>
                    <Briefcase className="h-5 w-5 text-primary" />
                    تفاصيل طلب التوظيف
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedItem && (
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">الاسم</p>
                      <p className="font-medium">{selectedItem.full_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                      <a href={`mailto:${selectedItem.email}`} className="font-medium text-primary hover:underline">
                        {selectedItem.email}
                      </a>
                    </div>
                  </div>
                  {selectedItem.phone && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">الهاتف</p>
                        <a href={`tel:${selectedItem.phone}`} className="font-medium text-primary hover:underline">
                          {selectedItem.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {"position" in selectedItem && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">الوظيفة</p>
                        <p className="font-medium">{selectedItem.position}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message / Experience */}
                {"message" in selectedItem && selectedItem.message && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">الرسالة</p>
                    <p className="whitespace-pre-wrap">{selectedItem.message}</p>
                  </div>
                )}

                {"experience" in selectedItem && selectedItem.experience && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">الخبرة</p>
                    <p className="whitespace-pre-wrap">{selectedItem.experience}</p>
                  </div>
                )}

                {/* Status Update */}
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">تحديث الحالة</label>
                    <Select value={editStatus} onValueChange={setEditStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border z-50">
                        {Object.entries(statusConfig).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">ملاحظات داخلية</label>
                    <Textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="أضف ملاحظات خاصة بهذا الطلب..."
                      rows={3}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    إلغاء
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedItem.id,
                        activeTab === "contact" ? "contact" : "job",
                        editStatus,
                        editNotes
                      )
                    }
                  >
                    حفظ التغييرات
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SubmissionsManager;
