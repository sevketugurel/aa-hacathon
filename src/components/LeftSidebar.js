import React, { useState } from 'react';
import { Heart, TrendingUp, Users, BookOpen, Target, Trophy, Bookmark, Settings, User, Crown, Flame, Gem } from 'lucide-react';

const LeftSidebar = ({ user, activeSection, setActiveSection }) => {
  const [showMore, setShowMore] = useState(false);
  const menuItems = [
    { id: 'feed', label: 'Ana Sayfa', icon: Heart },
    { id: 'trending', label: 'Trend Haberler', icon: TrendingUp, badge: '12' },
    { id: 'following', label: 'Takip Ettiklerim', icon: Users, badge: '5' },
    { id: 'collection', label: 'Koleksiyonum', icon: BookOpen, badge: user.collectedCards.toString() },
    { id: 'missions', label: 'Görevlerim', icon: Target, badge: '3' },
    { id: 'leagues', label: 'Lig Sistemi', icon: Trophy, badge: 'NEW' },
    { id: 'premium', label: 'Premium', icon: Gem, badge: '⭐' },
    { id: 'topics', label: 'Konu Takibi', icon: Bookmark },
    { id: 'settings', label: 'Ayarlar', icon: Settings }
  ];

  const [expandDetails, setExpandDetails] = useState(false);

  return (
    <aside className="w-full h-full bg-white">
      <div className="p-6 sticky top-0">
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">{user.name}</h3>
              <p className="text-sm text-slate-600">{user.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">#{user.rank}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Seviye</span>
              <span className="font-semibold text-slate-800">{user.level}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-slate-600 to-slate-700 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 100)}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-center">
                <div className="font-semibold text-slate-800">{user.xp.toLocaleString()}</div>
                <div className="text-xs text-slate-600">XP</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-slate-800">{user.collectedCards}</div>
                <div className="text-xs text-slate-600">Kart</div>
              </div>
            </div>
            
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-slate-700">{user.streak} gün</span>
                </div>
                <div className="text-xs text-slate-500">seri</div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">Günlük Hedef</span>
                  <span className="text-xs text-slate-700 font-medium">{user.todayReadCount}/{user.dailyGoal}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((user.todayReadCount / user.dailyGoal) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <button onClick={() => setExpandDetails(!expandDetails)} className="w-full text-xs text-slate-600 hover:text-slate-800 text-left">{expandDetails ? 'Daha az bilgi' : 'Daha fazla bilgi'}</button>

              <div className={`overflow-hidden transition-all ${expandDetails ? 'max-h-40' : 'max-h-0'}`}>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div className="bg-white rounded border border-slate-200 p-2">
                    <div className="text-sm font-semibold text-slate-800">{user.weekly?.reads || 0}</div>
                    <div className="text-[11px] text-slate-600">Haftalık Okuma</div>
                  </div>
                  <div className="bg-white rounded border border-slate-200 p-2">
                    <div className="text-sm font-semibold text-slate-800">{user.weekly?.cards || 0}</div>
                    <div className="text-[11px] text-slate-600">Kart</div>
                  </div>
                  <div className="bg-white rounded border border-slate-200 p-2">
                    <div className="text-sm font-semibold text-slate-800">{user.weekly?.xp || 0}</div>
                    <div className="text-[11px] text-slate-600">XP</div>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-600">Hedef: {user.weekly?.goal?.target || 0} haber/hafta</div>
              </div>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.slice(0,6).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                activeSection === item.id
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          {!showMore && menuItems.length > 6 && (
            <button onClick={() => setShowMore(true)} className="w-full mt-2 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg">Daha Fazlasını Göster</button>
          )}
          {showMore && (
            <div className="mt-2 space-y-1">
              {menuItems.slice(6).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === item.id
                      ? 'bg-slate-100 text-slate-900 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              <button onClick={() => setShowMore(false)} className="w-full mt-2 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg">Daha Az Göster</button>
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;
