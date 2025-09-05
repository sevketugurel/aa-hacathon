import React from 'react';
import { Trophy, BarChart3, TrendingUp, ChevronRight, Target, Plus, Minus } from 'lucide-react';
import { trendingTopics } from '../data/mockData';

const RightSidebar = ({ user, onUpdateGoal }) => {
  const topComments = [
    {
      user: "Ece A.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      comment: "Rüzgar santrallerinin payı artmış, bu iyi haber!",
      newsTitle: "Yenilenebilir Enerji Hamlesinde...",
      time: "1 saat önce"
    },
    {
      user: "Deniz T.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b0e8?w=32&h=32&fit=crop&crop=face",
      comment: "Finale kalan girişimler hangileri? Linki var mı?",
      newsTitle: "Yapay Zeka Teknolojilerinde...",
      time: "30 dk önce"
    }
  ];

  return (
    <aside className="w-full h-full bg-white">
      <div className="p-6 space-y-6">
        
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Trophy className="w-4 h-4" />
            <span>Öne Çıkan Yorumlar</span>
          </h3>
          <div className="space-y-3">
            {topComments.map((comment, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <img src={comment.avatar} alt={comment.user} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium text-slate-800">{comment.user}</span>
                  <span className="text-xs text-slate-500">{comment.time}</span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{comment.comment}</p>
                <p className="text-xs text-slate-500 truncate">{comment.newsTitle}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Haftalık İstatistiklerin</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border border-slate-100">
              <div className="text-2xl font-bold text-slate-800">{user.weekly.reads}</div>
              <div className="text-xs text-slate-600">Okunan Haber</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-slate-100">
              <div className="text-2xl font-bold text-slate-800">{user.weekly.cards}</div>
              <div className="text-xs text-slate-600">Toplanan Kart</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-slate-100">
              <div className="text-2xl font-bold text-slate-800">{user.weekly.xp}</div>
              <div className="text-xs text-slate-600">Kazanılan XP</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-slate-100">
              <div className="text-2xl font-bold text-slate-800">{user.weekly.quizzes}</div>
              <div className="text-xs text-slate-600">Tamamlanan Quiz</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Haftalık Hedef</span>
          </h3>
          <div className="mb-3 text-sm text-slate-700">Bu hafta {user.weekly.goal.target} haber okuma hedefi.</div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${Math.min((user.weekly.reads / user.weekly.goal.target) * 100, 100)}%` }} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-slate-600">{user.weekly.reads}/{user.weekly.goal.target} tamamlandı</div>
            <div className="flex items-center gap-2">
              <button onClick={() => onUpdateGoal(Math.max(1, user.weekly.goal.target - 1))} className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50"><Minus className="w-4 h-4" /></button>
              <button onClick={() => onUpdateGoal(user.weekly.goal.target + 1)} className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Trend Konular</span>
          </h3>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium text-slate-800">{topic.topic}</div>
                  <div className="text-sm text-slate-600">{topic.count} okuma</div>
                </div>
                <div className="text-sm font-medium text-green-600">{topic.trend}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Editör Seçkisi</h3>
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">Günün öne çıkan analizini kaçırma: Enerji dönüşümünde yeni adımlar.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <p className="text-sm text-slate-700">AI dünyasında haftanın özetini 60 saniyede dinle.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Hızlı İşlemler</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">Günün AI Özeti</div>
                  <div className="text-sm text-slate-600">En önemli haberlerin yapay zeka özeti</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
            <button className="w-full text-left p-4 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">Haftalık Rapor</div>
                  <div className="text-sm text-slate-600">Okuma alışkanlıklarınız</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
