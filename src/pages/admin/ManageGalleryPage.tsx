import { useState, useEffect } from "react";
import { galleryService } from "@/services/galleryService";
import { missionService } from "@/services/missionService";
import { GalleryItem, Mission } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Trash2, Loader2, Copy, Star, Edit, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { uploadImage, deleteImage } from "@/services/storageService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ManageGalleryPage = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    image_url: string;
    featured: boolean;
    mission_id?: string;
  }>({
    title: "",
    category: "general",
    image_url: "",
    featured: false,
    mission_id: undefined,
  });

  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        category: editingItem.category,
        image_url: editingItem.image_url,
        featured: editingItem.featured || false,
        mission_id: editingItem.mission_id,
      });
      setIsDialogOpen(true);
    }
  }, [editingItem]);

  const fetchData = async () => {
    try {
      const [galleryData, missionsData] = await Promise.all([
        galleryService.getAll(),
        missionService.getAll()
      ]);
      setItems(galleryData);
      setMissions(missionsData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'gallery');
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
    if (!formData.image_url) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    try {
      if (editingItem) {
        await galleryService.update(editingItem.id, {
          title: formData.title,
          category: formData.category,
          featured: formData.featured,
          mission_id: formData.mission_id
        });
        toast.success("Image updated successfully");
      } else {
        await galleryService.create({
          ...formData,
          mission_id: formData.mission_id === "none" ? undefined : formData.mission_id
        });
        toast.success("Image added successfully");
      }
      setIsDialogOpen(false);
      fetchData();
      setFormData({
        title: "",
        category: "general",
        image_url: "",
        featured: false,
        mission_id: "none",
      });
      setEditingItem(null);
    } catch (error) {
      toast.error("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  const handleSetMissionCover = async (item: GalleryItem) => {
    if (!item.mission_id) return;
    try {
      await missionService.update(item.mission_id, { cover_image: item.image_url });
      toast.success("Mission cover image updated");
    } catch (error) {
      toast.error("Failed to update mission cover");
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      // Try to delete from storage first
      await deleteImage(item.image_url);
      // Then delete from DB
      await galleryService.delete(item.id);
      
      toast.success("Image deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const toggleFeatured = async (item: GalleryItem) => {
    try {
      await galleryService.update(item.id, { featured: !item.featured });
      toast.success(item.featured ? "Removed from featured" : "Set as featured");
      fetchData();
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage Gallery</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title (Optional)</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Mission Team 2024"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. missions, events"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Link to Mission (Optional)</label>
                  <Select 
                    value={formData.mission_id || "none"} 
                    onValueChange={(val) => setFormData({ ...formData, mission_id: val === "none" ? undefined : val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {missions.map(mission => (
                        <SelectItem key={mission.id} value={mission.id}>
                          {mission.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set as Cover/Featured Image
                </label>
              </div>

              <div>
                <label className="text-sm font-medium">Image File</label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {formData.image_url && (
                  <div className="mt-2 relative">
                    <img src={formData.image_url} alt="Preview" className="h-40 w-full object-cover rounded" />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Link to Mission (Optional)</label>
                  <Select
                    value={formData.mission_id}
                    onValueChange={(value) => setFormData({ ...formData, mission_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {missions.map((mission) => (
                        <SelectItem key={mission.id} value={mission.id}>
                          {mission.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading || uploading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden group relative">
              <div className="aspect-square relative">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.featured && (
                  <Badge className="absolute top-2 left-2 z-10 bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                )}
                {item.mission_id && (
                  <Badge variant="outline" className="absolute top-2 right-2 z-10 bg-white/90 text-slate-900 border-none shadow-sm">Linked</Badge>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap items-center justify-center gap-2 p-4">
                  <Button variant="secondary" size="icon" onClick={() => copyUrl(item.image_url)} title="Copy Link">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={() => setEditingItem(item)} title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={item.featured ? "default" : "secondary"} 
                    size="icon" 
                    onClick={() => toggleFeatured(item)}
                    title={item.featured ? "Unfeature" : "Feature"}
                    className={item.featured ? "bg-yellow-400 hover:bg-yellow-500 text-slate-900" : ""}
                  >
                    <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
                  </Button>
                  {item.mission_id && (
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => handleSetMissionCover(item)}
                      title="Set as Mission Cover"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(item)} title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-2">
                <p className="font-medium text-sm truncate">{item.title || "Untitled"}</p>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="capitalize">{item.category}</span>
                  {item.mission_id && <span>Linked to Mission</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageGalleryPage;
