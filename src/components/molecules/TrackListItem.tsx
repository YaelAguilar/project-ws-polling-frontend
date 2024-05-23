import PlayButton from '../atoms/PlayButton';

interface TrackListItemProps {
  title: string;
  onClick: () => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({ title, onClick }) => {
  return (
    <li className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
      <span className="text-gray-300">{title}</span>
      <PlayButton onClick={onClick}>Play</PlayButton>
    </li>
  );
};

export default TrackListItem;
