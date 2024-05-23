import { useState, useEffect } from 'react';
import Header from '../components/atoms/Header';
import NotificationService from '../services/NotificationService';
import { Album } from '../types';
import AlbumList from '../components/organisms/AlbumList';
import Notification from '../components/atoms/Notification';

const HomePage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/albums');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
    const interval = setInterval(fetchAlbums, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const subscribeToNewAlbums = async () => {
      while (isSubscribed) {
        try {
          const newAlbum = await NotificationService.waitForNewAlbum();
          setAlbums(prevAlbums => [...prevAlbums, newAlbum]);
          setNotifications(prevNotifications => [...prevNotifications, newAlbum]);
        } catch (error) {
          setError('An error occurred while receiving new album notifications');
        }
      }
    };

    subscribeToNewAlbums();

    return () => {
      isSubscribed = false;
      NotificationService.cancelPolling();
    };
  }, []);

  const handleNotificationClose = (index: number) => {
    setNotifications(prevNotifications => prevNotifications.filter((_, i) => i !== index));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col items-center">
        <section className="py-12 md:py-20 bg-gradient-to-r from-indigo-950 to-purple-950 w-full">
          <div className="container mx-auto px-4 md:px-6 lg:w-3/4">
            <div className="grid gap-8 md:grid-cols-[1fr_400px] md:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Spotifake 2</h1>
                <p className="text-gray-300 max-w-md">
                  Explore a vast library of music, curated for your listening pleasure.
                </p>
              </div>
              <img
                alt="Album Cover"
                className="aspect-square object-cover rounded-xl"
                src="https://img.icons8.com/?size=100&id=11116&format=png&color=7950F2"
              />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 w-full">
          <div className="container mx-auto px-4 md:px-6 lg:w-3/4">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Albums</h2>
              <p className="text-gray-400">Discover the latest and greatest albums in our library.</p>
            </div>
            <AlbumList albums={albums} />
          </div>
        </section>
      </div>
      {notifications.map((album, index) => (
        <Notification key={index} album={album} onClose={() => handleNotificationClose(index)} />
      ))}
    </>
  );
};

export default HomePage;
