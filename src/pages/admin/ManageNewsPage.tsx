import { useState, useEffect } from "react";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types";
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
import { Plus, Pencil, Trash2, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/services/storageService";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmptyState from "@/components/admin/EmptyState";

const ManageNewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "news" as "news" | "event",
    date: new Date().toISOString().split("T")[0],
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await newsService.getAll();
      setNews(data);
    } catch (error) {
      console.error("Failed to fetch news", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'news');
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
      if (editingItem) {
        await newsService.update(editingItem.id, formData);
        toast.success("News updated successfully");
      } else {
        await newsService.create(formData);
        toast.success("News created successfully");
      }
      setIsDialogOpen(false);
      fetchNews();
      resetForm();
    } catch (error) {
      toast.error("Failed to save news");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await newsService.delete(id);
      toast.success("News deleted successfully");
      fetchNews();
    } catch (error) {
      toast.error("Failed to delete news");
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      category: "news",
      date: new Date().toISOString().split("T")[0],
      image_url: "",
    });
  };

  const openEditDialog = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      date: item.date,
      image_url: item.image_url || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage News & Events</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit News" : "Create News"}</DialogTitle>
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
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "news" | "event" })}
                  >
                    <option value="news">News</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Image</label>
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
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-40 w-full object-cover rounded-lg border border-slate-200" />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <div className="h-64 mb-12">
                  <ReactQuill 
                    theme="snow" 
                    value={formData.content} 
                    onChange={(content) => setFormData({...formData, content})}
                    className="h-48"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading || uploading}>
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
      ) : news.length === 0 ? (
        <EmptyState 
          icon={FileText} 
          title="No news articles yet" 
          description="Create your first news article or event to keep your audience updated."
          actionLabel="Add News"
          onAction={() => setIsDialogOpen(true)}
        />
      ) : (
        <div className="rounded-md border bg-white dark:bg-slate-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">{item.title}</TableCell>
                  <TableCell className="capitalize text-slate-600 dark:text-slate-300">{item.category}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">{item.date}</TableCell>
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

export default ManageNewsPage;
