import React from 'react';
import CountUp from 'react-countup';

interface CardDataStatsProps {
  title: any;
  total?: any;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title, total }) => {
  return (
    <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-5 flex flex-col  justify-between">
        <span className="text-sm font-medium">{title}</span>
        <h4 className="text-title-md font-bold text-black dark:text-white">
          <CountUp end={total} duration={3} />
        </h4>
      </div>
    </div>
  );
};

export default CardDataStats;
