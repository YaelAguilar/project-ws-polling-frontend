import { useState } from 'react';
import AlbumCoverUploader from '../molecules/AlbumCoverUploader';
import AlbumDetailsForm from '../molecules/AlbumDetailsForm';
import SongsUploader from '../molecules/SongsUploader';
import SubmitButton from '../atoms/SubmitButton';
import Swal from 'sweetalert2';

const UploadMusicAlbum: React.FC = () => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [songFiles, setSongFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSongUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSongFiles(Array.from(event.target.files));
    }
  };

  const handleRemoveImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
  };

  const handleRemoveSong = (index: number) => {
    const updatedSongs = [...songFiles];
    updatedSongs.splice(index, 1);
    setSongFiles(updatedSongs);
  };

  const showAlert = (title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info') => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!coverImage || songFiles.length === 0) {
      showAlert('Error', 'Please upload both cover image and at least one song.', 'error');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', albumTitle);
    formData.append('artist', artistName);
    formData.append('releaseDate', releaseDate);
    formData.append('coverImage', coverImage);
    songFiles.forEach(file => formData.append('songs', file));

    try {
      const response = await fetch('http://localhost:8080/api/albums', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        showAlert('Success', 'Album uploaded successfully!', 'success');
        console.log(data);
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to upload album');
      }
    } catch (error) {
      if (error instanceof Error) {
        showAlert('Error', error.message, 'error');
      } else {
        showAlert('Error', 'An unexpected error occurred.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8 text-white flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-8">Upload Music Album</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AlbumCoverUploader onImageUpload={handleImageUpload} />
          {coverImagePreview && (
            <div className="mt-4">
              <img
                src={coverImagePreview}
                alt="Cover Preview"
                className="rounded-lg"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
              <button
                type="button"
                className="mt-2 bg-red-500 text-white p-2 rounded"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
        <AlbumDetailsForm
          albumTitle={albumTitle} setAlbumTitle={setAlbumTitle}
          artistName={artistName} setArtistName={setArtistName}
          releaseDate={releaseDate} setReleaseDate={setReleaseDate}
        />
        <SongsUploader onSongUpload={handleSongUpload} />
        {songFiles.length > 0 && (
          <div className="mt-4 col-span-2">
            <h2 className="text-xl font-bold mb-4">Uploaded Songs</h2>
            <ul className="space-y-2">
              {songFiles.map((file, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleRemoveSong(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="col-span-2 flex justify-center">
          <SubmitButton />
        </div>
      </form>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-white">Please wait...</p>
          </div>
        </div>
      )}
    </main>
  );
  
};

export default UploadMusicAlbum;
