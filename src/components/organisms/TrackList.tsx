import { Song } from '../../types';

interface TrackListProps {
  songs: Song[];
  onPlay: (url: string) => void;
}

const TrackList: React.FC<TrackListProps> = ({ songs, onPlay }) => {
  return (
    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Tracklist</h2>
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
            <span>{song.title}</span>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => onPlay(song.url)}
            >
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
