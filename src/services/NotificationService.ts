import { Album } from '../types';

const NotificationService = {
  waitForNewAlbum: async (): Promise<Album> => {
    const response = await fetch('http://localhost:8080/api/albums/notifications');
    if (!response.ok) {
      throw new Error('Failed to fetch new album notification');
    }
    const data = await response.json();
    return data.album;
  },

  cancelPolling: () => {
    // Implementación para cancelar la encuesta si es necesario
  },
};

export default NotificationService;
