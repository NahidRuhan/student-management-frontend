'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '@/store/api/authApi';
import { setUser, setLoading } from '@/store/slices/authSlice';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data: user, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (isLoading) return;
    
    if (user && !isError) {
      dispatch(setUser({ id: user.id, email: user.email }));
    } else {
      // If error or no user, it means we are not logged in.
      // We don't dispatch logout here to prevent clearing valid state if it's a transient error,
      // but we do want to stop loading.
      dispatch(setLoading(false));
    }
  }, [user, isLoading, isError, dispatch]);

  // We can render children immediately. The auth state will just update in Redux.
  // We want to keep the app responsive.
  return <>{children}</>;
}
