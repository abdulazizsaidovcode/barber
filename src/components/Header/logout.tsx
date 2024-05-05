import React from 'react';
import { FaArrowRightToBracket } from 'react-icons/fa6';

const Logout = () => {
  return (
    <div>
      <div>
        <button className="bg-[#646262] text-white p-2 rounded-lg flex items-center gap-3  dark:bg-[#9c0a36] lg:px-5">
          Log Out
          <FaArrowRightToBracket />
        </button>
      </div>
    </div>
  );
};

export default Logout;
