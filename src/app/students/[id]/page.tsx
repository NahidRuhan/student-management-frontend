'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetStudentByIdQuery } from '@/store/api/studentsApi';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Mail, Phone, Calendar, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import { StudentStatus } from '@/types/student';

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetStudentByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        <div className="w-full h-64 flex items-center justify-center bg-surface rounded-lg border border-border mt-10">
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
            <p className="text-sm font-medium">Loading student details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 -ml-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="w-full py-16 flex flex-col items-center justify-center rounded-lg border border-danger-200 bg-danger-50 text-center px-4">
          <h3 className="text-lg font-semibold text-danger-600 mb-1">Student Not Found</h3>
          <p className="text-danger-500 text-sm max-w-sm">
            We couldn&apos;t find the student you are looking for. They may have been deleted or the ID is invalid.
          </p>
        </div>
      </main>
    );
  }

  const student = data.data;

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Navigation */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 -ml-3 text-text-secondary hover:text-text">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Main Profile Card */}
      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Top Banner (Aesthetic touch) */}
        <div className="h-32 bg-linear-to-r from-primary-600 to-primary-400 w-full" />
        
        <div className="px-6 sm:px-10 pb-10 relative">
          {/* Avatar / Initial */}
          <div className="h-24 w-24 rounded-full border-4 border-surface bg-primary-100 text-primary-700 flex items-center justify-center text-3xl font-bold absolute -top-12 shadow-sm">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <div className="pt-16 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text tracking-tight">{student.name}</h1>
              <div className="text-text-secondary mt-1 flex items-center gap-1.5">
                <Badge variant="neutral" className="bg-surface-alt font-medium px-2.5">
                  ID: <span className="font-mono ml-1">{student.id.split('-')[0]}</span>
                </Badge>
              </div>
            </div>

            <Badge
              variant={student.status === StudentStatus.ACTIVE ? 'success' : 'neutral'}
              className="px-3 py-1.5 text-sm w-fit"
            >
              {student.status === StudentStatus.ACTIVE ? (
                <CheckCircle className="h-4 w-4 mr-1.5" />
              ) : (
                <XCircle className="h-4 w-4 mr-1.5" />
              )}
              {student.status === StudentStatus.ACTIVE ? 'Active Student' : 'Inactive Student'}
            </Badge>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Contact Information</h3>
              <div className="bg-surface-alt rounded-lg p-4 space-y-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-text-secondary border border-border shadow-sm">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Email Address</p>
                    <p className="text-sm font-medium text-text mt-0.5">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-text-secondary border border-border shadow-sm">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Phone Number</p>
                    <p className="text-sm font-medium text-text mt-0.5">{student.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Academic Information</h3>
              <div className="bg-surface-alt rounded-lg p-4 space-y-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-text-secondary border border-border shadow-sm">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Enrolled Class</p>
                    <p className="text-sm font-medium text-text mt-0.5">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-text-secondary border border-border shadow-sm">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Registration Date</p>
                    <p className="text-sm font-medium text-text mt-0.5">
                      {new Date(student.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center text-text-secondary border border-border shadow-sm">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-medium">Last Updated</p>
                    <p className="text-sm font-medium text-text mt-0.5">
                      {new Date(student.updatedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
