import React from 'react';

interface AlbumDetailsFormProps {
  albumTitle: string;
  setAlbumTitle: React.Dispatch<React.SetStateAction<string>>;
  artistName: string;
  setArtistName: React.Dispatch<React.SetStateAction<string>>;
  releaseDate: string;
  setReleaseDate: React.Dispatch<React.SetStateAction<string>>;
}

const AlbumDetailsForm: React.FC<AlbumDetailsFormProps> = ({
  albumTitle, setAlbumTitle, artistName, setArtistName, releaseDate, setReleaseDate
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Album Details</h2>
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="space-y-4">
          <input
            className="bg-gray-700 text-white w-full p-2 rounded"
            placeholder="Enter album title"
            type="text"
            value={albumTitle}
            onChange={e => setAlbumTitle(e.target.value)}
          />
          <input
            className="bg-gray-700 text-white w-full p-2 rounded"
            placeholder="Enter artist name"
            type="text"
            value={artistName}
            onChange={e => setArtistName(e.target.value)}
          />
          <input
            className="bg-gray-700 text-white w-full p-2 rounded"
            placeholder="dd / mm / yyyy"
            type="date"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsForm;
