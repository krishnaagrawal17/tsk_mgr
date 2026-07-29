import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
    } else {
      // By default, Supabase requires email confirmation unless disabled. 
      // Assuming auto-confirm or user will check email. Let's redirect to login.
      alert('Signup successful! Please log in.');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-md">
      <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-xl w-full max-w-[400px]">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm text-center">Create Account</h1>
        <p className="text-on-surface-variant font-body-md text-center mb-xl">Join ZenTask today</p>
        
        {error && (
          <div className="bg-error-container text-on-error-container p-sm rounded-lg mb-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-md">
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-xs">Email</label>
            <input 
              type="email" 
              required
              className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-xs">Password</label>
            <input 
              type="password" 
              required
              className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-outline"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 mt-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-lg text-center text-on-surface-variant font-body-md">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
