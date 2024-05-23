interface SongListProps {
    songs: File[];
    onRemoveSong: (index: number) => void;
  }
  
  const SongList: React.FC<SongListProps> = ({ songs, onRemoveSong }) => {
    return (
      <div className="mt-4 col-span-2">
        <h2 className="text-xl font-bold mb-4">Uploaded Songs</h2>
        <ul className="space-y-2">
          {songs.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <span>{file.name}</span>
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => onRemoveSong(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SongList;
  