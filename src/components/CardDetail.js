import React from 'react';
import { ArrowLeft, Download, ExternalLink, Heart, Share2, Bookmark } from 'lucide-react';
import { rarityBadges, mockNews } from '../data/mockData';
import VerticalTimeline from './VerticalTimeline';

const CardDetail = ({ article, onClose, onCollect, isCollected, onOpenArticle }) => {
  // Hooks must be declared before any early return
  const [expandedId, setExpandedId] = React.useState(null);
  const expandedArticle = expandedId ? mockNews.find(a => a.id === expandedId) : null;

  if (!article) return null;

  // Basit kronolojik akış: aynı kategorideki diğer haberlerden bir kısa liste
  const timeline = mockNews
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags?.some(t => article.tags?.includes(t))))
    .slice(0, 8)
    .map(a => ({ id: a.id, title: a.title, publishedAt: a.publishedAt, summary: a.summary }));

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${rarityBadges[article.rarity].color}`}>
              {rarityBadges[article.rarity].text} Kart
            </span>
            <span className="text-sm text-slate-600">
              #{article.cardNumber.toString().padStart(3, '0')} / {article.totalInSeries}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ExternalLink className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="text-sm text-slate-500">{article.publishedAt}</span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-500">{article.readTime}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm text-slate-600">
                Yazar: <span className="font-medium">{article.author}</span>
              </span>
              <span className="text-sm text-slate-600">
                {article.readCount.toLocaleString()} okuma
              </span>
              <span className="text-sm text-slate-600">
                {article.shareCount} paylaşım
              </span>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="prose max-w-none mb-4 sm:mb-6">
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              {article.summary}
            </p>
            <div className="text-slate-700 leading-relaxed">
              <p>{article.fullContent}</p>
            </div>
          </div>

          {/* Kronolojik Akış */}
          <div className="border-t border-slate-200 pt-4 sm:pt-6 mb-4 sm:mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Kronolojik Akış</h3>
          {timeline.length === 0 ? (
              <div className="text-sm text-slate-600">Bu konu için henüz başka gelişme bulunamadı.</div>
            ) : (
              <VerticalTimeline
                items={timeline.map(t => {
                  const full = mockNews.find(a => a.id === t.id) || {};
                  return {
                    ...t,
                    image: full.image,
                    tags: full.tags,
                    category: full.category,
                    readTime: full.readTime,
                    location: full.location,
                    readCount: full.readCount,
                    shareCount: full.shareCount,
                    author: full.author,
                    xpValue: full.xpValue,
                  };
                })}
                onSelect={(id) => setExpandedId(id)}
                onOpen={(id) => onOpenArticle && onOpenArticle(id)}
              />
            )}
          </div>

          <div className="border-t border-slate-200 pt-4 sm:pt-6 mb-4 sm:mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm font-medium text-slate-700 mr-2">Etiketler:</span>
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Konum:</span>
                <div className="font-medium text-slate-800">{article.location}</div>
              </div>
              <div>
                <span className="text-slate-600">XP Değeri:</span>
                <div className="font-medium text-amber-600">+{article.xpValue} XP</div>
              </div>
              <div>
                <span className="text-slate-600">Ruh Hali:</span>
                <div className="font-medium text-slate-800 capitalize">{article.mood}</div>
              </div>
              <div>
                <span className="text-slate-600">Ses Desteği:</span>
                <div className="font-medium text-slate-800">{article.isAudioAvailable ? 'Mevcut' : 'Yok'}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Topluluk Tepkileri</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(article.emotionReactions).map(([emotion, count]) => {
                const emojis = { happy: "😊", surprised: "😲", thoughtful: "🤔", sad: "😢" };
                const labels = { happy: "Mutlu", surprised: "Şaşırmış", thoughtful: "Düşünceli", sad: "Üzgün" };
                return (
                  <div key={emotion} className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl mb-2">{emojis[emotion]}</div>
                    <div className="text-lg font-semibold text-slate-800">{count}</div>
                    <div className="text-sm text-slate-600">{labels[emotion]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Yorumlar */}
          <div className="border-t border-slate-200 pt-4 sm:pt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Yorumlar</h3>
            {article.comments && article.comments.length > 0 ? (
              <div className="space-y-3">
                {article.comments.map((c) => (
                  <div key={c.id} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                    <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-slate-800">{c.user}</div>
                        <div className="text-xs text-slate-500">{c.time}</div>
                      </div>
                      <div className="text-sm text-slate-700">{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-600">Henüz yorum yok.</div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center space-x-2 px-2.5 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-xs sm:text-sm">
                <Heart className="w-4 h-4" />
                <span>Beğen</span>
              </button>
              <button className="flex items-center space-x-2 px-2.5 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-xs sm:text-sm">
                <Share2 className="w-4 h-4" />
                <span>Paylaş</span>
              </button>
              <button className="flex items-center space-x-2 px-2.5 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-xs sm:text-sm">
                <Bookmark className="w-4 h-4" />
                <span>Kaydet</span>
              </button>
            </div>
            
            <button
              onClick={() => onCollect(article.id)}
              disabled={isCollected}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all ${
                isCollected 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              {isCollected ? 'Kart Toplandı' : 'Kartı Topla'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
