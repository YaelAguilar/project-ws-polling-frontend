import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import useWebSocket from 'react-use-websocket';
import TrackList from '../components/organisms/TrackList';
import { Album, Song } from '../types';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioPlayerRef = useRef<H5AudioPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ignoreSeekMessage, setIgnoreSeekMessage] = useState(false);

  // Configuración de WebSocket
  const { sendMessage, lastMessage } = useWebSocket(`ws://localhost:8080`, {
    onOpen: () => {
      console.log('WebSocket connection opened');
      sendMessage(JSON.stringify({ type: 'join', payload: { room: id } }));
    },
  });

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/albums/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Album = await response.json();
        setAlbum(data);
      } catch (error) {
        setError('Error fetching album');
      }
    };

    fetchAlbum();
  }, [id]);

  const handlePlay = useCallback((url: string, currentTime: number = 0) => {
    console.log(`Playing URL: ${url} from ${currentTime}`);
    if (audioPlayerRef.current) {
      const audioElement = audioPlayerRef.current.audio.current;
      if (audioElement) {
        if (audioElement.src !== url) {
          audioElement.src = url;
        }
        audioElement.currentTime = currentTime;
        audioElement.play()
          .then(() => {
            setIsPlaying(true);
            sendMessage(JSON.stringify({ type: 'control', payload: { room: id, action: 'play', url, time: currentTime } }));
          })
          .catch((err) => console.error('Error playing audio:', err));
      }
    }
  }, [id, sendMessage]);

  const handlePause = useCallback(() => {
    console.log('Pausing audio');
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current?.pause();
      setIsPlaying(false);
      sendMessage(JSON.stringify({ type: 'control', payload: { room: id, action: 'pause' } }));
    }
  }, [id, sendMessage]);

  const handleSeek = useCallback((currentTime: number) => {
    console.log(`Seeking audio to: ${currentTime}`);
    if (audioPlayerRef.current) {
      const audioElement = audioPlayerRef.current.audio.current;
      if (audioElement) {
        setIgnoreSeekMessage(true); // Ignorar el próximo mensaje de seek
        audioElement.currentTime = currentTime;
        sendMessage(JSON.stringify({ type: 'control', payload: { room: id, action: 'seek', time: currentTime } }));
        setTimeout(() => setIgnoreSeekMessage(false), 1000); // Ignorar mensajes de seek por 1 segundo
      }
    }
  }, [id, sendMessage]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      console.log('WebSocket Message Received:', data);

      if (data.type === 'control') {
        if (data.action === 'play') {
          if (!isPlaying) {
            handlePlay(data.url, data.time);
          }
        } else if (data.action === 'pause') {
          if (isPlaying) {
            handlePause();
          }
        } else if (data.action === 'seek') {
          if (!ignoreSeekMessage) {
            setIgnoreSeekMessage(true);
            if (audioPlayerRef.current) {
              const audioElement = audioPlayerRef.current.audio.current;
              if (audioElement) {
                audioElement.currentTime = data.time;
                setTimeout(() => setIgnoreSeekMessage(false), 1000);
              }
            }
          }
        }
      }
    }
  }, [lastMessage, handlePlay, handlePause, handleSeek, isPlaying, ignoreSeekMessage]);

  const handleTrackPlay = (url: string) => {
    console.log(`Track play requested: ${url}`);
    if (audioPlayerRef.current) {
      handlePlay(url, audioPlayerRef.current.audio.current?.currentTime || 0);
    }
  };

  const handleTrackPause = () => {
    console.log('Track pause requested');
    handlePause();
  };

  const handleTrackSeeked = (event: Event) => {
    const audioElement = event.target as HTMLAudioElement;
    const currentTime = audioElement.currentTime;
    console.log(`Track seeked to: ${currentTime}`);
    if (!ignoreSeekMessage) {
      handleSeek(currentTime);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!album) {
    return <div>Loading...</div>;
  }

  const transformedSongs: Song[] = album.songs.map((song) => ({
    url: song.url,
    title: song.title,
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <Link to="/" className="inline-block mb-4">
          <button className="bg-indigo-500 hover:bg-indigo-300 text-white font-bold py-2 px-4 rounded">
            &larr; Volver a la página principal
          </button>
        </Link>
        <div className="text-center">
          <img
            src={album.coverImage}
            alt={album.title}
            className="mx-auto mb-4 rounded-lg shadow-md"
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
          />
          <h1 className="text-4xl font-bold mb-2">{album.title}</h1>
          <h2 className="text-2xl mb-4">{album.artist}</h2>
          <p className="text-gray-400">Released on {new Date(album.releaseDate).toLocaleDateString()}</p>
        </div>
        <TrackList songs={transformedSongs} onPlay={handleTrackPlay} />
        <H5AudioPlayer
          ref={audioPlayerRef}
          className="custom-audio-player mt-8"
          autoPlay={false}
          onPlay={() => handleTrackPlay(transformedSongs[0].url)}
          onPause={handleTrackPause}
          onSeeked={(event) => handleTrackSeeked(event as unknown as Event)}
          onError={(e) => console.error('Audio error:', e)}
        />
      </div>
    </div>
  );
};

export default AlbumPage;
