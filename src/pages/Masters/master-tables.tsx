import MasterTable from '../../components/Tables/MasterTable.tsx';
import { tbody, thead } from './data.tsx';

const MasterTables = () => {
  return (
    <MasterTable thead={thead}>
      {tbody.map((item, key) => (
        <tr key={key} className={`${key === (tbody.length - 1) ? '' : 'border-b border-[#eee] dark:border-strokedark'}`}>
          <td className={`min-w-[150px] p-5`}>
            <img src={item.img} alt="img" className={'w-10 h-10 scale-[1.4] rounded-full object-cover'} />
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.name}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.category}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.invoiceDate}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.totalSessions}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.rating}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p
              className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                item.status === 'Активный'
                  ? 'bg-success text-success'
                  : 'bg-danger text-danger'
              }`}
            >
              {item.status}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.scheduleType}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.canceled}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.specialization}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.clients}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.phoneNumber}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.placeOfWork}
            </p>
          </td>
          <td className="min-w-[150px] p-5">
            <p className="text-black dark:text-white">
              {item.selfEmployed}
            </p>
          </td>
        </tr>
      ))}
    </MasterTable>
  );
};

export default MasterTables;