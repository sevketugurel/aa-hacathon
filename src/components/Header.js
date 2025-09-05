import React, { useState } from 'react';
import { Search, Bell, User, Coins, Calendar } from 'lucide-react';

const Header = ({ user, notifications, onNotificationClick, onAgendaClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Haber Oyunu</h1>
              <p className="text-xs text-slate-500">Ana Sayfa</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-lg mx-8">
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

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-2 rounded-lg">
            <Coins className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-sm text-slate-700">{user.coins}</span>
          </div>

          <button 
            onClick={onAgendaClick}
            className="p-2.5 text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
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
          
          <div className="flex items-center space-x-3 bg-slate-50 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-medium text-sm text-slate-800">{user.name}</span>
              <div className="text-xs text-slate-500">Seviye {user.level}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
