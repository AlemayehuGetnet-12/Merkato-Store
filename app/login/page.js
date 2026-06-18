"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Registration views
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      console.log("Signing in:", { email, password, keepSignedIn });
    } else {
      console.log("Registering:", { fullName, email, password, agreeToTerms });
    }
    
    setLoading(false);
  };

  // 1. LOGIN LAYOUT (With Members Get More Box)
  if (isLogin) {
    return (
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center py-12 lg:py-20">
        
        {/* Members Get More Box */}
        <div className="md:col-span-5 bg-linear-to-br from-[#005A36] via-[#01683E] to-[#7CB75D] rounded-[2rem] p-10 text-white flex flex-col justify-between shadow-xs min-h-115 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[24px_24px]" />

          <div className="relative z-10">
            <span className="inline-block bg-white/15 backdrop-blur-md text-4 font-bold tracking-wider px-3 py-1.5 rounded-full mb-6 uppercase text-white/90">
              MEMBERS GET MORE
            </span>
            <h2 className="text-3xl lg:text-[2rem] font-extrabold leading-[1.2] tracking-tight mb-8">
              Sign in to unlock app-only deals & faster checkout.
            </h2>
          </div>

          <ul className="space-y-4 text-xs font-semibold opacity-95 relative z-10 list-none p-0 m-0">
            <li className="flex items-center gap-2.5">
              <span className="text-sm font-bold">✓</span>
              <span>Saved addresses & payment methods</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-sm font-bold">✓</span>
              <span>Order tracking with live updates</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-sm font-bold">✓</span>
              <span>Loyalty points on every purchase</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-sm font-bold">✓</span>
              <span>Personalised recommendations</span>
            </li>
          </ul>
        </div>

        {/* Login Form Container */}
        <div className="md:col-span-7 max-w-md w-full mx-auto md:ml-auto md:mr-0">
          <div className="mb-6">
            <h1 className="text-[2rem] lg:text-[2.25rem] font-black text-[#0A1828] tracking-tight mb-1.5">Welcome back</h1>
            <p className="text-gray-400 text-sm font-medium tracking-wide">Sign in to your Merkato account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">EMAIL</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="h-4 w-4" /></span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-gray-800 placeholder-gray-300"
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-gray-400 tracking-widest uppercase">PASSWORD</label>
                <a href="#" className="text-xs font-bold text-[#005A36] hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="h-4 w-4" /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-gray-800 placeholder-gray-300"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepSignedIn"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="h-4 w-4 accent-[#005A36] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="keepSignedIn" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#005A36] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#004428] transition-colors shadow-sm disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Centered Google Login Button */}
          <div className="mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50/50 transition font-medium text-sm text-gray-800"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            New to Merkato?{' '}
            <button type="button" onClick={() => setIsLogin(false)} className="font-bold text-[#005A36] hover:underline cursor-pointer">
              Create an account
            </button>
          </p>
        </div>
      </div>
    );
  }

  // 2. REGISTRATION LAYOUT (Clean, Fully Centered without Side Box)
  return (
    <div className="flex-1 w-full flex items-center justify-center py-12 lg:py-20 px-6">
      <div className="max-w-md w-full mx-auto">
        
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-[2rem] lg:text-[2.25rem] font-black text-[#0A1828] tracking-tight mb-1.5">Create your account</h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Join 2M+ shoppers across Africa & the Middle East.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">FULL NAME</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><User className="h-4 w-4" /></span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-gray-800 placeholder-gray-300"
                placeholder="your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">EMAIL</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="h-4 w-4" /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-gray-800 placeholder-gray-300"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 tracking-widest mb-2 uppercase">PASSWORD</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="h-4 w-4" /></span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm text-gray-800 placeholder-gray-300"
                placeholder="At least 8 characters"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 accent-[#005A36] border-gray-300 rounded cursor-pointer"
              required
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-400 cursor-pointer select-none">
              I agree to the{' '}
              <a href="#" className="font-bold text-[#005A36] hover:underline">Terms</a>
              {' '}&{' '}
              <a href="#" className="font-bold text-[#005A36] hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#005A36] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#004428] transition-colors shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        {/* Centered Google Registration Button */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50/50 transition font-medium text-sm text-gray-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Already a member?{' '}
          <button type="button" onClick={() => setIsLogin(true)} className="font-bold text-[#005A36] hover:underline cursor-pointer">
            Sign in
          </button>
        </p>

      </div>
    </div>
  );
}