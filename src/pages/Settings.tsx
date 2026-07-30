import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Palette, Bell, Save, Check } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../components/ui/Toast';
import clsx from 'clsx';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { success, error: showError } = useToast();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });

  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    appointments: true,
    labResults: true,
    lowStock: false,
  });

  const handleSaveProfile = async () => {
    if (!profileForm.name.trim()) { showError('Validation Error', 'Name is required'); return; }
    if (!profileForm.email.trim()) { showError('Validation Error', 'Email is required'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    success('Profile Updated', 'Your profile information has been saved successfully.');
  };

  const handleChangePassword = async () => {
    if (!passwordForm.current) { showError('Validation Error', 'Current password is required'); return; }
    if (passwordForm.newPassword.length < 8) { showError('Validation Error', 'New password must be at least 8 characters'); return; }
    if (passwordForm.newPassword !== passwordForm.confirm) { showError('Validation Error', 'Passwords do not match'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setPasswordForm({ current: '', newPassword: '', confirm: '' });
    success('Password Changed', 'Your password has been updated successfully.');
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    success('Preferences Saved', 'Notification preferences updated.');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your account and preferences" breadcrumb={['Dashboard', 'Settings']} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-700/50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-500/20">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input type="text" value={profileForm.name} onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" value={profileForm.email} onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                  <input type="text" value={profileForm.department} onChange={(e) => setProfileForm(p => ({ ...p, department: e.target.value }))} className="input-field" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSaveProfile} disabled={saving} className="btn-primary gap-2">
                  {saving ? <motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                  <input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm(p => ({ ...p, current: e.target.value }))} className="input-field" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))} className="input-field" placeholder="Minimum 8 characters" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                  <input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm(p => ({ ...p, confirm: e.target.value }))} className="input-field" placeholder="Re-enter new password" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleChangePassword} disabled={saving} className="btn-primary gap-2">
                  {saving ? <motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> : <Lock className="w-4 h-4" />}
                  {saving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Theme Preference</h3>
              <p className="text-sm text-gray-500">Choose how MedFlow appears on your device</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['light', 'dark'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTheme(t); success('Theme Updated', `Switched to ${t} mode.`); }}
                    className={clsx(
                      'relative p-5 rounded-2xl border-2 transition-all text-left',
                      theme === t
                        ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/30 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    )}
                  >
                    {theme === t && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`w-8 h-8 rounded-lg mb-3 ${t === 'light' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-900 border border-gray-700'}`} />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{t} Mode</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t === 'light' ? 'Clean and bright' : 'Easy on the eyes'}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
              <div className="space-y-1">
                {[
                  { key: 'email' as const, label: 'Email Notifications', desc: 'Receive important updates via email' },
                  { key: 'push' as const, label: 'Push Notifications', desc: 'Browser notifications for real-time alerts' },
                  { key: 'appointments' as const, label: 'Appointment Reminders', desc: '30 minutes before scheduled appointments' },
                  { key: 'labResults' as const, label: 'Lab Results', desc: 'Notify when lab results are ready' },
                  { key: 'lowStock' as const, label: 'Low Stock Alerts', desc: 'Pharmacy inventory warnings' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                      className={clsx(
                        'relative w-10 h-5.5 rounded-full transition-colors',
                        notifSettings[item.key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'
                      )}
                      role="switch"
                      aria-checked={notifSettings[item.key]}
                      aria-label={item.label}
                    >
                      <span className={clsx(
                        'absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform',
                        notifSettings[item.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                      )} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSaveNotifications} disabled={saving} className="btn-primary gap-2">
                  {saving ? <motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
