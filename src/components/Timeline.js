import React, { useMemo, useState } from 'react';

// Utility: parse strings like "4 saat önce" or fallback to now
const parseToDate = (publishedAt) => {
  if (!publishedAt) return new Date();
  const m = /([0-9]+)\s*saat\s*önce/i.exec(publishedAt);
  if (m) {
    const hours = parseInt(m[1], 10) || 0;
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

const Timeline = ({ items = [], onSelect }) => {
  const enhanced = useMemo(() => {
    const mapped = items.map((it) => {
      const date = it.date instanceof Date ? it.date : parseToDate(it.publishedAt);
      return { ...it, date };
    });
    const times = mapped.map((m) => m.date.getTime());
    const min = Math.min(...times);
    const max = Math.max(...times);
    const span = Math.max(1, max - min);
    return mapped.map((m) => ({ ...m, pos: ((m.date.getTime() - min) / span) * 100 }));
  }, [items]);

  const [active, setActive] = useState(enhanced[0]?.id);

  const handleSelect = (id) => {
    setActive(id);
    onSelect && onSelect(id);
  };

  return (
    <div className="relative w-full h-40">
      {/* Base line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded" />

      {enhanced.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{ left: `calc(${item.pos}% - 12px)`, top: '50%' }}
        >
          {/* Dot */}
          <button
            onClick={() => handleSelect(item.id)}
            className={`relative w-6 h-6 rounded-full border-2 transition-all ${
              active === item.id ? 'bg-blue-600 border-blue-600 scale-110' : 'bg-white border-slate-300 hover:border-slate-400'
            }`}
            title={formatAbs(item.date)}
          />

          {/* Card bubble */}
          <div className={`transition-all duration-300 origin-bottom ${active === item.id ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
            <div className="mt-3 w-64 -ml-8 bg-white border border-slate-200 rounded-lg shadow-lg p-3">
              <div className="text-[11px] text-slate-500 mb-1">{item.publishedAt || formatAbs(item.date)}</div>
              <div className="text-sm font-semibold text-slate-800 mb-1 truncate" title={item.title}>{item.title}</div>
              {item.summary && (
                <div className="text-xs text-slate-600 overflow-hidden" style={{ maxHeight: '3.6em' }}>{item.summary}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
