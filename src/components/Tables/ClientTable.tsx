import React from 'react';
import { IClientTableProps } from '../../types/client.ts';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const ClientTable: React.FC<IClientTableProps> = ({ thead, children }) => {
  return (
    <div className="rounded-sm bg-white px-5 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto webkit w-[100%]">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#d0eeff] text-left dark:bg-meta-4">
              {thead.map((item) => (
                <th
                  key={item.id}
                  className="min-w-[150px] p-5 font-medium text-black dark:text-white"
                >
                  <p className="flex justify-between items-center">
                    {item.name}
                    <MdOutlineArrowDropDown className="text-[1.5rem]" />
                  </p>
                  <input
                    id={`client${item.id}`}
                    className="mt-4 bg-white dark:bg-black outline-0 px-3 py-1"
                    placeholder="search"
                    type="search"
                  />
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

export default ClientTable;
