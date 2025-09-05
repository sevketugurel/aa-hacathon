import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, Share2, User, MapPin, Clock, Tag, Zap, Star } from 'lucide-react';

const parseToDate = (publishedAt) => {
  if (!publishedAt) return new Date();
  const hourMatch = /([0-9]+)\s*saat\s*önce/i.exec(publishedAt);
  if (hourMatch) {
    const hours = parseInt(hourMatch[1], 10) || 0;
    const d = new Date();
    d.setHours(d.getHours() - hours);
    return d;
  }
  return new Date();
};

const formatAbs = (d) => {
  try {
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } catch (_e) {
    return d.toISOString();
  }
};

const VerticalTimeline = ({ items = [], onSelect, onOpen }) => {
  const data = useMemo(() => {
    const mapped = items.map((it) => {
      const date = it.date instanceof Date ? it.date : parseToDate(it.publishedAt);
      return { ...it, date };
    });
    // Older at top, newer at bottom
    mapped.sort((a, b) => a.date.getTime() - b.date.getTime());
    return mapped;
  }, [items]);

  const [active, setActive] = useState(data[data.length - 1]?.id);
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    if (!active) return;
    const el = itemRefs.current[active];
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [active]);

  return (
    <div className="relative">
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-slate-200" />
      <div className="space-y-4">
        {data.map((item, idx) => {
          const isActive = active === item.id;
          const important = (item.xpValue && item.xpValue >= 25) || (item.shareCount && item.shareCount > 500);
          return (
            <div key={item.id} className="relative flex items-start" ref={(el) => { if (el) itemRefs.current[item.id] = el; }}>
              {/* Dot */}
              <div className="relative flex-shrink-0" style={{ width: '24px' }}>
                <div className={`w-3 h-3 rounded-full ring-2 ring-white translate-x-[6px] mt-2 ${isActive ? 'bg-blue-600' : 'bg-slate-400'}`} />
              </div>

              {/* Content */}
              <div className={`flex-1 transition-all ${isActive ? 'scale-[1.01]' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="text-xs text-slate-500">
                    <div>{item.publishedAt || '—'}</div>
                    <div className="opacity-70">{formatAbs(item.date)}</div>
                  </div>
                </div>

                <button
                  onClick={() => { setActive(item.id); onSelect && onSelect(item.id); }}
                  className={`w-full text-left mt-2 border rounded-lg transition-colors ${
                    isActive ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-semibold text-slate-800 truncate" title={item.title}>{item.title}</div>
                      {important && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px]"><Star className="w-3 h-3" />Önemli</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 overflow-hidden" style={{ maxHeight: isActive ? '7.2em' : '3.6em' }}>{item.summary}</div>
                  </div>
                </button>

                {isActive && (
                  <div className="mt-3 border rounded-lg bg-white shadow-sm border-slate-200">
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-44 h-28 object-cover rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          {/* Meta chips */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-2">
                            {item.category && <span className="px-2 py-1 bg-slate-100 rounded">{item.category}</span>}
                            {item.readTime && <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded"><Clock className="w-3 h-3" />{item.readTime}</span>}
                            {item.location && <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded"><MapPin className="w-3 h-3" />{item.location}</span>}
                            {typeof item.xpValue !== 'undefined' && <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded"><Zap className="w-3 h-3" />+{item.xpValue} XP</span>}
                          </div>

                          {/* Summary */}
                          <div className="text-sm text-slate-700 mb-2">{item.summary}</div>
                          
                          {/* Tags */}
                          {item.tags && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {item.tags.map((t) => (
                                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"><Tag className="w-3 h-3" />{t}</span>
                              ))}
                            </div>
                          )}

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-xs text-slate-600 mb-2">
                            {typeof item.readCount !== 'undefined' && (
                              <span className="inline-flex items-center gap-1"><Eye className="w-3 h-3" />{item.readCount?.toLocaleString?.() || item.readCount} okuma</span>
                            )}
                            {typeof item.shareCount !== 'undefined' && (
                              <span className="inline-flex items-center gap-1"><Share2 className="w-3 h-3" />{item.shareCount}</span>
                            )}
                            {item.author && (
                              <span className="inline-flex items-center gap-1"><User className="w-3 h-3" />{item.author}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button onClick={() => onOpen && onOpen(item.id)} className="px-3 py-1.5 text-xs rounded bg-slate-800 text-white hover:bg-slate-700">Haberi Tam Aç</button>
                            <button onClick={() => setActive(null)} className="px-3 py-1.5 text-xs rounded bg-slate-100 text-slate-700 hover:bg-slate-200">Kapat</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalTimeline;
