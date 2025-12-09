import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { ArrowLeft, Command } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom'; // Assuming you use react-router

export const AuthPage = () => {
  const [view, setView] = useState('login'); // 'login' | 'register'

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-orange-50/30 relative overflow-hidden">
      {/* 1. Background Pattern */}
      {/* <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{
             backgroundImage: 'radial-gradient(#fb923c 1px, transparent 1px)',
             backgroundSize: '32px 32px'
           }} 
      /> */}
      
      {/* 2. Abstract Background Blobs for visual interest */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-200/40 rounded-full blur-3xl" />

      {/* 3. Navigation (Back to Home) */}
      {/* <div className="absolute top-6 left-6 z-20">
        <Link to="/">
          <Button variant="ghost" className="gap-2 hover:bg-white/50">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div> */}

      {/* 4. Main Card Container */}
      <div className="w-full max-w-md z-10 p-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          
          {/* Header / Logo Section */}
          <div className="pt-8 pb-4 text-center">
            {/* <div className="mx-auto w-12 h-12 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg mb-4 text-white">
              <Command className="w-6 h-6" />
            </div> */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {view === 'login' ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {view === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Enter your information to get started'}
            </p>
          </div>

          {/* Form Section with Animation */}
          <div className="p-6 pt-0">
            <div className="transition-all duration-300 ease-in-out">
              {view === 'login' ? (
                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                  <LoginForm onSwitchToRegister={() => setView('register')} />
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <RegisterForm onSwitchToLogin={() => setView('login')} />
                </div>
              )}
            </div>
          </div>
          
          {/* Footer / Terms (Optional) */}
          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-gray-400">
              By clicking continue, you agree to our{' '}
              <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and{' '}
              <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};