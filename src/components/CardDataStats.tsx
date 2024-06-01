import React from 'react';
import CountUp from 'react-countup';

interface CardDataStatsProps {
  title: any;
  total: any;
  
  // rate: string;
  // levelUp?: boolean;
  // levelDown?: boolean;
  // children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  // rate,
  // levelUp,
  // levelDown,
  // children,
}) => {
  return (
    <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-center justify-between ">
        <div>
          <span className="text-sm font-medium">{title}</span>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            <CountUp end={total} duration={3}/>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
