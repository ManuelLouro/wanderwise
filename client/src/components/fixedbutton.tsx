import React from 'react';
import Hamburger from './hamburger';

interface FixedButtonProps {
  onClick: () => void;
}

const FixedButton: React.FC<FixedButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 p-4 bg-green-300 text-white rounded-full shadow-lg cursor-pointer z-50"
      onClick={onClick}
    >
      <Hamburger />
    </button>
  );
};

export default FixedButton;

