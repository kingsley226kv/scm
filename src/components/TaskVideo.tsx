
import React, { useState, useRef } from 'react';
import { Play, Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';

interface TaskVideoProps {
  videoUrl: string;
  onVideoComplete: () => void;
}

const TaskVideo: React.FC<TaskVideoProps> = ({ videoUrl, onVideoComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoCompleted(true);
    onVideoComplete();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative aspect-video bg-gray-200 rounded-md overflow-hidden"
      >
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrl}
          onEnded={handleVideoEnd}
          controls={false}
        >
          Your browser does not support the video tag.
        </video>
        
        {!videoCompleted && !isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="bg-white bg-opacity-80 rounded-full p-3">
              <Play size={24} />
            </div>
          </div>
        )}

        <button 
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>
      
      {/* Simple play/pause button */}
      {!videoCompleted && (
        <div className="flex gap-2">
          <Button onClick={togglePlay} className="flex-1" variant="outline">
            {isPlaying ? 'Pause Video' : 'Play Video'}
          </Button>
          <Button onClick={toggleFullscreen} variant="outline">
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskVideo;
