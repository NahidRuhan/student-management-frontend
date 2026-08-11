'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { StudentStatus, CreateStudentPayload } from '@/types/student';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        placeholder="Enter full name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter email address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          name="phone"
          placeholder="e.g. +1234567890"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          label="Class / Grade"
          name="class"
          placeholder="e.g. Grade 10"
          value={formData.class}
          onChange={handleChange}
          required
        />
      </div>
      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: StudentStatus.ACTIVE, label: 'Active' },
          { value: StudentStatus.INACTIVE, label: 'Inactive' },
        ]}
        required
      />
      <div className="pt-4 flex justify-end gap-3">
        <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto">
          {initialData ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}
