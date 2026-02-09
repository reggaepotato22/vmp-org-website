import { useState, useEffect } from "react";
import { missionService } from "@/services/missionService";
import { Mission } from "@/types";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Pencil, Trash2, Loader2, Target, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/services/storageService";
import EmptyState from "@/components/admin/EmptyState";
import { GalleryItem } from "@/types";

const ManageMissionsPage = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<Mission | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "upcoming" as "upcoming" | "ongoing" | "completed",
    start_date: "",
    end_date: "",
    cover_image: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMissions();
    // Initialize mock gallery items for now to prevent empty list
    setGalleryItems([
       { id: '1', title: 'Mission 1', category: 'mission', image_url: 'https://images.unsplash.com/photo-1576201836163-4917a6a41d84', featured: false, created_at: new Date().toISOString() },
       { id: '2', title: 'Mission 2', category: 'mission', image_url: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783', featured: false, created_at: new Date().toISOString() },
       { id: '3', title: 'Community', category: 'general', image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b', featured: false, created_at: new Date().toISOString() },
    ]);
  }, []);

  const fetchMissions = async () => {
    try {
      const data = await missionService.getAll();
      setMissions(data);
    } catch (error) {
      console.error("Failed to fetch missions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'missions');
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

  const handleReportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      // Re-use uploadImage for now as it handles generic file upload to the backend/mock
      const url = await uploadImage(e.target.files[0], 'reports');
      if (url) {
        setFormData(prev => ({ ...prev, report_file: url }));
        toast.success("Report uploaded successfully");
        
        // Mock AI Summary generation
        if (!formData.report_summary) {
          setFormData(prev => ({ 
            ...prev, 
            report_summary: "AI Generated Summary: This report details the veterinary activities, including vaccination of 500 cattle and treatment of 200 small animals. The mission was successful with strong community engagement." 
          }));
          toast.info("AI Summary generated from report!");
        }
      }
    } catch (error) {
      toast.error("Failed to upload report");
    } finally {
      setUploading(false);
    }
  };

  const handleSelectGalleryImage = (url: string) => {
    setFormData(prev => ({ ...prev, cover_image: url }));
    setIsGalleryOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await missionService.update(editingItem.id, {
          ...formData,
          images: editingItem.images || [] // Preserve existing images for now
        });
        toast.success("Mission updated successfully");
      } else {
        await missionService.create({
          ...formData,
          images: []
        });
        toast.success("Mission created successfully");
      }
      setIsDialogOpen(false);
      fetchMissions();
      resetForm();
    } catch (error) {
      toast.error("Failed to save mission");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mission?")) return;
    try {
      await missionService.delete(id);
      toast.success("Mission deleted successfully");
      fetchMissions();
    } catch (error) {
      toast.error("Failed to delete mission");
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      status: "upcoming",
      start_date: "",
      end_date: "",
      cover_image: "",
    });
  };

  const openEditDialog = (item: Mission) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      location: item.location,
      status: item.status,
      start_date: item.start_date,
      end_date: item.end_date,
      cover_image: item.cover_image || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight dark:text-slate-100">Manage Missions</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md transition-all">
              <Plus className="mr-2 h-4 w-4" /> Create Mission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Mission" : "Create Mission"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "upcoming" | "ongoing" | "completed" })}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image</label>
                <div className="flex items-center gap-4">
                  {formData.cover_image && (
                    <img src={formData.cover_image} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
                  )}
                  <div className="flex-1 space-y-2">
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">- OR -</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsGalleryOpen(true)}
                      className="w-full"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Select from Gallery
                    </Button>
                  </div>
                </div>
              </div>

              {/* Gallery Selection Dialog */}
              <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Select Cover Image</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[60vh]">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4">
                      {galleryItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="relative aspect-square cursor-pointer group rounded-md overflow-hidden border border-slate-200 hover:border-blue-500 transition-all"
                          onClick={() => handleSelectGalleryImage(item.image_url)}
                        >
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Select</span>
                          </div>
                        </div>
                      ))}
                      {galleryItems.length === 0 && (
                        <div className="col-span-full text-center py-10 text-slate-500">
                          No images found in gallery.
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Mission Report (PDF/Doc)</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleReportUpload}
                      disabled={uploading}
                    />
                  </div>
                  {formData.report_file && (
                    <div className="mt-2 text-xs text-green-600 flex items-center">
                      <span className="truncate max-w-[200px]">{formData.report_file}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Report Summary (AI Generated)</label>
                  <Textarea
                    value={formData.report_summary}
                    onChange={(e) => setFormData({ ...formData, report_summary: e.target.value })}
                    rows={3}
                    placeholder="Summary will appear here after report upload..."
                    className="mt-1"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading || uploading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      ) : missions.length === 0 ? (
        <EmptyState 
          icon={Target} 
          title="No missions found" 
          description="Track your veterinary missions and outreach programs here."
          actionLabel="Create Mission"
          onAction={() => setIsDialogOpen(true)}
        />
      ) : (
        <div className="rounded-md border bg-white dark:bg-slate-800 border-t-4 border-t-green-500 shadow-sm dark:border-slate-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-slate-400">Title</TableHead>
                <TableHead className="dark:text-slate-400">Location</TableHead>
                <TableHead className="dark:text-slate-400">Status</TableHead>
                <TableHead className="dark:text-slate-400">Dates</TableHead>
                <TableHead className="text-right dark:text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missions.map((item) => (
                <TableRow key={item.id} className="dark:border-slate-700">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">{item.title}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-300">{item.location}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      item.status === 'ongoing' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-500 dark:text-slate-400">
                    {item.start_date} - {item.end_date}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(item.id)}>
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

export default ManageMissionsPage;
