import AlbumCard from '../molecules/AlbumCard';
import { Album } from '../../types';

interface AlbumListProps {
  albums: Album[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {albums.map(album => (
        <AlbumCard key={album._id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;
