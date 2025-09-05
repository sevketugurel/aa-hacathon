import React, { useState } from 'react';
import { Users2, Clock } from 'lucide-react';
import { followingTopics } from '../data/mockData';

const FollowingTopics = () => {
  const [topics, setTopics] = useState(followingTopics);

  const toggleFollow = (topicId) => {
    setTopics(topics.map(topic => 
      topic.id === topicId 
        ? { ...topic, isFollowing: !topic.isFollowing }
        : topic
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Konu Takibi</h2>
        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
          Yeni Konu Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-800">{topic.name}</h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                    {topic.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Users2 className="w-4 h-4" />
                    <span>{topic.followers.toLocaleString()} takipçi</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{topic.newArticles} yeni haber</span>
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => toggleFollow(topic.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  topic.isFollowing
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {topic.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingTopics;