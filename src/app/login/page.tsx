'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/store/api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const performLogin = async (loginEmail: string, loginPass: string) => {
    try {
      const user = await login({ email: loginEmail, password: loginPass }).unwrap();
      dispatch(setUser({ id: user.id, email: user.email }));
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Logged in successfully',
      });
      router.push('/');
    } catch (err: any) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'error',
        title: err?.data?.message || 'Invalid credentials',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performLogin(email, password);
  };

  const handleDemoLogin = async () => {
    const demoEmail = 'admin@flynest.com';
    const demoPass = 'asdf1234';
    setEmail(demoEmail);
    setPassword(demoPass);
    await performLogin(demoEmail, demoPass);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl border border-border shadow-sm">
        <h1 className="text-2xl font-bold text-text mb-2">Welcome Back</h1>
        <p className="text-text-secondary mb-6">Log in to manage your students.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full mt-2" 
            onClick={handleDemoLogin} 
            disabled={isLoading}
          >
            Demo Login
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
