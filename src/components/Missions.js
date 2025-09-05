import React, { useMemo, useState } from 'react';
import { Target, Zap, Sparkles, Share2, CheckCircle, Clock } from 'lucide-react';

const Missions = ({ user, onGrantXP }) => {
  const [claimed, setClaimed] = useState({});

  const missions = useMemo(() => ({
    daily: [
      { id: 'd1', title: '3 haber oku', progress: user.todayReadCount || 0, target: 3, xp: 50 },
      { id: 'd2', title: '1 Hızlı Döngü tamamla', progress: 0, target: 1, xp: 30 },
      { id: 'd3', title: '1 haber paylaş', progress: 0, target: 1, xp: 25 },
    ],
    weekly: [
      { id: 'w1', title: '5 quiz tamamla', progress: 0, target: 5, xp: 150 },
      { id: 'w2', title: '3 farklı kategoriden oku', progress: 0, target: 3, xp: 120 },
    ]
  }), [user.todayReadCount]);

  const canClaim = (m) => m.progress >= m.target && !claimed[m.id];
  const pct = (m) => Math.min((m.progress / m.target) * 100, 100);

  const handleClaim = (m) => {
    if (!canClaim(m)) return;
    setClaimed((c) => ({ ...c, [m.id]: true }));
    onGrantXP && onGrantXP({ xp: m.xp, coins: Math.floor(m.xp / 2) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Görevlerim</h2>
        <div className="text-sm text-slate-600">Seviye {user.level} • {user.xp.toLocaleString()} XP</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <div className="font-semibold text-slate-800">Günlük Görevler</div>
          </div>
          <div className="space-y-4">
            {missions.daily.map((m) => (
              <div key={m.id} className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-slate-800">{m.title}</div>
                  <div className="text-sm font-medium text-amber-700 inline-flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>+{m.xp} XP</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div className="h-2 bg-green-500 rounded-full transition-all" style={{ width: `${pct(m)}%` }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>{m.progress}/{m.target}</span>
                  <button onClick={() => handleClaim(m)} disabled={!canClaim(m)} className={`px-3 py-1.5 rounded text-xs font-medium ${canClaim(m) ? 'bg-green-600 text-white hover:bg-green-700' : claimed[m.id] ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                    {claimed[m.id] ? 'Alındı' : canClaim(m) ? 'Ödülü Al' : 'Devam Et'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <div className="font-semibold text-slate-800">Haftalık Görevler</div>
          </div>
          <div className="space-y-4">
            {missions.weekly.map((m) => (
              <div key={m.id} className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-slate-800">{m.title}</div>
                  <div className="text-sm font-medium text-amber-700 inline-flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>+{m.xp} XP</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div className="h-2 bg-purple-500 rounded-full transition-all" style={{ width: `${pct(m)}%` }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>{m.progress}/{m.target}</span>
                  <button onClick={() => handleClaim(m)} disabled={!canClaim(m)} className={`px-3 py-1.5 rounded text-xs font-medium ${canClaim(m) ? 'bg-purple-600 text-white hover:bg-purple-700' : claimed[m.id] ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-500'}`}>
                    {claimed[m.id] ? 'Alındı' : canClaim(m) ? 'Ödülü Al' : 'Devam Et'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <div className="font-semibold text-slate-800">İpucu</div>
        </div>
        <div className="text-sm text-slate-600">Günlük tüm görevleri tamamlarsan ekstra +50 XP bonus kazanırsın.</div>
      </div>

      <div className="text-xs text-slate-500 text-center">🎯 Görevler, okuma alışkanlıklarına göre yapay zeka ile özelleştirilebilir.</div>
    </div>
  );
};

export default Missions;

