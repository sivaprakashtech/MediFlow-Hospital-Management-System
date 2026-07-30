import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff, Shield, Activity, Users, CheckCircle, Stethoscope } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const demoAccounts = [
  { role: 'super_admin' as UserRole, email: 'admin@medflow.com', label: 'Super Admin', icon: Shield, color: 'from-indigo-500 to-purple-600' },
  { role: 'doctor' as UserRole, email: 'doctor@medflow.com', label: 'Doctor', icon: Stethoscope, color: 'from-blue-500 to-cyan-600' },
  { role: 'nurse' as UserRole, email: 'nurse@medflow.com', label: 'Nurse', icon: Heart, color: 'from-pink-500 to-rose-600' },
  { role: 'receptionist' as UserRole, email: 'receptionist@medflow.com', label: 'Receptionist', icon: Users, color: 'from-emerald-500 to-teal-600' },
  { role: 'patient' as UserRole, email: 'patient@medflow.com', label: 'Patient', icon: Activity, color: 'from-amber-500 to-orange-600' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email address'); return; }
    if (!password.trim()) { setError('Please enter your password'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800));
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use one of the quick login options below.');
    }
    setLoading(false);
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const success = await login(demoEmail, 'password');
    if (success) navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background - Hospital image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-950/90 to-indigo-950/95" />
      </div>
      
      {/* Decorative orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />

      {/* Left Panel - Hospital Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative z-10 flex-col justify-between p-12 xl:p-16">
        {/* Top - Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20 shadow-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">MedFlow</h1>
            <p className="text-[10px] text-white/40 font-semibold uppercase tracking-[0.2em]">Enterprise HMS</p>
          </div>
        </motion.div>

        {/* Center - Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-white/70">System operational · 99.9% uptime</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
            Intelligent Hospital<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Management Platform</span>
          </h2>
          <p className="text-base text-white/50 leading-relaxed max-w-md">
            Streamline clinical workflows, optimize resource allocation, and deliver exceptional patient outcomes with AI-powered healthcare operations.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {[
              { icon: Shield, label: 'HIPAA Compliant', desc: 'Enterprise security' },
              { icon: Activity, label: 'Real-time Monitoring', desc: 'Live patient data' },
              { icon: Users, label: '8 Role Access', desc: 'Granular permissions' },
              { icon: CheckCircle, label: 'AI-Powered', desc: 'Predictive insights' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10">
                <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-white/90">{label}</p>
                  <p className="text-[10px] text-white/40">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom - Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-12"
        >
          {[
            { value: '2,847', label: 'Active Patients' },
            { value: '120+', label: 'Specialists' },
            { value: '14', label: 'Departments' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[420px]"
        >
          {/* Glass Card */}
          <div className="bg-white/[0.07] backdrop-blur-2xl rounded-3xl p-8 ring-1 ring-white/10 shadow-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">MedFlow HMS</h1>
                <p className="text-[9px] text-white/40 font-semibold uppercase tracking-[0.15em]">Enterprise Healthcare</p>
              </div>
            </div>

            <div className="mb-7">
              <h2 className="text-xl font-bold text-white tracking-tight">Welcome back</h2>
              <p className="mt-1.5 text-sm text-white/50">Sign in to access the management platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                  role="alert"
                >
                  <p className="text-xs text-red-300 font-medium">{error}</p>
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                    placeholder="name@hospital.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-white/60 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-white/30 hover:text-white/60 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30 focus:ring-offset-0"
                  />
                  <span className="text-xs text-white/50">Remember me</span>
                </label>
                <button type="button" onClick={() => window.location.href = '/forgot-password'} className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Authenticating...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Quick Login */}
            <div className="mt-7 pt-6 border-t border-white/10">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-3">Quick Demo Login</p>
              <div className="grid grid-cols-1 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => handleDemoLogin(account.email)}
                    disabled={loading}
                    className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98] disabled:opacity-40 group"
                  >
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${account.color} flex items-center justify-center shadow-sm`}>
                      <account.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">Login as {account.label}</p>
                      <p className="text-[10px] text-white/30">{account.email}</p>
                    </div>
                    <span className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[11px] text-white/30 mt-6">
            © 2024 MedFlow HMS. Enterprise Healthcare Platform.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
