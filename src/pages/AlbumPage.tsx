import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import TrackList from '../components/organisms/TrackList';
import { Album, Song } from '../types';

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioPlayerRef = useRef<H5AudioPlayer>(null);

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

  const handlePlay = (url: string) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current?.pause();
      audioPlayerRef.current.audio.current?.setAttribute('src', url);
      audioPlayerRef.current.audio.current?.play();
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!album) {
    return <div>Loading...</div>;
  }

  const transformedSongs: Song[] = album.songs.map((song) => {
    return {
      url: song.url,
      title: song.title
    };
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4 md:px-6 lg:px-8">
      <Link to="/" className="inline-block mb-4">
          <button className="bg-indigo-500 hover:bg-indigo-300 text-white font-bold py-2 px-4 rounded">
            &larr; Volver a la página principal
          </button>
        </Link>
      <div className="container mx-auto">
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
        <TrackList songs={transformedSongs} onPlay={handlePlay} />
        <H5AudioPlayer ref={audioPlayerRef} className="custom-audio-player mt-8" autoPlay />
      </div>
    </div>
  );
};

export default AlbumPage;
