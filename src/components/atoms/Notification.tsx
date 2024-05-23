import { useEffect, useState } from 'react';
import { Album } from '../../types';

interface NotificationProps {
  album: Album;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ album, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => setVisible(false), 5000);
    const removeTimeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 10000);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-center transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: '300px' }}
    >
      <div className="w-16 h-16 mr-4">
        <img src={album.coverImage} alt="Cover" className="w-full h-full object-cover rounded" />
      </div>
      <div>
        <strong>¡Nuevo lanzamiento!</strong><br />
        {album.title} por {album.artist}
      </div>
    </div>
  );
};

export default Notification;
