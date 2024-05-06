import React from 'react'


const Sms = () => {
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
      tHead: "Phone number",
    },
    {
      field: "dsf",
      tHead: "Sent date",
    },
    {
      field: "dsf",
      tHead: "Provider",
    },
    {
      field: "dsf",
      tHead: "Error",
    },
    {
      field: "dsf",
      tHead: "Activation code",
    },
    {
      field: "dsf",
      tHead: "Confirmed",
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
      <div className='flex w-[40%]'>
        <input placeholder=' Search query' />
      </div>
      <div className="mt-3">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  )
}

export default Sms