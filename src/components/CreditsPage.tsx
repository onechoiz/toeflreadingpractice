import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, ShoppingBag, CreditCard, CheckCircle2, ArrowRight, MessageSquare, Loader2, X } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../lib/authContext';

const PACKAGES = [
  { id: 'p1', amount: 100, price: '3,000', currency: 'AMD', color: 'bg-brand-blue', description: 'Perfect for a week of intense practice.' },
  { id: 'p2', amount: 300, price: '6,000', currency: 'AMD', color: 'bg-brand-yellow', description: 'Most popular! Save 3000 AMD vs Basic.', featured: true },
  { id: 'p3', amount: 500, price: '10,000', currency: 'AMD', color: 'bg-brand-red', description: 'Best value for long-term learners.' },
];

interface CreditsPageProps {
  hasPendingRequest: boolean;
  onCancelRequest: () => void;
  isCancelling: boolean;
}

export default function CreditsPage({ hasPendingRequest, onCancelRequest, isCancelling }: CreditsPageProps) {
  const { user } = useAuth();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handlePurchaseRequest = async (pkg: typeof PACKAGES[0]) => {
    if (!user || hasPendingRequest) return;
    setLoadingId(pkg.id);
    try {
      await addDoc(collection(db, 'requests'), {
        userId: user.uid,
        userEmail: user.email,
        amount: pkg.amount,
        packageName: `${pkg.amount} Credits Package`,
        price: `${pkg.price} ${pkg.currency}`,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSuccessMsg(`Request for ${pkg.amount} credits sent! Admin will contact you for payment.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'requests');
    }
    setLoadingId(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg bg-grid p-6 sm:p-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-2xl border-neo shadow-neo font-black uppercase tracking-widest text-sm"
          >
            <Zap size={20} className="text-brand-yellow fill-brand-yellow" />
            Pricing Plans
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight font-display text-black">
            Fuel Your <span className="text-brand-red" style={{ WebkitTextStroke: '2px black' }}>Learning</span>
          </h1>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto text-lg">
            Vocabulary sets cost 20 credits, while Everyday and Academic sets cost only 10. Choose a package below to keep practicing.
          </p>
        </header>

        {successMsg && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-green-500 text-white p-6 rounded-3xl border-neo shadow-neo font-black uppercase tracking-widest text-center flex items-center justify-center gap-4"
          >
            <CheckCircle2 size={24} /> {successMsg}
          </motion.div>
        )}

        {hasPendingRequest && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-brand-blue/10 border-neo-lg p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-neo-sm"
          >
            <div className="flex items-center gap-6">
              <div className="bg-brand-blue text-white w-16 h-16 rounded-2xl flex items-center justify-center border-neo shadow-neo rotate-3">
                <Loader2 size={32} className="animate-spin" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black uppercase tracking-tight font-display">Request Pending</h3>
                <p className="font-bold text-gray-500">You have an active request. Please wait for admin approval before placing a new one.</p>
              </div>
            </div>
            <button 
              onClick={onCancelRequest}
              disabled={isCancelling}
              className="bg-white text-brand-red px-8 py-4 rounded-2xl border-neo shadow-neo font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Request'} <X size={20} />
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {PACKAGES.map((pkg, idx) => (
            <motion.div 
              key={pkg.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white rounded-[2.5rem] border-neo-lg shadow-neo-lg p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2 ${pkg.featured ? 'md:scale-110 z-10' : ''}`}
            >
              {pkg.featured && (
                <div className="absolute -top-5 bg-black text-white px-6 py-2 rounded-xl border-neo font-black uppercase tracking-[0.2em] text-[10px] shadow-neo rotate-2">
                  Best Value
                </div>
              )}

              <div className={`${pkg.color} w-20 h-20 rounded-[1.5rem] border-neo shadow-neo flex items-center justify-center mb-8`}>
                <ShoppingBag size={32} className="text-white" />
              </div>

              <div className="mb-6">
                <h2 className="text-5xl font-black font-display text-black tracking-tighter">{pkg.amount}</h2>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Credits</p>
              </div>

              <div className="w-full h-px bg-gray-100 mb-6" />

              <p className="text-sm font-bold text-gray-500 mb-8 min-h-[48px]">
                {pkg.description}
              </p>

              <div className="mb-10">
                <p className="text-sm font-black uppercase tracking-widest text-gray-400 leading-none">Price</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-black">{pkg.price}</span>
                  <span className="text-sm font-black uppercase">{pkg.currency}</span>
                </div>
              </div>

              <button 
                onClick={() => handlePurchaseRequest(pkg)}
                disabled={loadingId !== null || hasPendingRequest}
                className={`w-full py-5 rounded-2xl border-neo shadow-neo font-black uppercase tracking-widest transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-3 ${
                  hasPendingRequest 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200 shadow-none' 
                    : pkg.featured 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {loadingId === pkg.id ? 'Processing...' : hasPendingRequest ? 'Wait for Approval' : (
                  <>Order Now <ArrowRight size={20} /></>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <section className="bg-white rounded-3xl border-neo-lg shadow-neo-lg p-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <h3 className="text-3xl font-black uppercase tracking-tight font-display flex items-center gap-4">
              <MessageSquare size={32} className="text-brand-blue" /> Need Help?
            </h3>
            <p className="font-bold text-gray-500">
              Payments are currently processed manually. After placing an order, our admin will verify the transfer and update your credits within 2-4 hours.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-50 p-6 rounded-2xl border-neo shadow-neo-sm font-mono font-black text-xs text-center">
              ID: {user?.uid.substring(0,8).toUpperCase()}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
