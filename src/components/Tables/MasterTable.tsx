import React from 'react';
import { IMasterTableProps } from '../../types/master.ts';

const MasterTable: React.FC<IMasterTableProps> = ({ thead, children, px }) => {
  return (
    <div className={`rounded-sm  bg-white ${px ? '' : 'px-5 sm:px-7.5'} pb-2.5 dark:border-strokedark dark:bg-boxdark xl:pb-1`}>
      <div className="max-w-full overflow-x-auto w-[100%]">
        <table className="w-full table-auto">
          <thead>
          <tr className="bg-[#d0eeff] text-left dark:bg-meta-4">
            {thead.map((item) => (
              <th
                key={item.id}
                className="min-w-[150px] p-5 font-medium text-black dark:text-white"
              >
                {item.name}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterTable;
