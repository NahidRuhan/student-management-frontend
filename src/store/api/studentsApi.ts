import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Student,
  PaginatedResponse,
  SingleResponse,
  CreateStudentPayload,
  UpdateStudentPayload,
  StudentQueryParams,
} from '@/types/student';

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
  }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query<PaginatedResponse<Student>, StudentQueryParams>({
      query: (params) => ({
        url: '/students',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Student' as const, id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    getStudentById: builder.query<SingleResponse<Student>, string>({
      query: (id) => `/students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    createStudent: builder.mutation<SingleResponse<Student>, CreateStudentPayload>({
      query: (body) => ({
        url: '/students',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    updateStudent: builder.mutation<
      SingleResponse<Student>,
      { id: string; payload: UpdateStudentPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/students/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
    deleteStudent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
