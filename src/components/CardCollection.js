import React from 'react';
import { Grid3X3, Trophy } from 'lucide-react';

const rarOrder = ['Legendary', 'Rare', 'Common'];
const rarColor = {
  Legendary: 'text-amber-700 bg-amber-50 border-amber-200',
  Rare: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  Common: 'text-slate-700 bg-slate-50 border-slate-200',
};

const CardCollection = ({ cards, total }) => {
  const categories = Object.keys(cards || {});
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Kart Koleksiyonum</h2>
        <div className="text-sm text-slate-600">Toplam Kart: <span className="font-semibold">{total || 0}</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => (
          <div key={cat} className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-slate-800">{cat}</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {rarOrder.map((r) => (
                <div key={r} className={`rounded-lg p-3 border text-center ${rarColor[r]}`}>
                  <div className="text-xs">{r}</div>
                  <div className="text-xl font-bold">{cards[cat][r] || 0}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Trophy className="w-4 h-4 text-amber-600" />
          <div className="font-semibold text-slate-800">Koleksiyon Liderliği (Haftalık)</div>
        </div>
        <div className="text-sm text-slate-600">En çok Legendary karta sahip kullanıcılar haftalık tabloda öne çıkar.</div>
      </div>
    </div>
  );
};

export default CardCollection;

