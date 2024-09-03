/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { useRef, useState } from 'react';
import { MdOutlinePlayCircle, MdOutlineMotionPhotosPaused } from 'react-icons/md';
import styles from '@/src/styles/app.module.css';

type Props = {
  source: string;
};

export default function AudioPlayback({ source }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null!);
  const handlePlayPause = () => {
    if (!isPlaying) {
      // stop all other audio
      const allAudios = document.querySelectorAll('audio');
      allAudios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      // play the clicked audio only
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <audio onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} ref={audioRef}>
        <source src={source} type='audio/mpeg' />
      </audio>
      <button className={styles.playPauseButton} onClick={handlePlayPause}>
        {isPlaying ? <MdOutlineMotionPhotosPaused /> : <MdOutlinePlayCircle />}
      </button>
    </>
  );
}
