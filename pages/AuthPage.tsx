import React, { useState } from 'react';
import { useStore } from '../services/StoreContext';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register' | 'forgot';

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
        alert('Password reset link sent to ' + email);
        setMode('login');
        return;
    }
    
    // Simulating authentication
    login(email, role);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
            {mode === 'login' && 'Sign in to Eco Bloom'}
            {mode === 'register' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {mode === 'register' && (
              <div>
                <label className="sr-only">Full Name</label>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm rounded-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm rounded-md"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {mode === 'register' && (
                 <div className="flex items-center space-x-4 mt-2">
                     <span className="text-sm text-gray-600">Register as:</span>
                     <label className="flex items-center space-x-2">
                         <input type="radio" name="role" checked={role === 'customer'} onChange={() => setRole('customer')} />
                         <span className="text-sm">Customer</span>
                     </label>
                     <label className="flex items-center space-x-2">
                         <input type="radio" name="role" checked={role === 'admin'} onChange={() => setRole('admin')} />
                         <span className="text-sm">Admin (Test)</span>
                     </label>
                 </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {mode === 'login' && 'Sign in'}
              {mode === 'register' && 'Register'}
              {mode === 'forgot' && 'Send Reset Link'}
            </button>
          </div>
        </form>

        <div className="flex flex-col space-y-2 text-center text-sm">
            {mode === 'login' && (
                <>
                    <button onClick={() => setMode('register')} className="text-primary hover:text-accent font-medium">Don't have an account? Sign up</button>
                    <button onClick={() => setMode('forgot')} className="text-gray-500 hover:text-gray-700">Forgot your password?</button>
                </>
            )}
             {mode === 'register' && (
                <button onClick={() => setMode('login')} className="text-primary hover:text-accent font-medium">Already have an account? Sign in</button>
            )}
             {mode === 'forgot' && (
                <button onClick={() => setMode('login')} className="text-primary hover:text-accent font-medium">Back to Sign in</button>
            )}
        </div>
      </div>
    </div>
  );
};