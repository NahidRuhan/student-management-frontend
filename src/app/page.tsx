'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StudentTable } from '@/components/students/StudentTable';
import { StudentFilters } from '@/components/students/StudentFilters';
import { StudentPagination } from '@/components/students/StudentPagination';
import { StudentModals } from '@/components/students/StudentModals';
import { Student } from '@/types/student';
import { useGetStudentsQuery } from '@/store/api/studentsApi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useStudentFilters } from '@/hooks/useStudentFilters';

export default function StudentsPage() {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  // Custom Hook for Filters
  const {
    search, status, studentClass, sortBy, sortOrder, page, setPage,
    queryParams, handleSearch, handleStatusChange, handleClassChange,
    handleSortByChange, handleSortOrderChange, handleClear
  } = useStudentFilters();

  // Modals State
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  // API Hooks
  const { data, isLoading, isFetching, isError } = useGetStudentsQuery(queryParams);

  const students = data?.data || [];
  const meta = data?.meta;

  // Handlers
  const handleOpenCreate = () => {
    if (!isAuthenticated) return router.push('/login');
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    if (!isAuthenticated) return router.push('/login');
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (student: Student) => {
    if (!isAuthenticated) return router.push('/login');
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Students</h1>
          <p className="text-text-secondary mt-1">
            Manage your student directory and enrollment status.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="w-full sm:w-auto">
          <Plus className="mr-2 h-5 w-5" />
          Add Student
        </Button>
      </div>

      <StudentFilters
        currentSearch={search}
        currentStatus={status}
        currentClass={studentClass}
        currentSortBy={sortBy}
        currentSortOrder={sortOrder}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onClassChange={handleClassChange}
        onSortByChange={handleSortByChange}
        onSortOrderChange={handleSortOrderChange}
        onClear={handleClear}
      />

      {/* Table */}
      <StudentTable
        students={students}
        isLoading={isLoading || isFetching}
        isError={isError}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Pagination Controls */}
      <StudentPagination
        meta={meta}
        currentCount={students.length}
        page={page}
        isLoading={isLoading || isFetching}
        onPageChange={setPage}
      />

      {/* Modals */}
      <StudentModals
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
    </main>
  );
}
