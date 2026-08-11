'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StudentTable } from '@/components/students/StudentTable';
import { StudentFilters } from '@/components/students/StudentFilters';
import { StudentForm } from '@/components/students/StudentForm';
import { Student, CreateStudentPayload } from '@/types/student';
import {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from '@/store/api/studentsApi';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default function StudentsPage() {
  // Filters State
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [studentClass, setStudentClass] = React.useState('');
  const [page, setPage] = React.useState(1);

  // Modals State
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  // API Hooks
  const queryParams: any = { page, limit: 10 };
  if (search) queryParams.search = search;
  if (status) queryParams.status = status;
  if (studentClass) queryParams.class = studentClass;

  const { data, isLoading, isFetching, isError } = useGetStudentsQuery(queryParams);

  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  const students = data?.data || [];
  const meta = data?.meta;

  // Handlers
  const handleOpenCreate = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (payload: CreateStudentPayload) => {
    try {
      if (selectedStudent) {
        await updateStudent({ id: selectedStudent.id, payload }).unwrap();
        Toast.fire({ icon: 'success', title: 'Student updated successfully!' });
      } else {
        await createStudent(payload).unwrap();
        Toast.fire({ icon: 'success', title: 'Student created successfully!' });
      }
      setIsFormOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Failed to save student:', error);
      Toast.fire({ icon: 'error', title: 'Failed to save student. Please try again.' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;
    try {
      await deleteStudent(selectedStudent.id).unwrap();
      Toast.fire({ icon: 'success', title: 'Student deleted successfully!' });
      setIsDeleteOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error('Failed to delete student:', error);
      Toast.fire({ icon: 'error', title: 'Failed to delete student.' });
    }
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

      {/* Filters */}
      <StudentFilters
        currentSearch={search}
        currentStatus={status}
        currentClass={studentClass}
        onSearch={React.useCallback((s: string) => { setSearch(s); setPage(1); }, [])}
        onStatusChange={React.useCallback((s: string) => { setStatus(s); setPage(1); }, [])}
        onClassChange={React.useCallback((c: string) => { setStudentClass(c); setPage(1); }, [])}
        onClear={React.useCallback(() => {
          setSearch('');
          setStatus('');
          setStudentClass('');
          setPage(1);
        }, [])}
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
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 bg-surface p-4 rounded-lg border border-border">
          <p className="text-sm text-text-secondary">
            Showing <span className="font-medium text-text">{students.length}</span> of{' '}
            <span className="font-medium text-text">{meta.total}</span> results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1 || isLoading || isFetching}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <div className="flex items-center px-3 text-sm font-medium">
              Page {page} of {meta.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === meta.totalPages || isLoading || isFetching}
              onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          initialData={selectedStudent || undefined}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Student"
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Are you sure you want to delete <span className="font-semibold text-text">{selectedStudent?.name}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={isDeleting}
            >
              Delete Student
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
