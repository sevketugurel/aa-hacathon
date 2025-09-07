import React from 'react';
import { Heart, Users, Target, BookOpen, Gem } from 'lucide-react';

const tabs = [
  { id: 'feed', label: 'Ana', icon: Heart },
  { id: 'following', label: 'Takip', icon: Users },
  { id: 'missions', label: 'Görev', icon: Target },
  { id: 'collection', label: 'Kart', icon: BookOpen },
  { id: 'premium', label: 'Plus', icon: Gem },
];

const MobileNav = ({ active, onChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-3xl mx-auto grid grid-cols-5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange && onChange(t.id)}
            className={`flex flex-col items-center justify-center py-2 text-xs ${active === t.id ? 'text-slate-900' : 'text-slate-500'}`}
          >
            <t.icon className={`w-5 h-5 mb-0.5 ${active === t.id ? '' : ''}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
