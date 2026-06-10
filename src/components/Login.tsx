import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { Globe, PenTool } from 'lucide-react';

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center select-none relative py-2 ${className}`}>
    <div className="flex items-baseline gap-1 relative z-10">
      <motion.span 
        initial={{ rotate: -15, scale: 0.9 }}
        animate={{ rotate: -12, scale: 1 }}
        className="text-brand-red font-script text-4xl -mb-3 z-20 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
      >
        Let's
      </motion.span>
      <motion.span 
        initial={{ rotate: 5, scale: 0.9 }}
        animate={{ rotate: 2, scale: 1 }}
        className="text-brand-blue font-display text-7xl font-black tracking-tighter uppercase" 
        style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}
      >
        Talk
      </motion.span>
    </div>
    <motion.div 
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-brand-yellow px-6 py-1 rounded-xl border-neo -mt-1 shadow-neo-sm -rotate-1 relative z-0"
    >
      <span className="text-black font-display text-sm font-bold uppercase tracking-widest">English Club</span>
    </motion.div>
  </div>
);

export default function Login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg bg-grid flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl border-neo-lg shadow-neo-lg p-6 sm:p-10 flex flex-col items-center text-center gap-6 sm:gap-8"
      >
        <Logo className="scale-90 sm:scale-100" />
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight font-display mb-2">Welcome Back!</h1>
          <p className="text-gray-500 font-bold text-sm sm:text-base">Sign in to start practicing and earn your credits.</p>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full h-14 sm:h-16 bg-white border-neo rounded-2xl shadow-neo hover:bg-gray-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-3 sm:gap-4 font-black uppercase text-xs sm:text-sm tracking-widest"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
          Sign in with Google
        </button>

        <div className="pt-4 border-t-2 border-gray-100 w-full">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] leading-relaxed">
            Interactive Reading & Vocabulary System
          </p>
        </div>
      </motion.div>
    </div>
  );
}
