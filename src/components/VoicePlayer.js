import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, RotateCcw, FastForward } from 'lucide-react';

const VoicePlayer = ({ article, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  // Simulate audio URL - in real app, this would come from TTS API
  const audioUrl = `https://example.com/tts/${article.id}.mp3`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * duration;
    setCurrentTime(audio.currentTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    audioRef.current.playbackRate = nextRate;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-xl z-40 p-4">
      <audio 
        ref={audioRef}
        src={audioUrl}
        onError={() => {
          console.log('Audio not available - using demo mode');
        }}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-slate-800 text-sm truncate max-w-64">
                {article.title}
              </h4>
              <p className="text-xs text-slate-500">@{article.author} • {article.readTime}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Square className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Play Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                audioRef.current.currentTime = Math.max(0, currentTime - 15);
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="15 saniye geri"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <button
              onClick={togglePlay}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            
            <button
              onClick={() => {
                audioRef.current.currentTime = Math.min(duration, currentTime + 15);
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="15 saniye ileri"
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration || 180)}</span>
            </div>
            <div
              className="w-full h-2 bg-slate-200 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${(currentTime / (duration || 180)) * 100}%` }}
              />
            </div>
          </div>

          {/* Volume & Speed Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={changePlaybackRate}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium transition-colors"
              title="Oynatma hızı"
            >
              {playbackRate}x
            </button>
            
            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-slate-600 hover:text-slate-800">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-200 rounded-full outline-none"
              />
            </div>
          </div>
        </div>

        {/* AI Voice Info */}
        <div className="flex items-center justify-center mt-3 space-x-2 text-xs text-slate-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI Ses Sentezi • Yapay zeka tarafından oluşturulmuş ses</span>
        </div>
      </div>
    </div>
  );
};

export default VoicePlayer;