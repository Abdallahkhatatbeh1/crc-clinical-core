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
  Building2,
  Calendar,
  FileText,
  ExternalLink,
  UserCheck,
  Send,
} from "lucide-react";

type ContactSubmission = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
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
  new: { label: "New", color: "bg-blue-500", icon: Clock },
  contacted: { label: "Contacted", color: "bg-green-500", icon: CheckCircle },
  in_progress: { label: "In Progress", color: "bg-yellow-500", icon: AlertCircle },
  not_interested: { label: "Not Interested", color: "bg-gray-500", icon: XCircle },
  rejected: { label: "Rejected", color: "bg-red-500", icon: XCircle },
  hired: { label: "Hired", color: "bg-emerald-500", icon: UserCheck },
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
        title: "Error",
        description: "Failed to fetch submissions",
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

      toast({ title: "Updated successfully" });
      fetchSubmissions();
      setIsDetailOpen(false);
    } catch (error) {
      console.error("Error updating:", error);
      toast({
        title: "Error",
        description: "Failed to update",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, type: "contact" | "job") => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const table = type === "contact" ? "contact_submissions" : "job_applications";
      const { error } = await supabase.from(table).delete().eq("id", id);

      if (error) throw error;

      toast({ title: "Deleted successfully" });
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete",
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
    return new Date(dateString).toLocaleDateString("en-US", {
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

  const newContactsCount = contactSubmissions.filter(c => c.status === 'new').length;
  const newJobsCount = jobApplications.filter(j => j.status === 'new').length;

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Submissions Management
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage contact messages and job applications
            </p>
          </div>
          <Button onClick={fetchSubmissions} variant="outline" size="sm" className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">Total Messages</span>
            </div>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{contactSubmissions.length}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-medium">Job Applications</span>
            </div>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{jobApplications.length}</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">New Messages</span>
            </div>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300 mt-1">{newContactsCount}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm font-medium">New Applications</span>
            </div>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">{newJobsCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-background border z-50">
                <SelectItem value="all">All Statuses</SelectItem>
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
          <TabsList className="mb-6 bg-muted/50">
            <TabsTrigger value="contact" className="gap-2 data-[state=active]:bg-background">
              <Mail className="h-4 w-4" />
              Contact Messages ({filteredContacts.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2 data-[state=active]:bg-background">
              <Briefcase className="h-4 w-4" />
              Job Applications ({filteredApplications.length})
            </TabsTrigger>
          </TabsList>

          {/* Contact Submissions Tab */}
          <TabsContent value="contact">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Loading...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No messages found</p>
                <p className="text-sm">Messages will appear here when received</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredContacts.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-background border rounded-xl p-5 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{submission.full_name}</h4>
                              <a href={`mailto:${submission.email}`} className="text-sm text-primary hover:underline">
                                {submission.email}
                              </a>
                            </div>
                          </div>
                          {getStatusBadge(submission.status)}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {submission.company && (
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4" />
                              {submission.company}
                            </span>
                          )}
                          {submission.phone && (
                            <a href={`tel:${submission.phone}`} className="flex items-center gap-1 hover:text-primary">
                              <Phone className="h-4 w-4" />
                              {submission.phone}
                            </a>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(submission.created_at)}
                          </span>
                        </div>

                        {submission.subject && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {submission.subject}
                            </Badge>
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {submission.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 md:flex-col">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDetail(submission)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(submission.id, "contact")}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Job Applications Tab */}
          <TabsContent value="jobs">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-2">Loading...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No applications found</p>
                <p className="text-sm">Job applications will appear here when received</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    className="bg-background border rounded-xl p-5 hover:shadow-md transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{application.full_name}</h4>
                              <a href={`mailto:${application.email}`} className="text-sm text-primary hover:underline">
                                {application.email}
                              </a>
                            </div>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 font-medium text-foreground">
                            <Briefcase className="h-4 w-4 text-primary" />
                            {application.position}
                          </span>
                          <a href={`tel:${application.phone}`} className="flex items-center gap-1 hover:text-primary">
                            <Phone className="h-4 w-4" />
                            {application.phone}
                          </a>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(application.created_at)}
                          </span>
                        </div>

                        {application.experience && (
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {application.experience} experience
                            </Badge>
                          </div>
                        )}

                        {application.cv_url && (
                          <a
                            href={application.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <FileText className="h-4 w-4" />
                            View CV/Resume
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}

                        {application.message && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {application.message}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 md:flex-col">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDetail(application)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(application.id, "job")}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
                    Message Details
                  </>
                ) : (
                  <>
                    <Briefcase className="h-5 w-5 text-primary" />
                    Application Details
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedItem && (
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="font-medium">{selectedItem.full_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${selectedItem.email}`} className="font-medium text-primary hover:underline">
                        {selectedItem.email}
                      </a>
                    </div>
                  </div>
                  {selectedItem.phone && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <a href={`tel:${selectedItem.phone}`} className="font-medium text-primary hover:underline">
                          {selectedItem.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {"company" in selectedItem && selectedItem.company && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="font-medium">{selectedItem.company}</p>
                      </div>
                    </div>
                  )}
                  {"position" in selectedItem && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Position</p>
                        <p className="font-medium">{selectedItem.position}</p>
                      </div>
                    </div>
                  )}
                  {"experience" in selectedItem && selectedItem.experience && (
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="font-medium">{selectedItem.experience}</p>
                      </div>
                    </div>
                  )}
                </div>

                {"subject" in selectedItem && selectedItem.subject && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Subject</p>
                    <p className="font-medium text-primary">{selectedItem.subject}</p>
                  </div>
                )}

                {/* Message */}
                {"message" in selectedItem && selectedItem.message && (
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">Message</p>
                    <p className="whitespace-pre-wrap">{selectedItem.message}</p>
                  </div>
                )}

                {/* CV Link for job applications */}
                {"cv_url" in selectedItem && selectedItem.cv_url && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <p className="text-sm text-muted-foreground mb-2">CV / Resume</p>
                    <a
                      href={selectedItem.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-medium"
                    >
                      <FileText className="h-5 w-5" />
                      Download CV
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}

                {/* Submission Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Submitted on {formatDate(selectedItem.created_at)}
                </div>

                {/* Status Update */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Update Status</h4>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
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

                {/* Notes */}
                <div>
                  <h4 className="font-semibold mb-4">Internal Notes</h4>
                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add private notes about this submission..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    Cancel
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
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Save Changes
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
