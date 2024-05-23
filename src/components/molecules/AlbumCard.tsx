import { Link } from 'react-router-dom';
import { Album } from '../../types';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <Link to={`/album/${album._id}`} className="group">
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
  );
};

export default AlbumCard;
