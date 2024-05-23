import React from 'react';

interface AlbumCoverUploaderProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AlbumCoverUploader: React.FC<AlbumCoverUploaderProps> = ({ onImageUpload }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Album Cover Image</h2>
      <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
        <input 
          type="file" 
          id="coverImage" 
          className="hidden" 
          onChange={onImageUpload} 
          accept="image/*"
        />
        <label 
          htmlFor="coverImage" 
          className="cursor-pointer bg-blue-500 text-white p-2 rounded">
          Choose Image
        </label>
      </div>
    </div>
  );
};

export default AlbumCoverUploader;
