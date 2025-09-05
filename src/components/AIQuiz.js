import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, Trophy, Zap } from 'lucide-react';

const AIQuiz = ({ article, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // AI Generated Quiz Questions based on article
  const generateQuiz = (article) => {
    return [
      {
        question: `${article.title} haberinde bahsedilen ana konu nedir?`,
        options: [
          article.category,
          "Ekonomi",
          "Spor",
          "Eğlence"
        ],
        correct: 0,
        explanation: `Haber ${article.category} kategorisinde yayınlandı.`
      },
      {
        question: `Bu haberin yayınlanma tarihi ne zaman?`,
        options: [
          "Bugün",
          article.publishedAt,
          "Geçen hafta",
          "Geçen ay"
        ],
        correct: 1,
        explanation: `Haber ${article.publishedAt} yayınlandı.`
      },
      {
        question: `Haberin genel ruh hali nasıl tanımlanabilir?`,
        options: [
          article.mood,
          "Üzücü",
          "Nötr",
          "Kızgın"
        ],
        correct: 0,
        explanation: `Haberin genel tonı ${article.mood} olarak değerlendirildi.`
      }
    ];
  };

  const [questions] = useState(generateQuiz(article));

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 10);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
      const finalScore = selectedAnswer === questions[currentQuestion].correct ? score + 10 : score;
      onComplete(finalScore, questions.length * 10);
    }
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiz Tamamlandı!</h2>
            <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{questions.length * 10}</div>
            <p className="text-slate-600 mb-6">
              {score === questions.length * 10 ? "Mükemmel! Tüm soruları doğru bildin!" : 
               score >= questions.length * 7 ? "Harika! Çok iyi performans gösterdin!" :
               score >= questions.length * 5 ? "İyi! Haberi dikkatli okumuşsun!" :
               "Haberleri daha dikkatli okumaya ne dersin?"}
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Kazanılan XP</span>
                <span className="font-bold text-blue-800">+{score}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <span className="text-amber-700">Bonus Coin</span>
                <span className="font-bold text-amber-800">+{Math.floor(score / 2)}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-6 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Devam Et
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">AI Haber Quiz'i</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-slate-600">
              {currentQuestion + 1}/{questions.length}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              timeLeft > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {timeLeft}s
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium"
          >
            Çıkış
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedAnswer !== null
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Sonraki Soru' : 'Bitir'}
          </button>
        </div>

        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">Bonus İpucu</span>
          </div>
          <p className="text-sm text-slate-600">
            Bu quiz '{article.title}' haberi hakkında. Haberi dikkatli okuduğundan emin ol!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIQuiz;