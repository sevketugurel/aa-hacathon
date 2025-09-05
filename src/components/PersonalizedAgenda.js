import React, { useState, useEffect } from 'react';
import { Brain, Calendar, Clock, TrendingUp, User, Zap, Target, Star, Sparkles, ChevronRight } from 'lucide-react';

const PersonalizedAgenda = ({ user, articles, isOpen, onClose, onArticleClick }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');
  const [agendaData, setAgendaData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && !agendaData) {
      generatePersonalizedAgenda();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const timeSlots = {
    morning: {
      label: 'Sabah (07:00 - 12:00)',
      icon: '🌅',
      focus: 'Güncel Haberler & Analiz'
    },
    afternoon: {
      label: 'Öğleden Sonra (12:00 - 18:00)', 
      icon: '☀️',
      focus: 'Derinlemesine İçerik'
    },
    evening: {
      label: 'Akşam (18:00 - 23:00)',
      icon: '🌙',
      focus: 'Özet & Günün Değerlendirmesi'
    }
  };

  const generatePersonalizedAgenda = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const personalizedContent = {
        morning: {
          recommended: [
            {
              id: 1,
              title: "Türkiye Ekonomisinde Son Gelişmeler",
              category: "Ekonomi",
              readTime: "4 dakika",
              priority: "Yüksek",
              aiReason: "Ekonomi konularını sık takip ediyorsun",
              xpValue: 25,
              image: "/api/placeholder/100/80"
            },
            {
              id: 2,
              title: "Teknoloji Sektöründe Yeni Trendler",
              category: "Teknoloji", 
              readTime: "3 dakika",
              priority: "Orta",
              aiReason: "Teknoloji haberleri ilgi alanın",
              xpValue: 20,
              image: "/api/placeholder/100/80"
            }
          ],
          dailyGoals: [
            { task: "3 haber oku", progress: 0, target: 3, xp: 50 },
            { task: "1 quiz tamamla", progress: 0, target: 1, xp: 30 },
            { task: "1 haber paylaş", progress: 0, target: 1, xp: 25 }
          ],
          insights: [
            "🎯 Bu sabah 15 dakikan var, 2 kısa haber ile başla",
            "🔥 Ekonomi kategorisinde streak'in devam ediyor",
            "⭐ Bugün 100 XP kazanmaya 75 XP kaldı"
          ]
        },
        afternoon: {
          recommended: [
            {
              id: 3,
              title: "Sağlık Alanında Çığır Açan Buluş",
              category: "Sağlık",
              readTime: "6 dakika", 
              priority: "Yüksek",
              aiReason: "Uzun okumalar için ideal zamanda",
              xpValue: 35,
              image: "/api/placeholder/100/80"
            },
            {
              id: 4,
              title: "Çevresel Sürdürülebilirlik Projeleri",
              category: "Çevre",
              readTime: "5 dakika",
              priority: "Orta",
              aiReason: "Çevre konularına artan ilgin",
              xpValue: 30,
              image: "/api/placeholder/100/80"
            }
          ],
          dailyGoals: [
            { task: "5 haber oku", progress: 2, target: 5, xp: 75 },
            { task: "2 quiz tamamla", progress: 1, target: 2, xp: 60 },
            { task: "3 yorum yap", progress: 0, target: 3, xp: 45 }
          ],
          insights: [
            "📚 Öğleden sonra daha uzun içerikler önerilyorum",
            "🎮 Quiz performansın çok iyi, zorlu sorular hazırladım",
            "💬 Yorumların diğer kullanıcılar tarafından beğeniliyor"
          ]
        },
        evening: {
          recommended: [
            {
              id: 5,
              title: "Günün Önemli Olayları - Özet",
              category: "Gündem",
              readTime: "2 dakika",
              priority: "Yüksek", 
              aiReason: "Günün özetini kaçırma",
              xpValue: 15,
              image: "/api/placeholder/100/80"
            },
            {
              id: 6,
              title: "Yarının Ajandası",
              category: "Önbilgi",
              readTime: "3 dakika",
              priority: "Orta",
              aiReason: "Yarına hazırlık için",
              xpValue: 20,
              image: "/api/placeholder/100/80"
            }
          ],
          dailyGoals: [
            { task: "Günlük hedefi tamamla", progress: 4, target: 5, xp: 100 },
            { task: "Günün özetini oku", progress: 0, target: 1, xp: 25 },
            { task: "Yarın planla", progress: 0, target: 1, xp: 15 }
          ],
          insights: [
            "🎉 Bugün harika bir gün geçirdin, hedefe çok yakınsın",
            "📈 Bu hafta okuma hızın %25 arttı",
            "🌟 Yarın için 3 özel içerik hazırladım"
          ]
        }
      };

      setAgendaData(personalizedContent);
      setIsGenerating(false);
    }, 2000);
  };

  const handleArticleClick = (article) => {
    onArticleClick && onArticleClick(article.id);
    onClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Yüksek': return 'text-red-600 bg-red-100';
      case 'Orta': return 'text-yellow-600 bg-yellow-100';
      case 'Düşük': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const currentData = agendaData && agendaData[selectedTimeSlot];

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">AI Kişisel Ajanda</h2>
                <p className="text-slate-600">Senin için özelleştirilmiş haber deneyimi</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* User Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-bold text-slate-800">Merhaba {user.name}!</h3>
                  <p className="text-sm text-slate-600">Seviye {user.level} • {user.xp.toLocaleString()} XP</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{user.streak}</div>
                <div className="text-xs text-slate-600">günlük seri</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">{user.todayReadCount}</div>
                <div className="text-xs text-slate-600">Bugün Okunan</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">{user.coins}</div>
                <div className="text-xs text-slate-600">Coin</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-lg font-bold text-purple-600">#{user.rank}</div>
                <div className="text-xs text-slate-600">Sıralama</div>
              </div>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Zaman Dilimi Seç</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(timeSlots).map(([key, slot]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTimeSlot(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTimeSlot === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{slot.icon}</div>
                  <div className="font-medium text-slate-800">{slot.label}</div>
                  <div className="text-sm text-slate-600 mt-1">{slot.focus}</div>
                </button>
              ))}
            </div>
          </div>

          {isGenerating ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">AI Ajanda Oluşturuluyor...</h3>
              <p className="text-slate-600">Kişisel tercihlerini analiz ediyorum</p>
            </div>
          ) : currentData ? (
            <div className="space-y-8">
              {/* Recommended Articles */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold text-slate-800">Önerilen Haberler</h3>
                </div>
                
                <div className="space-y-4">
                  {currentData.recommended.map((article) => (
                    <div 
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-all cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(article.priority)}`}>
                              {article.priority}
                            </span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                              {article.category}
                            </span>
                            <span className="flex items-center space-x-1 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </span>
                          </div>
                          
                          <h4 className="font-semibold text-slate-800 mb-2">{article.title}</h4>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-purple-600">
                              <Brain className="w-4 h-4" />
                              <span>{article.aiReason}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-amber-600">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-medium">+{article.xpValue} XP</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Goals */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-bold text-slate-800">Günlük Hedefler</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentData.dailyGoals.map((goal, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-800">{goal.task}</span>
                        <span className="text-sm text-green-600 font-medium">+{goal.xp} XP</span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-600">
                        {goal.progress}/{goal.target} tamamlandı
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-xl font-bold text-slate-800">AI İçgörüleri</h3>
                </div>
                
                <div className="space-y-3">
                  {currentData.insights.map((insight, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-slate-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center pt-4">
                <button
                  onClick={generatePersonalizedAgenda}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Yeni Ajanda Oluştur
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-8 text-center text-xs text-slate-500">
            🧠 AI, okuma alışkanlıklarını analiz ederek kişisel öneriler sunuyor
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedAgenda;
