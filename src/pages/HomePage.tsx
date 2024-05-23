import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/atoms/Header';
import NotificationService from '../services/NotificationService';
import { Album } from '../types';

const HomePage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const subscribeToNewAlbums = async () => {
      try {
        const newAlbum = await NotificationService.waitForNewAlbum();
        setAlbums(prevAlbums => [...prevAlbums, newAlbum]);
        showNotification(newAlbum);
        subscribeToNewAlbums();
      } catch (error) {
        setError('An error occurred while receiving new album notifications');
      }
    };

    subscribeToNewAlbums();

    return () => NotificationService.cancelPolling();
  }, []);

  const showNotification = (album: Album) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow flex items-center space-x-4';
    notification.style.width = '300px';
    notification.style.height = '100px';
    notification.innerHTML = `
      <img src="${album.coverImage}" alt="Cover" class="w-16 h-16 object-cover rounded" />
      <div>
        <strong class="block">¡Nuevo lanzamiento!</strong>
        <span class="block">${album.title}</span>
        <span class="block text-gray-400">${album.artist}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
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
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Melodic Bliss</h1>
                <p className="text-gray-300 max-w-md">
                  Explore a vast library of music, curated for your listening pleasure.
                </p>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    className="pl-10 pr-4 py-2 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                    placeholder="Search for artists, albums, and more"
                    type="search"
                  />
                </div>
              </div>
              <img
                alt="Album Cover"
                className="aspect-square object-cover rounded-xl"
                src="/placeholder.svg"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {albums.map((album) => (
                <Link className="group" to="#" key={album.id}>
                  <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      alt="Album Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={album.coverImage}
                      style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 className="mt-2 text-lg font-medium group-hover:text-indigo-500 transition-colors duration-300">
                    {album.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {album.artist}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default HomePage;
