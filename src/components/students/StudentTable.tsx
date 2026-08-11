'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Edit2, Trash2 } from 'lucide-react';
import { Student, StudentStatus } from '@/types/student';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  isLoading?: boolean;
  isError?: boolean;
}

export function StudentTable({ students, onEdit, onDelete, isLoading, isError }: StudentTableProps) {
  if (isError) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center bg-surface rounded-lg border border-danger-200 bg-danger-50 text-center px-4">
        <h3 className="text-lg font-semibold text-danger-600 mb-1">API Error</h3>
        <p className="text-danger-500 text-sm max-w-sm">
          Unable to load students. Please try again.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-surface rounded-lg border border-border">
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <p className="text-sm font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center bg-surface rounded-lg border border-border text-center px-4">
        <div className="h-12 w-12 rounded-full bg-surface-alt flex items-center justify-center mb-4">
          <span className="text-2xl">👨‍🎓</span>
        </div>
        <h3 className="text-lg font-semibold text-text mb-1">No students found</h3>
        <p className="text-text-secondary text-sm max-w-sm">
          Try adjusting your search or filters, or add a new student to get started.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Name</TableHead>
          <TableHead className="w-[35%]">Contact Info</TableHead>
          <TableHead className="w-[15%]">Class</TableHead>
          <TableHead className="w-[10%]">Status</TableHead>
          <TableHead className="w-[10%] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium text-text">
              {student.name}
            </TableCell>
            <TableCell>
              <div className="flex flex-col text-sm">
                <span className="text-text">{student.email}</span>
                <span className="text-text-muted text-xs mt-0.5">{student.phone}</span>
              </div>
            </TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>
              <Badge
                variant={student.status === StudentStatus.ACTIVE ? 'success' : 'neutral'}
              >
                {student.status === StudentStatus.ACTIVE ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(student)}
                  className="h-8 w-8 p-0"
                  title="Edit Student"
                >
                  <Edit2 className="h-4 w-4 text-text-secondary" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(student)}
                  className="h-8 w-8 p-0 hover:bg-danger-50 hover:text-danger-600"
                  title="Delete Student"
                >
                  <Trash2 className="h-4 w-4 text-danger-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
