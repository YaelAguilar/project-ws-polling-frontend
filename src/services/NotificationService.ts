
import { Album } from '../types';

const waitForNewAlbum = (onNewAlbum: (album: Album) => void) => {
  const eventSource = new EventSource('http://localhost:8080/api/albums/notifications');
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onNewAlbum(data.album);
  };
  return () => eventSource.close();
};

export default { waitForNewAlbum };
