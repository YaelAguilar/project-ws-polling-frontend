interface SongsUploaderProps {
  onSongUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SongsUploader: React.FC<SongsUploaderProps> = ({ onSongUpload }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload Song Files</h2>
      <div className="bg-gray-800 rounded-lg p-4">
        <input
          className="bg-gray-700 text-white w-full p-2 rounded"
          type="file"
          multiple
          onChange={onSongUpload}
        />
      </div>
    </div>
  );
};

export default SongsUploader;
