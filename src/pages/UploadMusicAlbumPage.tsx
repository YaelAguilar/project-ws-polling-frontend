import { Link } from 'react-router-dom';
import UploadMusicAlbum from '../components/organisms/UploadMusicAlbum';

const UploadMusicAlbumPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <Link to="/" className="inline-block mb-4">
          <button className="bg-indigo-500 hover:bg-indigo-300 text-white font-bold py-2 px-4 rounded">
            &larr; Volver a la página principal
          </button>
        </Link>
        <UploadMusicAlbum />
      </div>
    </div>
  );
}

export default UploadMusicAlbumPage;
