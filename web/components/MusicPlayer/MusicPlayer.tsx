"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type MusicPlayerHandle = {
  play: () => void;
};

type MusicPlayerProps = {
  src?: string;
  className?: string;
};

const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ src = "/music/wedding-song.m4a", className = "" }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch(() => {
            // autoplay blocked or asset missing — user can still use the toggle
            setHasStarted(true);
          });
      },
    }));

    const toggle = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    };

    if (!hasStarted) return <audio ref={audioRef} src={src} loop preload="none" />;

    return (
      <>
        <audio ref={audioRef} src={src} loop preload="none" />
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          className={[
            "flex h-11 w-11 items-center justify-center rounded-full",
            "border border-gold/50 bg-paper text-gold-dark backdrop-blur-sm",
            "shadow-[0_8px_20px_-8px_rgba(58,54,46,0.3)] transition-transform hover:scale-105",
            "cursor-pointer",
            className,
          ].join(" ")}
        >
          <span
            className={[
              "text-lg leading-none",
              isPlaying ? "animate-spin [animation-duration:4s]" : "",
            ].join(" ")}
          >
            ♪
          </span>
        </button>
      </>
    );
  }
);

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
