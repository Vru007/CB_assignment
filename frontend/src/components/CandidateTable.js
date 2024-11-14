import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StatusUpdateDialog from './StatusUpdate';

const CandidateTable = ({ candidates, onStatusChange, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleStatusClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleStatusDialogClose = () => {
    setSelectedCandidate(null);
  };

  const handleStatusUpdate = (newStatus) => {
    if (selectedCandidate) {
      onStatusChange(selectedCandidate.id, newStatus);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => requestSort('name')}
              >
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => requestSort('email')}
              >
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => requestSort('position')}
              >
                Position {sortConfig.key === 'position' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => requestSort('experience')}
              >
                Experince (In Years) {sortConfig.key === 'experience' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => requestSort('appliedDate')}
              >
                Applied At {sortConfig.key === 'appliedDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => requestSort('status')}
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>{candidate.appliedDate}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleStatusClick(candidate)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}
                  >
                    {candidate.status}
                  </button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(candidate.id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <StatusUpdateDialog
        isOpen={!!selectedCandidate}
        onClose={handleStatusDialogClose}
        onStatusUpdate={handleStatusUpdate}
        currentStatus={selectedCandidate?.status || ''}
        candidateName={selectedCandidate?.name || ''}
      />
    </>
  );
};

export default CandidateTable;