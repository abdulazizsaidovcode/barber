import React from "react";
import Input from "../../../../components/inputs";
import Button from "../../../../components/buttons/buttons";
import DeptyFilter from "../../../../components/filter/deptyfilter";
import { NavigationBetweenPages } from "../../../../components/navigation";
import From from "../../../../components/filter/fromflter";
import DataTable from "../../../../components/table/dataTable";

const Alarms = () => {
  const Filters = {
    Countries: ["Deselect all"],
    Cities: ["List empty"],
    Area: ["List empty"],
    Type: ["Falling alarm"],
  };
  const tHead = [
    { name: "Customer name" },
    { name: "Status" },
    { name: "Type" },
    { name: "Cost" },
    { name: "Created date" },
    { name: "Transaction date" },
    { name: "Number" },
    { name: "Fort responce" },
    { name: "Payment option" },
    { name: "Region" },
    { name: "Actions" },
  ];
  const columns = [
    {
      field: "lskd",
      tHead: "Region",
    },
    {
      field: "dsf",
      tHead: "Minutes",
    },
    {
      field: "dsf",
      tHead: "Cost",
    },
    {
      field: "dsf",
      tHead: "Expire days",
    },
    {
      field: "dsf",
      tHead: "Created date",
    },
    {
      field: "dsf",
      tHead: "Is active",
    },
    {
      field: "dsf",
      tHead: "Actions",
    },
  ];
  const data = [
    {
      lskd: "1",
      dsf: "0"
    }
  ]
  return (
    <div className="custom-container py-14">
      <div className="flex">
        <NavigationBetweenPages />  
      </div>
      <div className="flex items-center justify-between">

      <div className="flex flex-col   mt-4">
        <Input placeholder="Qr code" label="Filter" /> 
      </div>
      <div className="flex justify-end">
          <Button
            name={"Export all"}
            style={"text-white bg-green-800 ml-2 p-2  "}
          />
          <Button
            name={"Export table"}
            style={"text-white bg-green-800 ml-2  "}
          />
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <DeptyFilter filters={Filters} />
        <From/>
      </div>
      <div className="mt-2">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Alarms;
