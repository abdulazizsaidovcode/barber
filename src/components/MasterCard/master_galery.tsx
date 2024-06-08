import React from 'react';
import { Skeleton } from 'antd';

interface ProcedureItemProps {
  imgUrl: string;
  buttonText: string;
  buttonColor: string;
  icon: React.ReactNode;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({ imgUrl, buttonText, buttonColor, icon }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="flex flex-col items-center border shadow-md p-2">
      {loading && <Skeleton.Image active />}
      <img
        src={imgUrl}
        alt="Procedure"
        className={`mb-2 ${loading ? 'hidden' : 'block'}`}
        onLoad={() => setLoading(false)}
      />
      <button className={`flex items-center justify-center ${buttonColor} text-white py-1 px-2 rounded`}>
        {icon} {buttonText}
      </button>
    </div>
  );
};

export default ProcedureItem;
