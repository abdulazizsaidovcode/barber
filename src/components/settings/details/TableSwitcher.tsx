import React from 'react';

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`w-15 h-2 flex items-center rounded-full cursor-pointer transition duration-300 ease-in-out scale-75 sm:scale-100 ${isOn ? 'bg-slate-700' : 'bg-slate-400'
      }`}
    >
      <div
        className={`bg-black dark:bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-10' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default Switch;
