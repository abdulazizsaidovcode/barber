import React from 'react';
import { IMasterTableProps } from '../../types/master.ts';

const MasterTable: React.FC<IMasterTableProps> = ({ thead, children }) => {
  return (
    <div
      className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {thead.map(item => (
              <th key={item.id} className="min-w-[150px] p-5 font-medium text-black dark:text-white">
                {item.name}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterTable;
