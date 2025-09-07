import React, { useState } from 'react';
import { Trophy, TrendingUp, Flame } from 'lucide-react';

// Component imports
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import NewsFeed from './components/NewsFeed';
import CardDetail from './components/CardDetail';
import FollowingTopics from './components/FollowingTopics';
import LeagueSystem from './components/LeagueSystem';
import PremiumContent from './components/PremiumContent';
import PersonalizedAgenda from './components/PersonalizedAgenda';
import CardPackModal from './components/CardPackModal';
import CardCollection from './components/CardCollection';
import MobileNav from './components/MobileNav';
import Missions from './components/Missions';

// Data imports
import { mockNews } from './data/mockData';

const HaberOyunu = () => {
  const [activeSection, setActiveSection] = useState('feed');
  const [collectedCards, setCollectedCards] = useState([1, 3]);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPremium, setShowPremium] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);
  const [showPack, setShowPack] = useState(false);
  const [packArticle, setPackArticle] = useState(null);
  const [dailyReadNews, setDailyReadNews] = useState(new Set());
  const [lastReadDate, setLastReadDate] = useState(new Date().toDateString());
  
  const [user, setUser] = useState({
    id: 1,
    name: "Ahmet Yılmaz",
    title: "Haber Meraklısı",
    level: 7,
    xp: 1247,
    coins: 350,
    streak: 12,
    collectedCards: 2,
    cards: {
      'Gündem Kartları': { Common: 2, Rare: 0, Legendary: 0 },
      'Spor Kartları': { Common: 0, Rare: 0, Legendary: 0 },
      'Ekonomi Kartları': { Common: 0, Rare: 0, Legendary: 0 },
      'Dünya Kartları': { Common: 0, Rare: 0, Legendary: 0 },
      'Kültür-Sanat Kartları': { Common: 0, Rare: 0, Legendary: 0 },
    },
    weekly: { reads: 12, quizzes: 3, cards: 2, xp: 320, goal: { target: 25 } },
    rank: 156,
    todayReadCount: 0,
    dailyGoal: 5
  });

  const handleCollectCard = (articleId) => {
    if (!collectedCards.includes(articleId)) {
      const article = mockNews.find(a => a.id === articleId);
      setPackArticle(article);
      setShowPack(true);
      // Daily streak takibi yes
      trackDailyRead(articleId);
    }
  };

  const trackDailyRead = (articleId) => {
    const today = new Date().toDateString();
    
    if (lastReadDate !== today) {
      // Yeni gün - streak kontrolü
      setDailyReadNews(new Set([articleId]));
      setLastReadDate(today);
      setUser(prevUser => ({
        ...prevUser,
        todayReadCount: 1,
        weekly: { ...prevUser.weekly, reads: (prevUser.weekly.reads || 0) + 1 }
      }));
    } else if (!dailyReadNews.has(articleId)) {
      // Aynı gün, yeni haber
      const newReadNews = new Set([...dailyReadNews, articleId]);
      setDailyReadNews(newReadNews);
      setUser(prevUser => ({
        ...prevUser,
        todayReadCount: newReadNews.size,
        weekly: { ...prevUser.weekly, reads: (prevUser.weekly.reads || 0) + 1 }
      }));
    }
  };

  const handleCardClick = (articleId) => {
    const article = mockNews.find(a => a.id === articleId);
    setSelectedCard(article);
    trackDailyRead(articleId); // Okuma da sayılsın
  };

  const handleQuizComplete = (score, maxScore, articleId) => {
    // Quiz tamamlandığında XP ve coin ödülü ver
    setUser(prevUser => ({
      ...prevUser,
      xp: prevUser.xp + score,
      coins: prevUser.coins + Math.floor(score / 2)
    }));
  };

  const grantReward = ({ xp = 0, coins = 0 } = {}) => {
    setUser(prevUser => ({
      ...prevUser,
      xp: prevUser.xp + xp,
      coins: prevUser.coins + coins
    }));
  };

  const handlePremiumUpgrade = (tier) => {
    console.log('Premium upgrade:', tier);
    setShowPremium(false);
  };

  const handlePremiumUnlock = (feature, type) => {
    if (type === 'coins') {
      setUser(prevUser => ({
        ...prevUser,
        coins: prevUser.coins - feature.unlockCost
      }));
    }
    console.log('Unlocked feature:', feature.title);
  };

  const onPackAward = ({ category, rarity }) => {
    // Update user cards and rewards
    setCollectedCards(prev => packArticle ? [...prev, packArticle.id] : prev);
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 10,
      coins: prev.coins + 5,
      collectedCards: prev.collectedCards + 1,
      cards: {
        ...prev.cards,
        [category]: {
          ...prev.cards[category],
          [rarity]: (prev.cards[category]?.[rarity] || 0) + 1
        }
      },
      weekly: {
        ...prev.weekly,
        cards: (prev.weekly.cards || 0) + 1,
        xp: (prev.weekly.xp || 0) + 10,
      }
    }));
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'feed':
        return (
          <NewsFeed 
            articles={mockNews} 
            onCollectCard={handleCollectCard} 
            collectedCards={collectedCards}
            onCardClick={handleCardClick}
            onQuizComplete={handleQuizComplete}
            user={user}
          />
        );
      case 'topics':
        return <FollowingTopics />;
      case 'leagues':
        return <LeagueSystem />;
      case 'missions':
        return <Missions user={user} onGrantXP={grantReward} />;
      case 'premium':
        setShowPremium(true);
        setActiveSection('feed');
        return (
          <NewsFeed 
            articles={mockNews} 
            onCollectCard={handleCollectCard} 
            collectedCards={collectedCards}
            onCardClick={handleCardClick}
            onQuizComplete={handleQuizComplete}
            user={user}
          />
        );
      case 'following':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Takip Ettiklerim</h2>
            <NewsFeed 
              articles={mockNews.filter(article => article.isFollowing)} 
              onCollectCard={handleCollectCard} 
              collectedCards={collectedCards}
              onCardClick={handleCardClick}
              user={user}
            />
          </div>
        );
      case 'collection':
        return (
          <CardCollection cards={user.cards} total={user.collectedCards} />
        );
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-slate-800 mb-2">{activeSection}</h3>
            <p className="text-slate-600">Bu bölüm yakında aktif olacak.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        user={user} 
        notifications={notifications}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        onAgendaClick={() => setShowAgenda(true)}
      />
      
      {/* App shell below header: full-height grid, smooth scroll columns */}
      <div className="fixed top-16 left-0 right-0 bottom-0">
        <div className="grid grid-cols-1 lg:grid-cols-[16rem,minmax(0,1fr),20rem] h-full">
          <aside className="border-r border-slate-200 bg-white overflow-hidden hidden lg:block">
            <LeftSidebar 
              user={user} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
            />
          </aside>
          <main className="overflow-y-auto overflow-x-hidden">
            <div className="max-w-2xl mx-auto p-4 md:p-5 pb-24 md:pb-6">
              {renderMainContent()}
            </div>
          </main>
          <aside className="border-l border-slate-200 bg-white overflow-y-auto overflow-x-hidden hidden lg:block">
            <RightSidebar user={user} onUpdateGoal={(target) => setUser((u) => ({...u, weekly: {...u.weekly, goal: { target }}}))} />
          </aside>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav active={activeSection} onChange={setActiveSection} />

      {selectedCard && (
        <CardDetail
          article={selectedCard}
          onClose={() => setSelectedCard(null)}
          onCollect={handleCollectCard}
          isCollected={collectedCards.includes(selectedCard.id)}
          onOpenArticle={(id) => {
            const a = mockNews.find(x => x.id === id);
            setSelectedCard(a);
          }}
        />
      )}

      {showNotifications && (
        <div className="fixed top-16 right-6 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">Bildirimler</h3>
            <p className="text-xs text-slate-600">Son güncellemeler</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800 font-medium">Görev tamamlandı</p>
                  <p className="text-xs text-slate-600">50 XP ve 10 coin kazandınız</p>
                  <p className="text-xs text-slate-400 mt-1">2 saat önce</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800 font-medium">Sıralamada yükseldiniz</p>
                  <p className="text-xs text-slate-600">Şu anda 156. sıradasınız</p>
                  <p className="text-xs text-slate-400 mt-1">5 saat önce</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800 font-medium">Seri devam ediyor</p>
                  <p className="text-xs text-slate-600">12 günlük okuma seriniz sürüyor</p>
                  <p className="text-xs text-slate-400 mt-1">1 gün önce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Content Modal */}
      <PremiumContent
        user={user}
        onUpgrade={handlePremiumUpgrade}
        onUnlock={handlePremiumUnlock}
        isOpen={showPremium}
        onClose={() => setShowPremium(false)}
      />

      {/* Personalized Agenda Modal */}
      <PersonalizedAgenda
        user={user}
        articles={mockNews}
        isOpen={showAgenda}
        onClose={() => setShowAgenda(false)}
        onArticleClick={handleCardClick}
      />

      {/* Card Pack Modal */}
      <CardPackModal
        article={packArticle}
        isOpen={showPack}
        onClose={() => setShowPack(false)}
        onAward={onPackAward}
      />
    </div>
  );
};

export default HaberOyunu;
