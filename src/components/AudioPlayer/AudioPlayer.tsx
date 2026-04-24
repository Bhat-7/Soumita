import React, { useState, useRef } from "react";
import IconComponent from "../IconComponent/IconComponent.js";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} autoPlay loop src="../assets/music/sitar1.mp3" />
      <button onClick={togglePlayPause} className="p-2 cursor-pointer">
        {isPlaying ? (
          <IconComponent
            imageSrc="../assets/icons/pause.svg"
            imageText="Pause Music"
          />
        ) : (
          <IconComponent
            imageSrc="../assets/icons/play.svg"
            imageText="Play Music"
          />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
