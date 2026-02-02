import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMissions, Mission } from "@/context/MissionContext";
import { Plus, Pencil } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { DeleteConfirmationModal } from "@/components/admin/DeleteConfirmationModal";

const ManageMissionsPage = () => {
  const { missions, addMission, updateMission, deleteMission } = useMissions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentMission, setCurrentMission] = useState<Partial<Mission>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (isEditing && currentMission.id) {
      updateMission(currentMission as Mission);
    } else {
      const newMission = {
        ...currentMission,
        id: Date.now().toString(),
        stats: currentMission.stats || { treated: "0", value: "$0", bibles: "0" },
        status: currentMission.status || 'Upcoming',
      } as Mission;
      addMission(newMission);
    }
    setIsDialogOpen(false);
    setCurrentMission({});
    setIsEditing(false);
  };

  const handleEdit = (mission: Mission) => {
    setCurrentMission({ ...mission });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMission(id);
  };

  const handleAddNew = () => {
    setCurrentMission({
      stats: { treated: "", value: "", bibles: "" },
      status: 'Upcoming'
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Missions</h1>
          <p className="text-slate-500 dark:text-slate-400">Track mission reports, statistics, and volunteer deployments.</p>
        </div>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Mission
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-slate-800">
              <TableHead className="dark:text-slate-400">Year</TableHead>
              <TableHead className="dark:text-slate-400">Mission Title</TableHead>
              <TableHead className="dark:text-slate-400">Location</TableHead>
              <TableHead className="dark:text-slate-400">Date</TableHead>
              <TableHead className="dark:text-slate-400">Status</TableHead>
              <TableHead className="text-right dark:text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No missions found.
                </TableCell>
              </TableRow>
            ) : (
              missions.map((mission) => (
                <TableRow key={mission.id} className="dark:border-slate-800">
                  <TableCell className="font-medium dark:text-slate-200">{mission.year}</TableCell>
                  <TableCell className="dark:text-slate-200">
                    <div className="flex items-center gap-3">
                      {mission.missionCoverImage && (
                        <img 
                          src={mission.missionCoverImage} 
                          alt="" 
                          className="h-8 w-8 rounded object-cover"
                        />
                      )}
                      {mission.title}
                    </div>
                  </TableCell>
                  <TableCell className="dark:text-slate-200">{mission.location}</TableCell>
                  <TableCell className="dark:text-slate-200">{mission.date}</TableCell>
                  <TableCell>
                     <Badge variant={mission.status === 'Completed' ? 'default' : 'outline'}>
                      {mission.status || 'Completed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(mission)}>
                      <Pencil className="h-4 w-4 text-slate-500 hover:text-primary" />
                    </Button>
                    <DeleteConfirmationModal 
                      onConfirm={() => handleDelete(mission.id)}
                      title="Delete Mission?"
                      description="This will permanently delete this mission record."
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
            <DialogTitle>{isEditing ? "Edit Mission" : "Add New Mission"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the details of the selected mission."
                : "Enter the details for a new mission report."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div className="grid gap-2">
               <ImageUpload 
                 label="Mission Cover Image"
                 value={currentMission.missionCoverImage}
                 onChange={(url) => setCurrentMission({ ...currentMission, missionCoverImage: url as string })}
                 folder="missions"
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Mission Title</Label>
                <Input
                  id="title"
                  value={currentMission.title || ""}
                  onChange={(e) => setCurrentMission({ ...currentMission, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentMission.status}
                  onValueChange={(value) => setCurrentMission({ ...currentMission, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={currentMission.year || ""}
                  onChange={(e) => setCurrentMission({ ...currentMission, year: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={currentMission.location || ""}
                  onChange={(e) => setCurrentMission({ ...currentMission, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={currentMission.date || ""}
                  onChange={(e) => setCurrentMission({ ...currentMission, date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Team Members</Label>
              <Input
                id="team"
                value={currentMission.team || ""}
                onChange={(e) => setCurrentMission({ ...currentMission, team: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-[100px]"
                value={currentMission.description || ""}
                onChange={(e) => setCurrentMission({ ...currentMission, description: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="outcome">Outcome / Results (Optional)</Label>
              <Textarea
                id="outcome"
                value={currentMission.outcome || ""}
                onChange={(e) => setCurrentMission({ ...currentMission, outcome: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Statistics</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="treated" className="text-xs text-slate-500">Patients Treated</Label>
                  <Input
                    id="treated"
                    placeholder="300+"
                    value={currentMission.stats?.treated || ""}
                    onChange={(e) => setCurrentMission({ 
                      ...currentMission, 
                      stats: { ...currentMission.stats!, treated: e.target.value } 
                    })}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="value" className="text-xs text-slate-500">Value of Services</Label>
                  <Input
                    id="value"
                    placeholder="$15,000"
                    value={currentMission.stats?.value || ""}
                    onChange={(e) => setCurrentMission({ 
                      ...currentMission, 
                      stats: { ...currentMission.stats!, value: e.target.value } 
                    })}
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="bibles" className="text-xs text-slate-500">Bibles Distributed</Label>
                  <Input
                    id="bibles"
                    placeholder="200+"
                    value={currentMission.stats?.bibles || ""}
                    onChange={(e) => setCurrentMission({ 
                      ...currentMission, 
                      stats: { ...currentMission.stats!, bibles: e.target.value } 
                    })}
                  />
                </div>
              </div>
            </div>

          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Update Mission" : "Create Mission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMissionsPage;
