import React, { useState } from 'react';
import { Zap, Volume2, Sparkles, Heart, MessageCircle, Share2, Eye, Brain, Play, MoreHorizontal, Gift } from 'lucide-react';
import { rarityColors, rarityBadges } from '../data/mockData';
import AIQuiz from './AIQuiz';
import VoicePlayer from './VoicePlayer';
import SocialShare from './SocialShare';
import QuickLoop from './QuickLoop';

const NewsCard = ({ article, onCollect, isCollected, onCardClick, onQuizComplete, user }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showVoicePlayer, setShowVoicePlayer] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [showQuickLoop, setShowQuickLoop] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const moodEmojis = {
    "olumlu": "😊",
    "heyecanlı": "🚀", 
    "umutlu": "🌟",
    "gurur verici": "🏆",
    "başarılı": "✨",
    "umut verici": "💡",
    "gururlu": "👏",
    "doğal": "🌱",
    "mutlu": "😄"
  };

  const handleEmojiReact = (emotion) => {
    setShowEmojiPicker(false);
  };

  return (
    <div
      className={`group relative rounded-xl p-5 mb-5 border transition-all duration-200 ${rarityColors[article.rarity]} shadow-sm hover:shadow-lg will-change-transform transform-gpu hover:scale-[1.02] hover:border-slate-300`}
      onClick={() => onCardClick(article.id)}
    >        
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${rarityBadges[article.rarity].color}`}>
            {rarityBadges[article.rarity].text}
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
            {article.category}
          </span>
          <span className="text-xs text-slate-500">{article.readTime}</span>
          <span className="text-xs text-slate-500">{article.publishedAt}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
            <Zap className="w-3 h-3" />
            <span className="text-xs font-medium">+{article.xpValue}</span>
          </div>
          {isCollected && (
            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-green-100 text-green-700">Kart kazanıldı</span>
          )}
          {article.isAudioAvailable && (
            <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex space-x-4 min-w-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-slate-600">@{article.author}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{article.readCount.toLocaleString()} okuma</span>
          </div>

          <h3 
            className="font-semibold text-lg mb-3 text-slate-800 leading-tight cursor-pointer hover:text-slate-600 transition-colors"
            onClick={() => onCardClick(article.id)}
          >
            {article.title}
          </h3>
          
          <p className="text-slate-600 text-sm mb-4 leading-relaxed break-words">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full hover:bg-slate-200 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>

          {showSummary && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white w-3 h-3" />
                </div>
                <span className="text-sm font-medium text-blue-700">AI Özet</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Bu haber, {article.category.toLowerCase()} alanında önemli gelişmeleri ele alıyor ve son trendleri analiz ediyor.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
              <button
            onClick={(e) => { e.stopPropagation(); setShowSummary(!showSummary); }}
                className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>{showSummary ? 'Gizle' : 'AI Özet'}</span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowEmojiPicker(!showEmojiPicker); }}
                  className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
                >
                  <span className="text-lg">{moodEmojis[article.mood] || "😊"}</span>
                  <span>Tepki</span>
                </button>
                
                {showEmojiPicker && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-10">
                    <div className="text-xs text-slate-600 mb-2">Haber duygusuna tepki ver:</div>
                    <div className="flex flex-wrap gap-2 max-w-48">
                      {["😊", "😢", "😡", "😲", "🤔", "👏", "🔥", "💚"].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={(e) => { e.stopPropagation(); handleEmojiReact(emoji); }}
                          className="text-lg hover:bg-slate-100 p-1 rounded transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setShowQuiz(true); }}
                className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
              >
                <Brain className="w-4 h-4" />
                <span>Quiz</span>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setShowQuickLoop(true); }}
                className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hızlı</span>
              </button>

              {article.isAudioAvailable && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowVoicePlayer(true); }}
                  className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs md:text-sm font-medium whitespace-nowrap"
                >
                  <Play className="w-4 h-4" />
                  <span>Dinle</span>
                </button>
              )}
              <div className="relative">
                <button onClick={(e) => { e.stopPropagation(); setShowMore((v) => !v); }} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-xs md:text-sm font-medium inline-flex items-center">
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="ml-1 hidden md:inline">Daha Fazla</span>
                </button>
                {showMore && (
                  <div className="absolute z-10 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg p-2">
                    <button onClick={(e) => { e.stopPropagation(); setShowEmojiPicker(true); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm">Tepki Ver</button>
                    <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm inline-flex items-center justify-between">
                      <span>Yorumlar</span>
                      <span className="text-xs text-slate-500">{article.commentCount || 0}</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setShowSocialShare(true); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm">Paylaş</button>
                    <button onClick={(e) => { e.stopPropagation(); onCollect(article.id); setShowMore(false); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm inline-flex items-center gap-2"><Gift className="w-4 h-4" /> Kart Paketi Aç</button>
                    <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 text-sm">{article.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}</button>
                  </div>
                )}
              </div>
            </div>
            {/* Sağ tarafta büyük CTA yok; kart paketi menüye taşındı */}
          </div>
        </div>

        <div className="w-48 flex-shrink-0 relative">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onCardClick(article.id)}
          />
          <div className="hidden group-hover:flex absolute inset-x-0 bottom-1 px-2 py-1 text-[11px] bg-black/40 text-white rounded-b-lg items-center justify-between">
            <span>{article.location}</span>
            <span>+{article.xpValue} XP</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>#{article.cardNumber.toString().padStart(3, '0')}</span>
            <span>{article.location}</span>
          </div>
          <div className="mt-1 flex items-center space-x-3 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{(article.readCount / 1000).toFixed(1)}K</span>
            </span>
            <span className="flex items-center space-x-1">
              <Share2 className="w-3 h-3" />
              <span>{article.shareCount}</span>
            </span>
          </div>
        </div>
      </div>

      {/* AI Quiz Modal */}
      {showQuiz && (
        <AIQuiz
          article={article}
          onComplete={(score, maxScore) => {
            onQuizComplete && onQuizComplete(score, maxScore, article.id);
            setShowQuiz(false);
          }}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Voice Player */}
      <VoicePlayer
        article={article}
        isOpen={showVoicePlayer}
        onClose={() => setShowVoicePlayer(false)}
      />

      {/* Social Share Modal */}
      <SocialShare
        article={article}
        userStats={user}
        isOpen={showSocialShare}
        onClose={() => setShowSocialShare(false)}
      />

      {/* Quick Loop Modal */}
      <QuickLoop
        article={article}
        isOpen={showQuickLoop}
        onClose={() => setShowQuickLoop(false)}
        onComplete={(reward) => {
          // Prefer parent callback if provided
          if (typeof onQuizComplete === 'function') {
            onQuizComplete(reward?.xp || 10, 10, article.id);
          }
        }}
      />

      {/* Hover Expanded Content: the card grows to reveal more content */}
      <div className="overflow-hidden transition-all duration-200 max-h-0 group-hover:max-h-56">
        <div className="mt-2 p-3 bg-white/60 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">{article.category} • {article.readTime} • {article.publishedAt}</div>
          <div className="text-sm text-slate-700 mb-2">{article.summary}</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.slice(0,4).map((t) => (
              <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700">#{t}</span>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><Eye className="w-3 h-3" />{(article.readCount/1000).toFixed(1)}K</span>
            <span className="inline-flex items-center gap-1"><Share2 className="w-3 h-3" />{article.shareCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
