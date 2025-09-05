import React, { useState } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Calendar, Award } from 'lucide-react';

const LeagueSystem = () => {
  const [activeTab, setActiveTab] = useState('current');

  const leagues = [
    { name: 'Bronz', color: 'from-amber-600 to-amber-700', minXP: 0, maxXP: 999 },
    { name: 'Gümüş', color: 'from-slate-400 to-slate-500', minXP: 1000, maxXP: 2499 },
    { name: 'Altın', color: 'from-yellow-400 to-yellow-500', minXP: 2500, maxXP: 4999 },
    { name: 'Platin', color: 'from-cyan-400 to-cyan-500', minXP: 5000, maxXP: 9999 },
    { name: 'Elmas', color: 'from-blue-400 to-blue-600', minXP: 10000, maxXP: 19999 },
    { name: 'Master', color: 'from-purple-400 to-purple-600', minXP: 20000, maxXP: 49999 },
    { name: 'Grandmaster', color: 'from-red-400 to-red-600', minXP: 50000, maxXP: 99999 },
    { name: 'Challenger', color: 'from-gradient-to-r from-yellow-400 via-red-500 to-pink-500', minXP: 100000, maxXP: 999999 }
  ];

  const currentUserXP = 1247;
  const currentLeague = leagues.find(league => currentUserXP >= league.minXP && currentUserXP <= league.maxXP);
  const nextLeague = leagues.find(league => league.minXP > currentUserXP);

  const leaderboard = [
    { rank: 1, name: 'Elif Kaya', avatar: '👩‍💼', xp: 15420, league: 'Elmas', streak: 45, badge: 'crown' },
    { rank: 2, name: 'Mehmet Özkan', avatar: '👨‍🔬', xp: 14230, league: 'Elmas', streak: 32, badge: 'medal' },
    { rank: 3, name: 'Ayşe Demir', avatar: '👩‍💻', xp: 13850, league: 'Elmas', streak: 28, badge: 'medal' },
    { rank: 4, name: 'Murat Aydın', avatar: '👨‍💻', xp: 12900, league: 'Altın', streak: 25, badge: 'star' },
    { rank: 5, name: 'Zeynep Çelik', avatar: '👩‍🎓', xp: 11750, league: 'Altın', streak: 22, badge: 'star' },
    { rank: 156, name: 'Ahmet Yılmaz (Sen)', avatar: '👤', xp: 1247, league: 'Gümüş', streak: 12, badge: null, isCurrentUser: true }
  ];

  const badges = [
    { id: 'early_bird', name: 'Erken Kuş', description: '7 günlük sabah haberi okuma', icon: '🌅', unlocked: true },
    { id: 'quiz_master', name: 'Quiz Ustası', description: '50 quiz\'i mükemmel tamamla', icon: '🧠', unlocked: true },
    { id: 'social_butterfly', name: 'Sosyal Kelebek', description: '100 haber paylaş', icon: '🦋', unlocked: false },
    { id: 'night_owl', name: 'Gece Kuşu', description: 'Gece 12\'den sonra 30 haber oku', icon: '🦉', unlocked: false },
    { id: 'streak_master', name: 'Seri Ustası', description: '30 günlük okuma serisi', icon: '🔥', unlocked: false },
    { id: 'fact_checker', name: 'Doğruluk Kontrolcüsü', description: 'AI özetleri 200 kez kullan', icon: '✅', unlocked: true },
    { id: 'voice_lover', name: 'Ses Tutkunu', description: '100 haberi sesli dinle', icon: '🎧', unlocked: false },
    { id: 'collector', name: 'Koleksiyoncu', description: '500 nadir kart topla', icon: '💎', unlocked: false }
  ];

  const seasonStats = {
    currentSeason: "Sonbahar 2024",
    daysLeft: 23,
    totalParticipants: 47832,
    userRank: 156,
    seasonXP: 1247,
    dailyAverage: 89
  };

  const renderLeagueIcon = (league) => {
    const iconProps = { className: "w-6 h-6" };
    switch(league.name) {
      case 'Challenger': return <Crown {...iconProps} className="w-6 h-6 text-yellow-400" />;
      case 'Grandmaster': return <Award {...iconProps} className="w-6 h-6 text-red-500" />;
      case 'Master': return <Trophy {...iconProps} className="w-6 h-6 text-purple-500" />;
      case 'Elmas': return <Medal {...iconProps} className="w-6 h-6 text-blue-500" />;
      case 'Platin': return <Star {...iconProps} className="w-6 h-6 text-cyan-500" />;
      default: return <Trophy {...iconProps} className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Lig Sistemi</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'current' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Mevcut Lig
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'leaderboard' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lider Tablosu
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'badges' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Rozetler
          </button>
        </div>
      </div>

      {activeTab === 'current' && (
        <div className="space-y-6">
          {/* Current League Status */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border">
            <div className="flex items-center space-x-4 mb-4">
              {renderLeagueIcon(currentLeague)}
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{currentLeague.name} Ligi</h3>
                <p className="text-slate-600">{currentLeague.minXP.toLocaleString()} - {currentLeague.maxXP.toLocaleString()} XP</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Mevcut XP: {currentUserXP.toLocaleString()}</span>
                {nextLeague && <span>Sonraki: {nextLeague.name} ({nextLeague.minXP.toLocaleString()} XP)</span>}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: nextLeague 
                      ? `${((currentUserXP - currentLeague.minXP) / (nextLeague.minXP - currentLeague.minXP)) * 100}%`
                      : '100%'
                  }}
                />
              </div>
            </div>

            {nextLeague && (
              <div className="text-sm text-slate-600">
                <span className="font-medium">{nextLeague.name}</span> ligine terfi etmek için 
                <span className="font-bold text-blue-600"> {(nextLeague.minXP - currentUserXP).toLocaleString()} XP</span> daha kazanmalısın!
              </div>
            )}
          </div>

          {/* Season Info */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-800">Sezon Bilgileri</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{seasonStats.daysLeft}</div>
                <div className="text-xs text-blue-700">Gün Kaldı</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">#{seasonStats.userRank}</div>
                <div className="text-xs text-green-700">Sıralama</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{seasonStats.seasonXP.toLocaleString()}</div>
                <div className="text-xs text-purple-700">Sezon XP</div>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{seasonStats.dailyAverage}</div>
                <div className="text-xs text-amber-700">Günlük Ort.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-slate-800">Haftalık Lider Tablosu</h4>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {seasonStats.totalParticipants.toLocaleString()} aktif oyuncu arasında sıralama
            </p>
          </div>
          
          <div className="space-y-2 p-6">
            {leaderboard.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                  user.isCurrentUser 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : 'hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {user.rank <= 3 ? (
                    user.rank === 1 ? <Crown className="w-5 h-5 text-yellow-500" /> :
                    user.rank === 2 ? <Medal className="w-5 h-5 text-slate-400" /> :
                    <Medal className="w-5 h-5 text-amber-600" />
                  ) : (
                    <span className="font-bold text-slate-600">#{user.rank}</span>
                  )}
                </div>
                
                <div className="text-2xl">{user.avatar}</div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${user.isCurrentUser ? 'text-blue-800' : 'text-slate-800'}`}>
                      {user.name}
                    </span>
                    {user.badge && (
                      <span className="text-xs">
                        {user.badge === 'crown' && '👑'}
                        {user.badge === 'medal' && '🏅'}
                        {user.badge === 'star' && '⭐'}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-600">
                    {user.league} • {user.streak} gün seri
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-slate-800">{user.xp.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="text-sm text-slate-600">
            <span className="font-medium">{badges.filter(b => b.unlocked).length}</span> / {badges.length} rozet kazanıldı
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`p-4 rounded-xl border-2 transition-all ${
                  badge.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className={`font-semibold ${badge.unlocked ? 'text-green-800' : 'text-slate-600'}`}>
                      {badge.name}
                    </h4>
                    {badge.unlocked && (
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <Award className="w-3 h-3" />
                        <span>Kazanıldı</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${badge.unlocked ? 'text-green-700' : 'text-slate-500'}`}>
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueSystem;