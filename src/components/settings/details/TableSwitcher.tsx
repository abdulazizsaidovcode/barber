import React from 'react';

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
  console.log(isOn);
  return (
    <div
      onClick={handleToggle}
      className={`w-15 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${isOn ? 'bg-[#eaeaea]' : 'bg-[#eaeaea]'
        }`}
    >
      <div className='bg-slate-700 w-full rounded-full h-1 flex items-center m-2'>
        <div
          className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-5' : 'translate-x-0'
            }`}
        />
      </div>
    </div>
  );
};

export default Switch;
