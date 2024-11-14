'use client';

import { useState, useEffect } from 'react';
import CandidateTable from '@/components/CandidateTable';
import FilterBar from '@/components/FilterBar';
import AddCandidateModal from '@/components/AddCandidate';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("api_url: ",API_URL);

export default function Home() {
  // Initialize candidates as an empty array, not undefined
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    position: 'all'
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${API_URL}/candidates`);
      console.log("repsonse: ",response);
      console.log("data: ",response.data);
      // Make sure we're setting an array, even if empty
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      // Set empty array on error to prevent undefined
      setCandidates([]);
      toast({
        title: "Error",
        description: "Failed to fetch candidates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (newCandidate) => {
    try {
      const response = await fetch(`${API_URL}/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCandidate),
      });
      
      if (!response.ok) throw new Error('Failed to add candidate');
      
      await fetchCandidates();
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
      // Updated URL to match backend route
      const response = await fetch(`${API_URL}/candidates/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
        
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }
        
      await fetchCandidates();
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;

    try {
      const response = await fetch(`${API_URL}/candidates/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete candidate');
      
      await fetchCandidates();
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

  // Add null check before filtering
  const filteredCandidates = candidates?.filter(candidate => {
    if (!candidate) return false;  // Skip if candidate is undefined
    
    const matchesSearch = (candidate.name?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
                         (candidate.email?.toLowerCase() || '').includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || (candidate.status?.toLowerCase() || '') === filters.status;
    const matchesPosition = 
      filters.position === 'all' || (candidate.position?.toLowerCase() || '') === filters.position.toLowerCase();
    return matchesSearch && matchesStatus && matchesPosition;
  }) || [];

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