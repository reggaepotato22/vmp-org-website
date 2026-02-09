import { useState, useEffect } from "react";
import { projectService } from "@/services/projectService";
import { Project } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, Loader2, FolderKanban } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/services/storageService";
import EmptyState from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";

const ManageProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    slug: "",
    description: "",
    status: "active",
    cover_image: "",
    start_date: "",
    end_date: "",
    featured: false,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'projects');
      if (url) {
        setFormData(prev => ({ ...prev, cover_image: url }));
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
        await projectService.update(editingItem.id, formData);
        toast.success("Project updated successfully");
      } else {
        await projectService.create(formData as Omit<Project, 'id' | 'created_at'>);
        toast.success("Project created successfully");
      }
      setIsDialogOpen(false);
      fetchProjects();
      resetForm();
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectService.delete(id);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      status: "active",
      cover_image: "",
      start_date: "",
      end_date: "",
      featured: false,
    });
  };

  const openEditDialog = (item: Project) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      status: item.status,
      cover_image: item.cover_image || "",
      start_date: item.start_date || "",
      end_date: item.end_date || "",
      featured: item.featured || false,
    });
    setIsDialogOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Projects</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Project" : "Add Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData({ 
                        ...formData, 
                        title,
                        slug: !editingItem ? generateSlug(title) : formData.slug
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="featured" 
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Featured Project
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={formData.start_date?.split('T')[0] || ''}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={formData.end_date?.split('T')[0] || ''}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="space-y-3">
                  <Input 
                    value={formData.cover_image} 
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://..." 
                  />
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
                {formData.cover_image && (
                  <img src={formData.cover_image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded-md border-2 border-slate-200" />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || uploading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingItem ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <EmptyState 
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to showcase your work."
          actionLabel="Add Project"
          onAction={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
        />
      ) : (
        <div className="rounded-md border bg-white dark:bg-slate-800 dark:border-slate-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-slate-400">Title</TableHead>
                <TableHead className="dark:text-slate-400">Status</TableHead>
                <TableHead className="dark:text-slate-400">Dates</TableHead>
                <TableHead className="dark:text-slate-400">Featured</TableHead>
                <TableHead className="text-right dark:text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="dark:border-slate-700">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">{project.title}</TableCell>
                  <TableCell>
                    <Badge variant={
                      project.status === 'active' ? 'default' : 
                      project.status === 'completed' ? 'secondary' : 'outline'
                    } className={project.status === 'outline' ? 'dark:text-slate-300' : ''}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="dark:text-slate-300">
                    {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBD'}
                    {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString()}`}
                  </TableCell>
                  <TableCell>
                    {project.featured ? <Badge variant="outline" className="dark:text-slate-300">Featured</Badge> : '-'}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default ManageProjectsPage;
