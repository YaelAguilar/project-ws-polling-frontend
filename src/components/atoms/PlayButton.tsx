
interface PlayButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PlayButton;
