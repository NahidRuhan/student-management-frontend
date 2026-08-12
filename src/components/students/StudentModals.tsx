import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StudentForm } from '@/components/students/StudentForm';
import { Student, CreateStudentPayload } from '@/types/student';
import {
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

interface StudentModalsProps {
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
}

export function StudentModals({
  isFormOpen,
  setIsFormOpen,
  isDeleteOpen,
  setIsDeleteOpen,
  selectedStudent,
  setSelectedStudent,
}: StudentModalsProps) {
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

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
    <>
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
    </>
  );
}
