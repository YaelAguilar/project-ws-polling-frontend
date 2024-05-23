import { forwardRef } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../../styles/customAudioPlayer.css';

const AudioPlayer = forwardRef<H5AudioPlayer>((_props, ref) => {
  return (
    <H5AudioPlayer
      ref={ref}
      className="custom-audio-player"
      autoPlay={false}
    />
  );
});

export default AudioPlayer;
