import React, { useEffect, useMemo, useState } from 'react';
import { Gift, Sparkles, Trophy } from 'lucide-react';

const CARD_CATEGORIES = [
  'Gündem Kartları',
  'Spor Kartları',
  'Ekonomi Kartları',
  'Dünya Kartları',
  'Kültür-Sanat Kartları',
];

const rarityWeights = [
  { key: 'Common', w: 70 },
  { key: 'Rare', w: 20 },
  { key: 'Legendary', w: 10 },
];

const rollRarity = () => {
  const total = rarityWeights.reduce((a, b) => a + b.w, 0);
  let r = Math.random() * total;
  for (const item of rarityWeights) {
    if ((r -= item.w) < 0) return item.key;
  }
  return 'Common';
};

const mapCategory = (articleCategory) => {
  const c = (articleCategory || '').toLowerCase();
  if (c.includes('spor')) return 'Spor Kartları';
  if (c.includes('ekonomi')) return 'Ekonomi Kartları';
  if (c.includes('dünya') || c.includes('dunya') || c.includes('uluslar')) return 'Dünya Kartları';
  if (c.includes('kültür') || c.includes('kultur') || c.includes('sanat')) return 'Kültür-Sanat Kartları';
  return 'Gündem Kartları';
};

const rarityStyle = (rarity) => {
  switch (rarity) {
    case 'Legendary':
      return 'from-amber-400 to-orange-600 text-white';
    case 'Rare':
      return 'from-blue-400 to-indigo-600 text-white';
    default:
      return 'from-slate-200 to-slate-300 text-slate-800';
  }
};

const CardPackModal = ({ article, isOpen, onClose, onAward }) => {
  const [rolling, setRolling] = useState(true);
  const [result, setResult] = useState(null);

  const category = useMemo(() => mapCategory(article?.category), [article]);

  useEffect(() => {
    if (!isOpen) return;
    setRolling(true);
    setResult(null);
    const t = setTimeout(() => {
      const rarity = rollRarity();
      const serial = rarity === 'Common' ? Math.floor(Math.random() * 100) + 1
                    : rarity === 'Rare' ? Math.floor(Math.random() * 900) + 100
                    : Math.floor(Math.random() * 900) + 1000;
      const res = { category, rarity, serial };
      setResult(res);
      setRolling(false);
      onAward && onAward(res);
    }, 1400);
    return () => clearTimeout(t);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-200 flex items-center space-x-2">
          <Gift className="w-5 h-5 text-amber-600" />
          <div className="font-semibold text-slate-800">Kart Paketi</div>
        </div>
        <div className="p-6 text-center">
          {rolling ? (
            <div>
              <div className="w-24 h-24 mx-auto rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
              <div className="mt-4 text-slate-600">Paket açılıyor...</div>
            </div>
          ) : (
            <div>
              <div className={`w-28 h-40 mx-auto rounded-xl bg-gradient-to-br ${rarityStyle(result.rarity)} flex flex-col items-center justify-center shadow-lg relative`}>
                <div className="absolute -top-3 right-2">
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs">#{result.serial}</span>
                </div>
                <Sparkles className="w-6 h-6 mb-1" />
                <div className="text-xs opacity-80">{category}</div>
                <div className="text-sm font-bold">{result.rarity}</div>
              </div>
              <div className="mt-4 text-sm text-slate-700">Tebrikler! Yeni bir kart kazandın.</div>
              <button onClick={onClose} className="w-full mt-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">Kapat</button>
            </div>
          )}
        </div>
        {!rolling && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              {CARD_CATEGORIES.map((c) => (
                <div key={c} className={`rounded-lg px-2 py-2 border ${c === category ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="truncate">{c}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPackModal;

