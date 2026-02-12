import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Download, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const VolunteersPage = () => {
  const { volunteers } = useData();

  // Mock data if empty
  const displayVolunteers = volunteers.length > 0 ? volunteers : [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Medical', status: 'Pending', date: '2024-03-15' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'Logistics', status: 'Approved', date: '2024-03-14' },
    { id: '3', name: 'Amara Okafor', email: 'amara@example.com', role: 'Outreach', status: 'Approved', date: '2024-03-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-vmp-black">Volunteer Management</h2>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search volunteers..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">All</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Pending</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Approved</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role Interest</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.email}</TableCell>
                  <TableCell>{volunteer.role || 'General'}</TableCell>
                  <TableCell>{volunteer.date}</TableCell>
                  <TableCell>
                    <Badge variant={volunteer.status === 'Approved' ? 'default' : 'secondary'} 
                      className={volunteer.status === 'Approved' ? 'bg-green-600' : 'bg-yellow-500 text-white'}>
                      {volunteer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <UserCheck className="h-4 w-4 text-vmp-maroon" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteersPage;
