import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Mail, Smartphone, Globe } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    marketing: true,
  });

  const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans pb-24">
      <nav className="sticky top-0 z-40 bg-[#F9F9FB]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5 px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
        <span className="text-[16px] font-semibold tracking-tight">Notifications</span>
        <div className="w-9" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] border border-neutral-200/60 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-100 dark:border-white/5">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-neutral-400" />
              Preferences
            </h2>
            <p className="text-sm text-neutral-500 mt-1">Control how you want to be notified about events.</p>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-white/5">
            <NotificationToggle 
              icon={<Mail className="w-5 h-5" />} 
              title="Email Notifications" 
              desc="Receive ticket confirmations and updates via email."
              enabled={settings.email}
              onToggle={() => toggle('email')}
            />
            <NotificationToggle 
              icon={<Smartphone className="w-5 h-5" />} 
              title="Push Notifications" 
              desc="Get instant alerts on your mobile device."
              enabled={settings.push}
              onToggle={() => toggle('push')}
            />
            <NotificationToggle 
              icon={<Globe className="w-5 h-5" />} 
              title="Marketing Updates" 
              desc="Occasional news and special offers."
              enabled={settings.marketing}
              onToggle={() => toggle('marketing')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const NotificationToggle = ({ icon, title, desc, enabled, onToggle }) => (
  <div className="p-6 flex items-center justify-between">
    <div className="flex gap-4">
      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-300">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-neutral-500 max-w-[200px]">{desc}</p>
      </div>
    </div>
    <button 
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white dark:bg-black rounded-full transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  </div>
);

export default Notifications;
