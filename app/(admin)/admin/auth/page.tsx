'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { toast } from 'sonner';

import { loginAdmin,registerAdmin } from '@/app/actions/auth/admin-auth';

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    fullName?: string[];
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');

    setErrors({});

    setShowPassword(false);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      setErrors({});

      if (isLogin) {
        const result = await loginAdmin({
          email,
          password,
        });

        if (!result.success) {
          if (result.errors) {
            setErrors(result.errors);
            return;
          }

          toast.error(result.message);
          return;
        }

        toast.success('Login berhasil');

        window.location.href = '/admin';
      } else {
        const result = await registerAdmin({
          fullName,
          email,
          password,
        });

        if (!result.success) {
          if (result.errors) {
            setErrors(result.errors);
            return;
          }

          toast.error(result.message);
          return;
        }

        toast.success(
          'Admin berhasil didaftarkan'
        );

        setIsLogin(true);

        setFullName('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error(error);

      toast.error(
        'Terjadi kesalahan. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-120"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-sm font-bold text-accent uppercase tracking-[0.4em] mb-2">
            Internal Dashboard
          </h2>

          <h1 className="text-4xl font-black text-primary tracking-tight">
            LAPOR
            <span className="text-accent underline decoration-4 underline-offset-4">
              AJA
            </span>
          </h1>
        </div>

        {/* Main Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-accent/20 via-primary/10 to-accent/20 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

          <div className="relative bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[38px] p-8 sm:p-12 shadow-2xl overflow-hidden">
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {isLogin
                  ? 'Selamat Datang'
                  : 'Pendaftaran Admin'}
              </h3>

              <p className="text-gray-500 text-sm font-light">
                {isLogin
                  ? 'Masuk ke portal kendali pusat'
                  : 'Buat kredensial administrator baru'}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name"
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="space-y-2"
                  >
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                      <input
                        required={!isLogin}
                        type="text"
                        placeholder="Nama Lengkap Admin"
                        value={fullName}
                        onChange={(e) =>
                          setFullName(
                            e.target.value
                          )
                        }
                        className="w-full bg-surface/50 border-2 border-transparent focus:border-accent/40 focus:bg-white pl-14 pr-4 py-4 rounded-2xl focus:outline-none transition-all font-semibold text-sm placeholder:text-gray-400 placeholder:font-normal"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-xs mt-2 px-1 font-medium">
                            {errors.fullName[0]}
                          </p>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  required
                  type="email"
                  placeholder="Email Dashboard"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full bg-surface/50 border-2 border-transparent focus:border-accent/40 focus:bg-white pl-14 pr-4 py-4 rounded-2xl focus:outline-none transition-all font-semibold text-sm placeholder:text-gray-400 placeholder:font-normal"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2 px-1 font-medium">
                    {errors.email[0]}
                  </p>
                )}
              </div>

              <div className="relative">
                
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  required
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Kata Sandi Unit"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-surface/50 border-2 border-transparent focus:border-accent/40 focus:bg-white pl-14 pr-14 py-4 rounded-2xl focus:outline-none transition-all font-semibold text-sm placeholder:text-gray-400 placeholder:font-normal"
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-2 px-1 font-medium">
                    {errors.password[0]}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className={cn(
                  'w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary/95 transition-all disabled:opacity-50'
                )}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>
                      {isLogin
                        ? 'Otorisasi Masuk'
                        : 'Konfirmasi Daftar'}
                    </span>

                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)

                  resetForm()
                }}
                className="text-[11px] font-black text-accent uppercase tracking-widest hover:text-primary transition-colors"
              >
                {isLogin ? (
                  <>
                    Butuh Akses Baru?{' '}
                    <span className="underline decoration-2 underline-offset-4">
                      Daftar Akun
                    </span>
                  </>
                ) : (
                  <>
                    Sudah Terdaftar?{' '}
                    <span className="underline decoration-2 underline-offset-4">
                      Masuk Kembali
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}