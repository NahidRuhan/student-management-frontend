import { useState, useCallback } from 'react';
import { StudentQueryParams } from '@/types/student';

export function useStudentFilters() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);

  const queryParams: StudentQueryParams = { page, limit: 10 };
  if (search) queryParams.search = search;
  if (status) queryParams.status = status as StudentQueryParams['status'];
  if (studentClass) queryParams.class = studentClass;
  if (sortBy) queryParams.sortBy = sortBy as StudentQueryParams['sortBy'];
  if (sortOrder) queryParams.sortOrder = sortOrder as StudentQueryParams['sortOrder'];

  const handleSearch = useCallback((s: string) => { setSearch(s); setPage(1); }, []);
  const handleStatusChange = useCallback((s: string) => { setStatus(s); setPage(1); }, []);
  const handleClassChange = useCallback((c: string) => { setStudentClass(c); setPage(1); }, []);
  const handleSortByChange = useCallback((val: string) => { setSortBy(val); setPage(1); }, []);
  const handleSortOrderChange = useCallback((val: string) => { setSortOrder(val); setPage(1); }, []);
  const handleClear = useCallback(() => {
    setSearch('');
    setStatus('');
    setStudentClass('');
    setSortBy('');
    setSortOrder('');
    setPage(1);
  }, []);

  return {
    search,
    status,
    studentClass,
    sortBy,
    sortOrder,
    page,
    setPage,
    queryParams,
    handleSearch,
    handleStatusChange,
    handleClassChange,
    handleSortByChange,
    handleSortOrderChange,
    handleClear,
  };
}
