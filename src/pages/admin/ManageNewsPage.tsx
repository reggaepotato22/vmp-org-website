import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Search } from "lucide-react";
import { useNewsContext, NewsItem } from "@/context/NewsContext";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

const ManageNewsPage = () => {
  const { recentNews, addNews, updateNews, deleteNews } = useNewsContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<NewsItem>>({});

  const filteredNews = recentNews.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNew = () => {
    setCurrentItem({
      category: "Mission Report",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Draft",
      author: "Admin",
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: NewsItem) => {
    setCurrentItem({ ...item });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string | number) => {
    deleteNews(id);
  };

  const handleSave = () => {
    if (isEditing && currentItem.id) {
      updateNews(currentItem as NewsItem);
    } else {
      const newItem = {
        ...currentItem,
        id: Date.now().toString(),
      } as NewsItem;
      addNews(newItem);
    }
    setIsDialogOpen(false);
    setCurrentItem({});
    setIsEditing(false);
  };

  const handleChange = (key: keyof NewsItem, value: string) => {
    setCurrentItem((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage News & Stories</h1>
          <p className="text-slate-500 dark:text-slate-400">Create, edit, and delete news articles, events, and galleries.</p>
        </div>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
        <Search className="h-5 w-5 text-slate-400" />
        <Input
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 bg-transparent"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead className="dark:text-slate-400">Title</TableHead>
              <TableHead className="dark:text-slate-400">Author</TableHead>
              <TableHead className="dark:text-slate-400">Date</TableHead>
              <TableHead className="dark:text-slate-400">Category</TableHead>
              <TableHead className="dark:text-slate-400">Status</TableHead>
              <TableHead className="text-right dark:text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No news found.
                </TableCell>
              </TableRow>
            ) : (
              filteredNews.map((item) => (
                <TableRow key={item.id} className="dark:border-slate-800">
                  <TableCell className="font-medium dark:text-slate-200">
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt="" 
                          className="h-8 w-8 rounded object-cover"
                        />
                      )}
                      {item.title}
                    </div>
                  </TableCell>
                  <TableCell className="dark:text-slate-200">{item.author || "-"}</TableCell>
                  <TableCell className="dark:text-slate-200">{item.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Published' ? 'default' : 'outline'}>
                      {item.status || 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4 text-slate-500 hover:text-primary" />
                    </Button>
                    <DeleteConfirmationModal 
                      onConfirm={() => handleDelete(item.id)}
                      title="Delete Article?"
                      description="This will permanently delete this news article."
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Post" : "Create New Post"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the details of this post."
                : "Create a new news article, event, or update."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div className="grid gap-2">
               <ImageUpload 
                 label="Featured Image"
                 value={currentItem.imageUrl}
                 onChange={(url) => handleChange("imageUrl", url as string)}
                 folder="news"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentItem.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Article Title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={currentItem.author || ""}
                  onChange={(e) => handleChange("author", e.target.value)}
                  placeholder="Author Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={currentItem.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mission Report">Mission Report</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Milestone">Milestone</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentItem.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                  <Label htmlFor="date">Published Date</Label>
                  <Input
                    id="date"
                    value={currentItem.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                    placeholder="MMM DD, YYYY"
                  />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={currentItem.readTime || ""}
                    onChange={(e) => handleChange("readTime", e.target.value)}
                    placeholder="e.g. 5 min read"
                  />
               </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={currentItem.excerpt || ""}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                placeholder="Short summary..."
                className="h-20"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="body">Content (Rich Text Placeholder)</Label>
              <Textarea
                id="body"
                value={currentItem.body || ""}
                onChange={(e) => handleChange("body", e.target.value)}
                placeholder="Full article content..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Update Post" : "Publish Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageNewsPage;
