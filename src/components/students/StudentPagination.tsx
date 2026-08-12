import * as React from 'react';
import { Button } from '@/components/ui/Button';

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface StudentPaginationProps {
  meta?: PaginationMeta;
  currentCount: number;
  page: number;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
}

export function StudentPagination({
  meta,
  currentCount,
  page,
  isLoading,
  onPageChange,
}: StudentPaginationProps) {
  if (!meta || meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6 bg-surface p-4 rounded-lg border border-border">
      <p className="text-sm text-text-secondary">
        Showing <span className="font-medium text-text">{currentCount}</span> of{' '}
        <span className="font-medium text-text">{meta.total}</span> results
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1 || isLoading}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <div className="flex items-center px-3 text-sm font-medium">
          Page {page} of {meta.totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={page === meta.totalPages || isLoading}
          onClick={() => onPageChange(Math.min(meta.totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
