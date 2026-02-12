import { useState, useEffect } from "react";
import { contactService } from "@/services/contactService";
import { ContactMessage } from "@/types";
import { Button } from "@/components/ui/button";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Mail, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import EmptyState from "@/components/admin/EmptyState";

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await contactService.getMessages();
      // Sort by date desc
      const sorted = (data || []).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setMessages(sorted);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Messages</h1>
          <p className="text-slate-500">View and manage contact form submissions.</p>
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading && messages.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : messages.length === 0 ? (
        <EmptyState 
          icon={Mail} 
          title="No messages yet" 
          description="Messages from the contact form will appear here." 
          actionLabel="Refresh"
          onAction={fetchMessages}
        />
      ) : (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedMessage(msg)}>
                  <TableCell className="whitespace-nowrap">
                    {msg.date ? format(new Date(msg.date), "MMM d, yyyy HH:mm") : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">{msg.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                      {msg.interest || "General"}
                    </span>
                    <span className="ml-2 text-slate-600 truncate max-w-[200px] inline-block align-bottom">
                      {msg.subject}
                    </span>
                  </TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedMessage(msg); }}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Received on {selectedMessage?.date ? format(new Date(selectedMessage.date), "PPP p") : ""}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">From</h4>
                  <p className="text-base font-semibold text-slate-900">{selectedMessage.name}</p>
                  <p className="text-sm text-slate-600">{selectedMessage.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Category</h4>
                  <p className="text-base text-slate-900 capitalize">{selectedMessage.interest}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">Subject</h4>
                <p className="text-base text-slate-900">{selectedMessage.subject}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="text-sm font-medium text-slate-500 mb-2">Message</h4>
                <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Close
                </Button>
                <Button onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}>
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMessagesPage;
