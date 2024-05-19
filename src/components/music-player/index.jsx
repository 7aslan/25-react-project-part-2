import { useState, useRef, useEffect } from "react";
import './music-player.css'

function MusicPlayer() {
  const tracks = [
    {
      title: "Track 1",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Track 2",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: "https://via.placeholder.com/150",
    },
    // Add more tracks as needed
  ];
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusicTrack, setCurrentMusicTrack] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTrackProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  function handlePauseAndPlay() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleSkipTrack(getDirection) {
    if (getDirection === "forward") {
      setCurrentMusicTrack((prevTrack) => (prevTrack + 1) % tracks.length);
    } else if (getDirection === "backward") {
      setCurrentMusicTrack(
        (prevTrack) => (prevTrack - 1 + tracks.length) % tracks.length
      );
    }
    setTrackProgress(0);
  }

  return (
    <div className="music-player">
      <h1>Music PLayer</h1>
      <h2>{tracks[currentMusicTrack].title}</h2>
      <img
        src={tracks[currentMusicTrack].image}
        alt={tracks[currentMusicTrack].title}
      />
      <audio ref={audioRef} src={tracks[currentMusicTrack].source} />
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${trackProgress}%`,
            background: isPlaying ? "#3498db" : "#443636",
            height: "15px",
          }}
        ></div>
      </div>
      <div className="track-controls">
        <button onClick={() => handleSkipTrack("backward")}>Backward</button>
        <button onClick={handlePauseAndPlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={() => handleSkipTrack("forward")}>Forward</button>
      </div>
    </div>
  );
}

export default MusicPlayer;
