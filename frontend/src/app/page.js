'use client';

import { useState, useEffect } from 'react';
import CandidateTable from '@/components/CandidateTable';
import FilterBar from '@/components/FilterBar';
import AddCandidateModal from '@/components/AddCandidate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"

// Dummy data
const dummyCandidates = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    status: "pending",
    position: "Frontend Developer",
    experience: "5 years",
    appliedDate: "2024-03-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    status: "interviewed",
    position: "UX Designer",
    experience: "3 years",
    appliedDate: "2024-03-14"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 345-6789",
    status: "accepted",
    position: "Backend Developer",
    experience: "7 years",
    appliedDate: "2024-03-13"
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "+1 (555) 456-7890",
    status: "rejected",
    position: "Product Manager",
    experience: "4 years",
    appliedDate: "2024-03-12"
  }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Home() {
  // Initialize with dummy data
  const [candidates, setCandidates] = useState(dummyCandidates);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  });
  const [loading, setLoading] = useState(false); // Set to false since we have dummy data
  const { toast } = useToast();

  // Comment out or modify the useEffect to prevent API calls
  // useEffect(() => {
  //   fetchCandidates();
  // }, []);

  const fetchCandidates = async () => {
    // For testing, just return dummy data
    setCandidates(dummyCandidates);
  };

  const handleAddCandidate = async (newCandidate) => {
    try {
      // Simulate adding a new candidate locally
      const newId = candidates.length + 1;
      const candidateWithId = {
        ...newCandidate,
        id: newId,
        appliedDate: new Date().toISOString().split('T')[0]
      };
      setCandidates([...candidates, candidateWithId]);
      toast({
        title: "Success",
        description: "Candidate added successfully",
      });
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast({
        title: "Error",
        description: "Failed to add candidate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      // Update status locally
      const updatedCandidates = candidates.map(candidate =>
        candidate.id === id ? { ...candidate, status } : candidate
      );
      setCandidates(updatedCandidates);
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;

    try {
      // Delete locally
      const filteredCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(filteredCandidates);
      toast({
        title: "Success",
        description: "Candidate deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting candidate:', error);
      toast({
        title: "Error",
        description: "Failed to delete candidate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || candidate.status.toLowerCase() === filters.status;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Candidates Assessment Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <AddCandidateModal onAddCandidate={handleAddCandidate} />
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <CandidateTable
              candidates={filteredCandidates}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}