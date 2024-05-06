import React from 'react'
import Input from '../../../../components/inputs'
import DeptyFilter from '../../../../components/filter/deptyfilter'
import Button from '../../../../components/buttons/buttons';
import DataTable from '../../../../components/table/dataTable';

const Report = () => {
    const Filters = {
        Countries: ["Deselect all"],
        Cities: ["List empty"],
        Area: ["List empty"],
       
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
    <div className='custom-container py-14'>
    <h1 className="text-2xl font-bold ">Report</h1>
    <div className='flex mt-4 w-[20%]' >
        <Input placeholder='Search' label='Filter'/>
    </div>
    <div className="flex  p-2 mt-4 ">
        <DeptyFilter filters={Filters} />
        <Button
            name={"Filter"}
            style={"text-white bg-[#17a2b8] ml-2 h-10  mt-5 "}
            
          />
        </div>
        <div className="">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  )
}

export default Report