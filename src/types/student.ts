export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface SingleResponse<T> {
  data: T;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface StudentQueryParams {
  search?: string;
  status?: StudentStatus | 'ALL';
  class?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'class';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateStudentPayload {
  name: string;
  email: string;
  phone: string;
  class: string;
  status: StudentStatus;
}

export interface UpdateStudentPayload extends Partial<CreateStudentPayload> {}
