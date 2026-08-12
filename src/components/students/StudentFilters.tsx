'use client';

import * as React from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Search, X } from 'lucide-react';
import { StudentStatus } from '@/types/student';

interface StudentFiltersProps {
  onSearch: (search: string) => void;
  onStatusChange: (status: string) => void;
  onClassChange: (className: string) => void;
  onSortByChange: (sortBy: string) => void;
  onSortOrderChange: (sortOrder: string) => void;
  currentSearch: string;
  currentStatus: string;
  currentClass: string;
  currentSortBy: string;
  currentSortOrder: string;
  onClear: () => void;
}

export function StudentFilters({
  onSearch,
  onStatusChange,
  onClassChange,
  onSortByChange,
  onSortOrderChange,
  currentSearch,
  currentStatus,
  currentClass,
  currentSortBy,
  currentSortOrder,
  onClear,
}: StudentFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState(currentSearch);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const hasFilters = currentSearch || currentStatus || currentClass || currentSortBy || currentSortOrder;

  return (
    <div className="flex flex-col gap-4 mb-6 bg-surface p-4 rounded-lg border border-border">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
        <label className="text-sm font-medium text-text-secondary mb-1.5 block">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="flex h-10 w-full rounded-md border border-border bg-surface pl-10 pr-3 py-2 text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="w-full sm:w-48">
        <Select
          label="Status"
          value={currentStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { value: '', label: 'All Statuses' },
            { value: StudentStatus.ACTIVE, label: 'Active' },
            { value: StudentStatus.INACTIVE, label: 'Inactive' },
          ]}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          label="Class"
          value={currentClass}
          onChange={(e) => onClassChange(e.target.value)}
          options={[
            { value: '', label: 'All Classes' },
            ...Array.from({ length: 12 }).map((_, i) => {
              const gradeNum = (i + 1).toString().padStart(2, '0');
              return {
                value: `Grade ${gradeNum}`,
                label: `Grade ${gradeNum}`,
              };
            }),
          ]}
        />
      </div>
      
      <div className="w-full sm:w-48">
        <Select
          label="Sort By"
          value={currentSortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          options={[
            { value: '', label: 'Default' },
            { value: 'name', label: 'Name' },
            { value: 'createdAt', label: 'Created Date' },
            { value: 'class', label: 'Class' },
          ]}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          label="Sort Order"
          value={currentSortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          options={[
            { value: '', label: 'Default' },
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
        />
      </div>

      {hasFilters && (
        <Button variant="ghost" onClick={() => {
          setSearchTerm('');
          onClear();
        }} className="h-10 px-3">
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
      </div>
    </div>
  );
}
