import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "--",
      minute: "--",
    },
    totalTime: {
      second: "--",
      minute: "--",
    },
  });

  // Update time and seek bar
  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          (audioRef.current.currentTime / audioRef.current.duration) * 100 + "%";

        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, []);

  // Play song
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Pause song
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Play with id
  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Previous song
  const before = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
    } else {
      await setTrack(songsData[songsData.length - 1]);
    }
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Next song
  const after = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
    } else {
      await setTrack(songsData[0]);
    }
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Auto play when track changes
  useEffect(() => {
    audioRef.current.play();
    setPlayStatus(true);
  }, [track]);

  // Auto next song when current song ends
  useEffect(() => {
    audioRef.current.onended = () => {
      after();
    };
  }, [track]);

  // Seek bar click
  const seekBgClick = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    playStatus,
    time,
    play,
    pause,
    playWithId,
    before,
    after,
    seekBgClick,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      <audio ref={audioRef} src={track.file} />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;