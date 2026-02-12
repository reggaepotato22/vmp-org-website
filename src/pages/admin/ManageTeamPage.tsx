import { useState, useEffect } from "react";
import { teamService } from "@/services/teamService";
import { TeamMember } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2, Linkedin, Twitter, Mail, Users } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/services/storageService";
import EmptyState from "@/components/admin/EmptyState";

const ManageTeamPage = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    social_links: { linkedin: "", twitter: "", email: "" }
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await teamService.getAll();
      setMembers(data || []);
    } catch (error) {
      console.error("Failed to fetch team members", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'team');
      if (url) {
        setFormData(prev => ({ ...prev, image_url: url }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem && editingItem.id) {
        await teamService.update(editingItem.id, formData);
        toast.success("Team member updated successfully");
      } else {
        await teamService.create(formData as Omit<TeamMember, 'id' | 'created_at'>);
        toast.success("Team member added successfully");
      }
      setIsDialogOpen(false);
      fetchMembers();
      resetForm();
    } catch (error) {
      toast.error("Failed to save team member");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await teamService.delete(id);
      toast.success("Team member deleted successfully");
      fetchMembers();
    } catch (error) {
      toast.error("Failed to delete team member");
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      bio: "",
      image_url: "",
      social_links: { linkedin: "", twitter: "", email: "" }
    });
  };

  const openEditDialog = (item: TeamMember) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      bio: item.bio,
      image_url: item.image_url || "",
      social_links: {
        linkedin: item.social_links?.linkedin || "",
        twitter: item.social_links?.twitter || "",
        email: item.social_links?.email || ""
      }
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Team</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all">
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-black">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-black">Role</label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold text-black">Profile Image</label>
                <div className="space-y-3">
                  <Input 
                    value={formData.image_url} 
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..." 
                  />
                  <p className="text-xs text-muted-foreground">Paste an image URL (recommended) or upload below.</p>
                  
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                  </div>
                </div>
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-32 w-32 object-cover rounded-md border-2 border-slate-200" />
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-black">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Social Links (Optional)</label>
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="LinkedIn URL" 
                            value={formData.social_links?.linkedin || ""}
                            onChange={(e) => setFormData({ ...formData, social_links: { ...formData.social_links, linkedin: e.target.value } })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Twitter URL" 
                            value={formData.social_links?.twitter || ""}
                            onChange={(e) => setFormData({ ...formData, social_links: { ...formData.social_links, twitter: e.target.value } })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Email Address" 
                            value={formData.social_links?.email || ""}
                            onChange={(e) => setFormData({ ...formData, social_links: { ...formData.social_links, email: e.target.value } })}
                        />
                    </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading || uploading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : members.length === 0 ? (
        <EmptyState 
          icon={Users} 
          title="Team list is empty" 
          description="Add your veterinary professionals and staff members."
          actionLabel="Add Member"
          onAction={() => setIsDialogOpen(true)}
        />
      ) : (
        <div className="rounded-md border bg-white dark:bg-slate-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-slate-100">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-700 font-bold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-slate-900 dark:text-slate-100">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">{member.role}</TableCell>
                  <TableCell className="max-w-xs truncate text-slate-500 dark:text-slate-400">{member.bio}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(member)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(member.id)}>
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
    </div>
  );
};

export default ManageTeamPage;
