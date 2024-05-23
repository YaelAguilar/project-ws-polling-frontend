import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <div className="mt-8 flex justify-end">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit Album
      </button>
    </div>
  );
};

export default SubmitButton;
