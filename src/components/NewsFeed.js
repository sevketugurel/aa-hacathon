import React, { useState } from 'react';
import NewsCard from './NewsCard';

const NewsFeed = ({ articles, onCollectCard, collectedCards, onCardClick, onQuizComplete, user }) => {
  const [locationFilter, setLocationFilter] = useState('all');
  const [moodFilter, setMoodFilter] = useState('all');
  
  const locations = [...new Set(articles.map(a => a.location))];
  const moods = [...new Set(articles.map(a => a.mood))];
  
  const filteredArticles = articles.filter(article => {
    if (locationFilter !== 'all' && article.location !== locationFilter) return false;
    if (moodFilter !== 'all' && article.mood !== moodFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="md:sticky md:top-0 md:z-10 md:bg-slate-50/80 md:backdrop-blur md:supports-[backdrop-filter]:backdrop-blur flex flex-wrap items-center gap-2 justify-between py-2 sm:py-3 mb-2 border-b border-slate-200">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800">Ana Sayfa</h2>
        <div className="flex items-center flex-wrap gap-2">
          <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium">
            <option>En Yeni</option>
            <option>En Popüler</option>
            <option>En Yüksek XP</option>
            <option>Takip Ettiklerim</option>
          </select>
          
          <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium"
          >
            <option value="all">Tüm Lokasyonlar</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          
          <select 
            value={moodFilter} 
            onChange={(e) => setMoodFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium"
          >
            <option value="all">Tüm Ruh Halleri</option>
            {moods.map(mood => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredArticles.map(article => (
        <NewsCard
          key={article.id}
          article={article}
          onCollect={onCollectCard}
          isCollected={collectedCards.includes(article.id)}
          onCardClick={onCardClick}
          onQuizComplete={onQuizComplete}
          user={user}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
