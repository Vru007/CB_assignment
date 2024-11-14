import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FilterBar = ({ filters, onFilterChange }) => {
  const statusOptions = ['All', 'Pending', 'In Progress', 'Completed', 'Interviewed'];
  const positionOptions = ['All', 'Frontend Developer', 'Backend Developer', 'UX Designer', 'Product Manager'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="w-[200px]">
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status.toLowerCase()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-[200px]">
        <Select
          value={filters.position}
          onValueChange={(value) => onFilterChange('position', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by position" />
          </SelectTrigger>
          <SelectContent>
            {positionOptions.map((position) => (
              <SelectItem key={position} value={position.toLowerCase()}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;