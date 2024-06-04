// src/components/client-tables.tsx

import ClientTable from "../../components/Tables/ClientTable.tsx";
import { thead } from "./data.tsx";
import { CiMenuKebab } from "react-icons/ci";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Filters from "./filters/filters.tsx";
import React, { useEffect } from "react";
import clientFilterStore from "../../helpers/state_managment/client/clientFilterStore.tsx";
import { getClients } from "../../helpers/api-function/client/client.tsx";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Открыть",
  },
  {
    key: "2",
    label: "Заблокировать",
  },
  {
    key: "3",
    label: "Разблокировать",
  },
  {
    key: "7",
    label: "Написать",
  },
];

const ClientTables: React.FC = () => {
  const {
    setClientFilterData,
    setClientTotalPage,
    clientFilterData,
  } = clientFilterStore();

  useEffect(() => {
    getClients({
      setData: setClientFilterData,
      setTotalPage: setClientTotalPage,
    });
  }, []);

  

  return (
    <>
      <Filters />
      <ClientTable thead={thead}>
        {clientFilterData.map((item, key) => (
          <tr
            key={key}
            className={`${
              key === clientFilterData.length - 1
                ? ""
                : "border-b border-[#eee] dark:border-strokedark"
            }`}
          >
            <td className={`min-w-[150px] p-5`}>
              <img
                src={item ? item.imgUrl ? item.imgUrl: "" : ""}
                alt="img"
                className={"w-10 h-10 scale-[1.4] rounded-full object-cover"}
              />
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item ? item.fullName ? item.fullName : "No data" : "No data"}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.registrationDate ? item.registrationDate : "No data" : "No data"}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.phoneNumber ? item.phoneNumber : "No data" : "No data"}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.completedOrder ? item.completedOrder : 0 : 0}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.turnover ? item.turnover : "No data" : "No data"}</p>
            </td>
           
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.age ? `${item.age} лет` : "No data" : "No data"}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.masterCount ? item.masterCount : 0 : 0}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{ item ? item.canceledOrder ? item.canceledOrder : 0 : 0}</p>
            </td>
            <td className="min-w-[150px] p-5 flex items-center justify-between">
              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  item.status === "ACTIVE"
                    ? "bg-success text-success"
                    : "bg-danger text-danger"
                }`}
              >
                {item.status}
              </p>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                    <CiMenuKebab className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200" />
                  </Dropdown>
                </Space>
              </Space>
            </td>
          </tr>
        ))}
      </ClientTable>
    </>
  );
};

export default ClientTables;
