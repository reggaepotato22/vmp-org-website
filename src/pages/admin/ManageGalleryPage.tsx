import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useGallery, GalleryItem } from "@/context/GalleryContext";
import { useMissions } from "@/context/MissionContext";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

const ManageGalleryPage = () => {
  const { gallery, addPhoto, deletePhoto } = useGallery();
  const { missions } = useMissions();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    category: "Missions",
    date: new Date().toISOString().split("T")[0],
    type: 'internal',
    internalImages: []
  });

  const handleAddItem = () => {
    if (newItem.title && newItem.coverImage) {
      addPhoto({
        title: newItem.title,
        coverImage: newItem.coverImage,
        type: newItem.type as 'internal' | 'external',
        category: newItem.category || "General",
        description: newItem.description,
        missionId: newItem.missionId,
        date: newItem.date || new Date().toISOString().split("T")[0],
        externalLink: newItem.externalLink,
        internalImages: newItem.internalImages || [],
      });
      setIsAddDialogOpen(false);
      // Reset form
      setNewItem({ 
        category: "Missions", 
        date: new Date().toISOString().split("T")[0],
        type: 'internal',
        internalImages: []
      });
    }
  };

  const handleDelete = (id: string | number) => {
    deletePhoto(id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Gallery</h1>
          <p className="text-slate-500 dark:text-slate-400">Upload and manage photos from missions and events.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Gallery
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle>Add New Gallery</DialogTitle>
              <DialogDescription>
                Create a new photo gallery or link to an external album.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              
              {/* Basic Info */}
              <div className="grid gap-2">
                <Label htmlFor="title">Gallery Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Turkana Mission Highlights"
                  value={newItem.title || ""}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>

              {/* Cover Image */}
              <div className="grid gap-2">
                <ImageUpload 
                  label="Cover Image (Thumbnail)"
                  value={newItem.coverImage}
                  onChange={(url) => setNewItem({ ...newItem, coverImage: url as string })}
                  folder="gallery_covers"
                />
              </div>

              {/* Type Selection */}
              <div className="grid gap-3">
                <Label>Gallery Type</Label>
                <RadioGroup 
                  value={newItem.type} 
                  onValueChange={(val) => setNewItem({ ...newItem, type: val as 'internal' | 'external' })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="internal" id="internal" />
                    <Label htmlFor="internal">Internal Upload</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="external" id="external" />
                    <Label htmlFor="external">External Link</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Logic */}
              {newItem.type === 'external' ? (
                <div className="grid gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Label htmlFor="externalLink">External Album URL</Label>
                  <Input
                    id="externalLink"
                    placeholder="https://photos.google.com/share/..."
                    value={newItem.externalLink || ""}
                    onChange={(e) => setNewItem({ ...newItem, externalLink: e.target.value })}
                  />
                  <p className="text-xs text-slate-500">
                    Users will be redirected to this link when they click on the gallery.
                  </p>
                </div>
              ) : (
                <div className="grid gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <ImageUpload 
                    label="Upload Gallery Images"
                    multiple={true}
                    value={newItem.internalImages}
                    onChange={(urls) => setNewItem({ ...newItem, internalImages: urls as string[] })}
                    folder="gallery_items"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description..."
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Missions">Missions</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Volunteers">Volunteers</SelectItem>
                      <SelectItem value="Animals">Animals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newItem.date || ""}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mission">Link to Mission (Optional)</Label>
                <Select
                  value={newItem.missionId || "none"}
                  onValueChange={(value) => setNewItem({ ...newItem, missionId: value === "none" ? undefined : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mission..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {missions.map((mission) => (
                      <SelectItem key={mission.id} value={mission.id}>
                        {mission.title} ({mission.year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Save Gallery</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={item.coverImage}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <DeleteConfirmationModal 
                  onConfirm={() => handleDelete(item.id)}
                  title="Delete Gallery?"
                  description="This will permanently delete this gallery and its configuration."
                />
                
                {item.type === 'external' && item.externalLink && (
                  <Button variant="secondary" size="icon" asChild>
                    <a href={item.externalLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
              
              {/* Type Badge */}
              <div className="absolute top-2 right-2">
                <Badge variant={item.type === 'external' ? "secondary" : "default"} className="opacity-90">
                  {item.type === 'external' ? "External Link" : "Internal Gallery"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="font-normal text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                  {item.category}
                </Badge>
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.date}</span>
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{item.description}</p>
              )}
              {item.type === 'internal' && item.internalImages && (
                 <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <ImageIcon className="h-3 w-3" />
                    {item.internalImages.length} photos
                 </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageGalleryPage;
