'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useLogoutMutation } from '@/store/api/authApi';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { GraduationCap, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';

export function TopNav() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Logged out successfully',
      });
    } catch (e) {
      // Ignore errors on logout
    }
  };

  return (
    <header className="bg-surface border-b border-border py-3 px-6 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary-600 text-white p-1.5 rounded-lg group-hover:bg-primary-700 transition-colors">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-text tracking-tight">FlyNest</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-text-secondary hidden sm:inline-block">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
