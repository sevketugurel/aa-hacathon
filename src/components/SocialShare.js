import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Copy, Check, Trophy, Users } from 'lucide-react';

const SocialShare = ({ article, userStats, isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareStats, setShareStats] = useState({
    twitter: 0,
    facebook: 0,
    linkedin: 0,
    direct: 0
  });

  if (!isOpen) return null;

  const shareUrl = `https://haberoyunu.aa.com.tr/haber/${article.id}`;
  const shareText = `🎯 "${article.title}" haberini okudum ve ${userStats.xp} XP kazandım! 
  
🏆 Seviye: ${userStats.level} 
🔥 ${userStats.streak} günlük seri
🎮 #HaberOyunu ile haber okumak bu kadar eğlenceli olabilir!`;

  const socialUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      
      // Simulate analytics
      setShareStats(prev => ({ ...prev, direct: prev.direct + 1 }));
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const handleSocialShare = (platform) => {
    window.open(socialUrls[platform], '_blank', 'width=600,height=400');
    
    // Simulate analytics
    setShareStats(prev => ({ ...prev, [platform]: prev[platform] + 1 }));
  };

  const achievements = [
    { 
      id: 'first_share', 
      name: 'İlk Paylaşım', 
      description: 'İlk haberini paylaştın!', 
      xp: 50,
      unlocked: true,
      icon: '🎉'
    },
    { 
      id: 'social_butterfly', 
      name: 'Sosyal Kelebek', 
      description: '10 haber paylaş', 
      xp: 100,
      progress: '3/10',
      unlocked: false,
      icon: '🦋'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Share2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Haberi Paylaş</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Article Preview */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 text-sm line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {article.category} • {article.readTime}
              </p>
            </div>
          </div>

          {/* User Achievement Badge */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">Başarı Kartın</span>
            </div>
            <div className="text-xs opacity-90">
              Seviye {userStats.level} • {userStats.xp.toLocaleString()} XP • {userStats.streak} gün seri
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSocialShare('twitter')}
            className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-slate-800">Twitter'da Paylaş</div>
              <div className="text-sm text-slate-600">Takipçilerinle başarını paylaş</div>
            </div>
            {shareStats.twitter > 0 && (
              <div className="text-xs text-blue-600 font-medium">
                +{shareStats.twitter * 10} XP
              </div>
            )}
          </button>

          <button
            onClick={() => handleSocialShare('facebook')}
            className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-slate-800">Facebook'ta Paylaş</div>
              <div className="text-sm text-slate-600">Arkadaşlarınla rekabet et</div>
            </div>
          </button>

          <button
            onClick={() => handleSocialShare('linkedin')}
            className="w-full flex items-center space-x-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-slate-800">LinkedIn'de Paylaş</div>
              <div className="text-sm text-slate-600">Profesyonel ağında öne çık</div>
            </div>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center space-x-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
              {copiedLink ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-slate-800">
                {copiedLink ? 'Kopyalandı!' : 'Linki Kopyala'}
              </div>
              <div className="text-sm text-slate-600">Her yerde paylaş</div>
            </div>
          </button>
        </div>

        {/* Achievements */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-700">Sosyal Başarılar</span>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className={`font-medium ${achievement.unlocked ? 'text-green-800' : 'text-slate-700'}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${achievement.unlocked ? 'text-green-600' : 'text-slate-500'}`}>
                    {achievement.description}
                    {achievement.progress && ` • ${achievement.progress}`}
                  </div>
                </div>
                <div className={`text-xs font-medium ${achievement.unlocked ? 'text-green-600' : 'text-slate-500'}`}>
                  +{achievement.xp} XP
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          💡 Paylaşım yapmak sosyal XP kazandırır ve arkadaşlarını oyuna davet eder!
        </div>
      </div>
    </div>
  );
};

export default SocialShare;