import { Album } from '../types';

const waitForNewAlbum = async (): Promise<Album> => {
  const response = await fetch('http://localhost:8080/api/albums/notifications');
  if (!response.ok) {
    throw new Error('Failed to fetch new album notification');
  }
  const data = await response.json();
  return data.album;
};

const cancelPolling = () => {
  // En caso de que se necesite cancelar el long polling
};

export default { waitForNewAlbum, cancelPolling };
