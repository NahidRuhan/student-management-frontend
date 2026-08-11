'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { StudentStatus, CreateStudentPayload } from '@/types/student';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

interface StudentFormProps {
  initialData?: Partial<CreateStudentPayload>;
  onSubmit: (data: CreateStudentPayload) => void;
  isLoading?: boolean;
}

export function StudentForm({ initialData, onSubmit, isLoading }: StudentFormProps) {
  const [formData, setFormData] = React.useState<CreateStudentPayload>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    class: initialData?.class || '',
    status: initialData?.status || StudentStatus.ACTIVE,
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof CreateStudentPayload, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof CreateStudentPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateStudentPayload, string>> = {};
    let firstErrorMessage = '';

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      if (!firstErrorMessage) firstErrorMessage = 'Name is required. Please enter the student\'s name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      if (!firstErrorMessage) firstErrorMessage = 'Email is required. Please enter a valid email address.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      if (!firstErrorMessage) firstErrorMessage = 'Invalid email format. Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      if (!firstErrorMessage) firstErrorMessage = 'Phone is required. Please enter the student\'s phone number.';
    }

    if (!formData.class.trim()) {
      newErrors.class = 'Class is required';
      if (!firstErrorMessage) firstErrorMessage = 'Class is required. Please enter the student\'s class.';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
      if (!firstErrorMessage) firstErrorMessage = 'Status is required. Please select a status.';
    }

    setErrors(newErrors);

    if (firstErrorMessage) {
      Toast.fire({
        icon: 'error',
        title: firstErrorMessage
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        placeholder="Enter full name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter email address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          name="phone"
          placeholder="e.g. +1234567890"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          label="Class / Grade"
          name="class"
          placeholder="e.g. Grade 10"
          value={formData.class}
          onChange={handleChange}
          error={errors.class}
        />
      </div>
      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        error={errors.status}
        options={[
          { value: StudentStatus.ACTIVE, label: 'Active' },
          { value: StudentStatus.INACTIVE, label: 'Inactive' },
        ]}
      />
      <div className="pt-4 flex justify-end gap-3">
        <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
          {initialData ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}
