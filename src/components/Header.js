import React, { useState } from 'react';
import { Search, Bell, User, Coins, Calendar } from 'lucide-react';

const Header = ({ user, notifications, onNotificationClick, onAgendaClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 fixed top-0 left-0 right-0 z-50 h-14">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img src="/aa-logo-amblem.png" alt="Anadolu Ajansı" className="w-9 h-9 object-contain rounded" />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-slate-800 whitespace-nowrap">Anadolu Ajansı</h1>
              <p className="hidden sm:block text-xs text-slate-500">Ana Sayfa</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:block flex-1 max-w-lg mx-2 sm:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Haberlerde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent bg-slate-50/50"
            />
          </div>
        </div>
        <button className="sm:hidden p-2.5 text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-slate-100 px-3 py-2 rounded-lg">
            <Coins className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-sm text-slate-700">{user.coins}</span>
          </div>
          <button onClick={onAgendaClick} className="hidden sm:inline-flex p-2.5 text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors">
            <Calendar className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onNotificationClick}
            className="relative p-2.5 text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <div className="hidden md:flex items-center space-x-3 bg-slate-50 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-medium text-sm text-slate-800">{user.name}</span>
              <div className="text-xs text-slate-500">Seviye {user.level}</div>
            </div>
          </div>

          {/* mobile quick profile */}
          <button className="md:hidden p-2.5 text-slate-600 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors" aria-label="Profil">
            <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
