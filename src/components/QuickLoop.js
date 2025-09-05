import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles, Volume2, Brain, Zap, CheckCircle } from 'lucide-react';

const QuickLoop = ({ article, isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(0); // 0: summary, 1: audio, 2: quiz, 3: result
  const [timeLeft, setTimeLeft] = useState(15);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const quiz = useMemo(() => ({
    question: `${article.category} haberinin ana odağı nedir?`,
    options: [article.category, 'Ekonomi', 'Spor', 'Kültür'],
    correct: 0,
  }), [article]);

  useEffect(() => {
    if (!isOpen) return;
    setStep(0);
    setTimeLeft(15);
    setSelected(null);
    setScore(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (step !== 1) return; // audio step countdown
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [isOpen, step, timeLeft]);

  const next = () => {
    if (step === 0) {
      setStep(1);
      setTimeLeft(15);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const earned = selected === quiz.correct ? 10 : 5;
      setScore(earned);
      setStep(3);
      onComplete && onComplete({ xp: earned, coins: Math.floor(earned / 2) });
    } else {
      onClose && onClose();
    }
  };

  if (!isOpen || !article) return null;

  const progress = ((Math.min(step, 2) + 1) / 3) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <div className="text-xs text-slate-500 mb-2">Hızlı Döngü</div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step === 0 && (
          <div className="p-5">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div className="font-semibold text-slate-800">AI Özet</div>
            </div>
            <div className="text-sm text-slate-700 space-y-2">
              <div>• {article.title}</div>
              <div>• {article.summary.slice(0, 120)}...</div>
              <div>• Kategori: {article.category} • {article.readTime} • +{article.xpValue} XP</div>
            </div>
            <button onClick={next} className="w-full mt-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Devam</button>
          </div>
        )}

        {step === 1 && (
          <div className="p-5">
            <div className="flex items-center space-x-2 mb-3">
              <Volume2 className="w-5 h-5 text-green-600" />
              <div className="font-semibold text-slate-800">Sesli Kısa Özet</div>
              <div className={`ml-auto px-2 py-0.5 rounded text-xs ${timeLeft > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{timeLeft}s</div>
            </div>
            <div className="h-2 bg-slate-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full transition-all" style={{ width: `${((15 - timeLeft) / 15) * 100}%` }} />
            </div>
            <div className="text-xs text-slate-500 mt-2">Mini ses demosu (TTS)</div>
            <button onClick={next} className="w-full mt-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Devam</button>
          </div>
        )}

        {step === 2 && (
          <div className="p-5">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <div className="font-semibold text-slate-800">Hızlı Quiz</div>
            </div>
            <div className="text-sm font-medium text-slate-800 mb-3">{quiz.question}</div>
            <div className="space-y-2">
              {quiz.options.map((opt, idx) => (
                <button key={idx} onClick={() => setSelected(idx)} className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selected === idx ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  {opt}
                </button>
              ))}
            </div>
            <button disabled={selected === null} onClick={next} className={`w-full mt-5 py-2.5 rounded-lg font-medium ${selected === null ? 'bg-slate-200 text-slate-400' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>Bitir ve XP Al</button>
          </div>
        )}

        {step === 3 && (
          <div className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <div className="text-lg font-bold text-slate-800 mb-1">Tebrikler!</div>
            <div className="text-slate-600 text-sm">Hızlı Döngü tamamlandı.</div>
            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm">
              <Zap className="w-4 h-4" />
              <span>+{score} XP</span>
            </div>
            <button onClick={next} className="w-full mt-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">Kapat</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickLoop;

