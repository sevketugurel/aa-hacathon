import React, { useState } from 'react';
import { Lock, Crown, Star, Zap, Gem, Gift, CheckCircle, Clock } from 'lucide-react';

const PremiumContent = ({ user, onUpgrade, onUnlock, isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState('weekly');

  if (!isOpen) return null;

  const premiumTiers = [
    {
      id: 'weekly',
      name: 'Haftalık Premium',
      price: '₺19.90',
      period: 'hafta',
      features: [
        'Sınırsız haber erişimi',
        'AI analiz ve özetler',
        'Premium quiz içerikleri',
        'Reklamsız deneyim',
        'Öncelikli müşteri desteği'
      ],
      badge: '7 Gün',
      color: 'from-blue-500 to-purple-600',
      popular: false
    },
    {
      id: 'monthly',
      name: 'Aylık Premium',
      price: '₺49.90',
      period: 'ay',
      originalPrice: '₺79.60',
      features: [
        'Tüm haftalık özellikler',
        'Özel editör içerikleri',
        'Gelişmiş istatistikler',
        'Premium rozet koleksiyonu',
        'Özel etkinlik erişimi',
        'Arkadaş davet bonusu'
      ],
      badge: 'En Popüler',
      color: 'from-amber-500 to-orange-600',
      popular: true
    },
    {
      id: 'yearly',
      name: 'Yıllık Premium',
      price: '₺399.90',
      period: 'yıl',
      originalPrice: '₺598.80',
      features: [
        'Tüm aylık özellikler',
        'Ücretsiz koin paketi (monthly)',
        'Özel temalar ve avatar',
        'Beta özellik erişimi',
        'VIP topluluk erişimi',
        'Yıllık özel etkinlikler'
      ],
      badge: 'En Avantajlı',
      color: 'from-emerald-500 to-teal-600',
      popular: false
    }
  ];

  const lockedFeatures = [
    {
      icon: Crown,
      title: 'Premium Haberler',
      description: 'Sadece premium üyelere özel derinlemesine analizler',
      unlockCost: 50,
      type: 'coins'
    },
    {
      icon: Gem,
      title: 'Özel Quiz Kategorileri',
      description: 'Finansal okur-yazarlık, teknoloji trendleri, global politika',
      unlockCost: 30,
      type: 'coins'
    },
    {
      icon: Star,
      title: 'AI Kişisel Asistan',
      description: 'Senin için özelleştirilmiş gündem ve haber önerileri',
      unlockCost: 100,
      type: 'coins'
    },
    {
      icon: Gift,
      title: 'Haftalık Bonus Pack',
      description: 'Extra XP, coin ve özel rozet fırsatları',
      unlockCost: 7,
      type: 'streak'
    }
  ];

  const achievements = [
    {
      id: 'premium_trial',
      name: 'İlk Deneyim',
      description: 'Premium özelliklerini dene',
      xp: 100,
      unlocked: false,
      icon: '🎁'
    },
    {
      id: 'loyal_reader',
      name: 'Sadık Okur',
      description: 'Premium üyelik 30 gün sürdür',
      xp: 500,
      unlocked: false,
      icon: '📚'
    },
    {
      id: 'premium_collector',
      name: 'Premium Koleksiyoncu',
      description: 'Tüm premium içerikleri topla',
      xp: 1000,
      unlocked: false,
      icon: '💎'
    }
  ];

  const handleTierSelect = (tierId) => {
    setSelectedTier(tierId);
  };

  const handleUnlockFeature = (feature) => {
    if (feature.type === 'coins' && user.coins >= feature.unlockCost) {
      onUnlock(feature, 'coins');
    } else if (feature.type === 'streak' && user.streak >= feature.unlockCost) {
      onUnlock(feature, 'streak');
    }
  };

  const canUnlock = (feature) => {
    if (feature.type === 'coins') return user.coins >= feature.unlockCost;
    if (feature.type === 'streak') return user.streak >= feature.unlockCost;
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Premium İçerik</h2>
                <p className="text-slate-600">Haber deneyimini bir üst seviyeye taşı</p>
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
          {/* User Stats */}
          <div className="bg-slate-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="font-bold text-amber-600">{user.coins}</div>
                  <div className="text-xs text-slate-600">Coin</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-orange-600">{user.streak}</div>
                  <div className="text-xs text-slate-600">Gün Seri</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">{user.level}</div>
                  <div className="text-xs text-slate-600">Seviye</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-700">Üyelik Durumu</div>
                <div className="text-xs text-slate-500">Ücretsiz Üye</div>
              </div>
            </div>
          </div>

          {/* Premium Tiers */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Premium Planlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-xl p-6 border-2 cursor-pointer transition-all ${
                    selectedTier === tier.id
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${tier.popular ? 'ring-2 ring-amber-400' : ''}`}
                  onClick={() => handleTierSelect(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-slate-800 mb-2">{tier.name}</h4>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-slate-800">{tier.price}</span>
                      <span className="text-slate-600">/{tier.period}</span>
                    </div>
                    {tier.originalPrice && (
                      <div className="text-sm text-slate-500 line-through">{tier.originalPrice}</div>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      selectedTier === tier.id
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Seç
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Features */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Coin ile Açılabilir İçerikler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lockedFeatures.map((feature, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-600 mb-3">{feature.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {feature.type === 'coins' ? (
                            <Zap className="w-4 h-4 text-amber-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-orange-500" />
                          )}
                          <span className="text-sm font-medium text-slate-700">
                            {feature.unlockCost} {feature.type === 'coins' ? 'Coin' : 'Gün Seri'}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleUnlockFeature(feature)}
                          disabled={!canUnlock(feature)}
                          className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
                            canUnlock(feature)
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {canUnlock(feature) ? 'Aç' : 'Yetersiz'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Premium Başarılar</h3>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-green-50 border-green-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className={`font-medium ${achievement.unlocked ? 'text-green-800' : 'text-slate-700'}`}>
                      {achievement.name}
                    </div>
                    <div className={`text-sm ${achievement.unlocked ? 'text-green-600' : 'text-slate-500'}`}>
                      {achievement.description}
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${achievement.unlocked ? 'text-green-600' : 'text-slate-500'}`}>
                    +{achievement.xp} XP
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => onUpgrade(selectedTier)}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              Premium'a Geç
            </button>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
            >
              Daha Sonra
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            💡 Premium üyelik ile haber okuma deneyimini kişiselleştir ve özel içeriklere erişim kazan!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumContent;