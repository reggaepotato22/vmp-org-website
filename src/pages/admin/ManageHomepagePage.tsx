import { useState, useEffect } from "react";
import { homepageService } from "@/services/homepageService";
import { HeroSlide, Testimonial } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { uploadImage, deleteImage } from "@/services/storageService";

const ManageHomepagePage = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Slide Dialog
  const [isSlideDialogOpen, setIsSlideDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideForm, setSlideForm] = useState({
    title: "",
    description: "",
    image: "",
    order_index: 0,
    active: true
  });

  // Testimonial Dialog
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    content: "",
    image_url: "",
    rating: 5
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [slidesData, testimonialsData] = await Promise.all([
        homepageService.getSlides(),
        homepageService.getTestimonials()
      ]);
      setSlides(slidesData || []);
      setTestimonials(testimonialsData || []);
    } catch (error) {
      console.error("Failed to fetch homepage data", error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------------
  // SLIDES HANDLERS
  // ------------------------------------------------------------------
  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'hero');
      if (url) {
        setSlideForm(prev => ({ ...prev, image: url }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingSlide) {
        await homepageService.updateSlide(editingSlide.id, slideForm);
        toast.success("Slide updated successfully");
      } else {
        await homepageService.createSlide(slideForm);
        toast.success("Slide created successfully");
      }
      setIsSlideDialogOpen(false);
      fetchData();
      resetSlideForm();
    } catch (error) {
      toast.error("Failed to save slide");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlide = async (slide: HeroSlide) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    try {
      await homepageService.deleteSlide(slide.id);
      if (slide.image) await deleteImage(slide.image);
      toast.success("Slide deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete slide");
    }
  };

  const resetSlideForm = () => {
    setEditingSlide(null);
    setSlideForm({
      title: "",
      description: "",
      image: "",
      order_index: slides.length + 1,
      active: true
    });
  };

  const openSlideDialog = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setSlideForm({
        title: slide.title,
        description: slide.description,
        image: slide.image,
        order_index: slide.order_index,
        active: slide.active
      });
    } else {
      resetSlideForm();
    }
    setIsSlideDialogOpen(true);
  };

  // ------------------------------------------------------------------
  // TESTIMONIALS HANDLERS
  // ------------------------------------------------------------------
  const handleTestimonialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const url = await uploadImage(e.target.files[0], 'testimonials');
      if (url) {
        setTestimonialForm(prev => ({ ...prev, image_url: url }));
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTestimonial) {
        await homepageService.updateTestimonial(editingTestimonial.id, testimonialForm);
        toast.success("Testimonial updated successfully");
      } else {
        await homepageService.createTestimonial(testimonialForm);
        toast.success("Testimonial created successfully");
      }
      setIsTestimonialDialogOpen(false);
      fetchData();
      resetTestimonialForm();
    } catch (error) {
      toast.error("Failed to save testimonial");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (item: Testimonial) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await homepageService.deleteTestimonial(item.id);
      if (item.image_url) await deleteImage(item.image_url);
      toast.success("Testimonial deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  const resetTestimonialForm = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: "",
      role: "",
      content: "",
      image_url: "",
      rating: 5
    });
  };

  const openTestimonialDialog = (item?: Testimonial) => {
    if (item) {
      setEditingTestimonial(item);
      setTestimonialForm({
        name: item.name,
        role: item.role,
        content: item.content,
        image_url: item.image_url,
        rating: item.rating
      });
    } else {
      resetTestimonialForm();
    }
    setIsTestimonialDialogOpen(true);
  };

  if (loading && !slides.length && !testimonials.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Controller</h1>
          <p className="text-slate-500">Manage hero slides and testimonials.</p>
        </div>
      </div>

      <Tabs defaultValue="slides" className="w-full">
        <TabsList>
          <TabsTrigger value="slides">Hero Slides</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        {/* HERO SLIDES TAB */}
        <TabsContent value="slides" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isSlideDialogOpen} onOpenChange={setIsSlideDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openSlideDialog()}>
                  <Plus className="mr-2 h-4 w-4" /> Add Slide
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingSlide ? "Edit Slide" : "Create Slide"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSlideSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={slideForm.title}
                      onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description/Subtitle</label>
                    <Input
                      value={slideForm.description}
                      onChange={(e) => setSlideForm({ ...slideForm, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Order Index</label>
                    <Input
                      type="number"
                      value={slideForm.order_index}
                      onChange={(e) => setSlideForm({ ...slideForm, order_index: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image</label>
                    <div className="flex items-center gap-4">
                      {slideForm.image && (
                        <img 
                          src={slideForm.image} 
                          alt="Preview" 
                          className="h-20 w-32 object-cover rounded-md border"
                        />
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleSlideImageUpload}
                          disabled={uploading}
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || uploading}>
                    {loading ? "Saving..." : "Save Slide"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slides.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                      No slides found. Create one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  slides.map((slide) => (
                    <TableRow key={slide.id}>
                      <TableCell>{slide.order_index}</TableCell>
                      <TableCell>
                        <div className="h-12 w-20 rounded overflow-hidden bg-slate-100">
                          {slide.image ? (
                            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{slide.title}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openSlideDialog(slide)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteSlide(slide)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* TESTIMONIALS TAB */}
        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openTestimonialDialog()}>
                  <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Create Testimonial"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role/Location</label>
                      <Input
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      value={testimonialForm.content}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Photo</label>
                    <div className="flex items-center gap-4">
                      {testimonialForm.image_url && (
                        <img 
                          src={testimonialForm.image_url} 
                          alt="Preview" 
                          className="h-12 w-12 rounded-full object-cover border"
                        />
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleTestimonialImageUpload}
                          disabled={uploading}
                        />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || uploading}>
                    {loading ? "Saving..." : "Save Testimonial"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Person</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                      No testimonials found.
                    </TableCell>
                  </TableRow>
                ) : (
                  testimonials.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <ImageIcon className="h-4 w-4 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell className="max-w-md truncate text-slate-500">
                        {item.content}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openTestimonialDialog(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteTestimonial(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageHomepagePage;
