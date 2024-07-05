import { Pagination, Space, Dropdown } from 'antd';
import MasterTable from '../../components/Tables/MasterTable';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import orderStore from '../../helpers/state_managment/order/orderStore';
import { CiMenuKebab } from 'react-icons/ci';
import FilterOrder from './filter/filter';
import { useEffect } from 'react';
import { getOrder } from '../../helpers/api-function/order/orderFunction';

const FilterComponent: React.FC = () => {
  const {
    data,
    totalPage,
    setPage,
    setSize,
    setData,
    setTotalPage,
    setStatus,
  } = orderStore();
  const { t } = useTranslation();

  useEffect(() => {
    setStatus('UPCOMING');
    localStorage.setItem('orderStatus', 'UPCOMING');
    getOrder({
      status: 'UPCOMING',
      setData: setData,
      setTotalPage: setTotalPage,
    });
  }, []);

  const tableHeaders = [
    { id: 1, name: t('order_table_client') },
    { id: 2, name: t('order_table_procedure') },
    { id: 3, name: t('order_table_date') },
    { id: 4, name: t('order_table_time') },
    { id: 5, name: t('order_table_cost') },
    { id: 6, name: t('order_table_prepayment') },
    { id: 7, name: t('order_table_paid') },
    { id: 8, name: t('order_table_paymentType') },
    { id: 9, name: t('order_table_pay') },
    { id: 10, name: t('order_table_status') },
    { id: 11, name: t('master') },
    { id: 12, name: '' },
  ];

  const onChange = (page: number, size: number): void => {
    setPage(page - 1);
    setSize(size);
  };

  const itemRender = (_: any, type: string, originalElement: any) => {
    if (type === 'page') {
      return (
        <a className="shadow-none dark:bg-[#9c0a36] dark:text-white border dark:border-[#9c0a36] border-black rounded no-underline">
          {originalElement}
        </a>
      );
    }
    return originalElement;
  };
  return (
    <div className="p-5 rounded-lg shadow-md mb-5 dark:bg-boxdark bg-white">
      {/* Top filters row */}
      <FilterOrder />
      <div>
        <MasterTable thead={tableHeaders}>
          {data.length !== 0 ? (
            data.map((data, i) => (
              <tr key={i} className="dark:text-white">
                <td className="p-5">
                  <div className="flex flex-col justify-start gap-1">
                    <p>
                      {data
                        ? data.clientFullName
                          ? data.clientFullName
                          : t('No_data')
                        : t('No_data')}
                    </p>
                    <p>
                      {data
                        ? data.clientPhone
                          ? data.clientPhone
                          : t('No_data')
                        : t('No_data')}
                    </p>
                  </div>
                </td>
                <td className="p-5">
                  {data
                    ? data.serviceName
                      ? data.serviceName
                      : t('No_data')
                    : t('No_data')}
                </td>
                <td className="p-5">
                  {data
                    ? data.orderDate
                      ? data.orderDate
                      : t('No_data')
                    : t('No_data')}
                </td>
                <td className="p-5">
                  <div className="bg-blue-500 rounded-md flex items-center gap-2 justify-center p-1">
                    <p>
                      {data
                        ? data.orderFrom
                          ? data.orderFrom
                          : t('No_data')
                        : t('No_data')}
                    </p>
                    <p>-</p>
                    <p>
                      {data
                        ? data.orderTo
                          ? data.orderTo
                          : t('No_data')
                        : t('No_data')}
                    </p>
                  </div>
                </td>
                <td className="p-5">
                  {data
                    ? data.price
                      ? data.price
                      : t('No_data')
                    : t('No_data')}
                </td>
                <td className="p-5">
                  {data
                    ? data.prePayment
                      ? data.prePayment
                      : t('No_data')
                    : t('No_data')}
                </td>
                <td className="p-5">
                  {data ? (data.paid ? data.paid : t('No_data')) : t('No_data')}
                </td>
                <td className="p-5">
                  {data.paymentTypes === null
                    ? t('Not_available')
                    : data
                    ? data.paymentTypes
                      ? data.paymentTypes
                      : t('No_data')
                    : t('No_data')}
                </td>
                <td className="p-5">
                  {data
                    ? data.toPay
                      ? data.toPay
                      : t('No_data')
                    : t('No_data')}
                </td>
                <td className="p-5">
                  {data && data.orderStatus === 'COMPLETED' ? 'true' : 'false'}
                </td>
                <td className="p-5">
                  <div className="flex flex-col justify-start gap-1">
                    <p>
                      {data
                        ? data.masterFullName
                          ? data.masterFullName
                          : t('No_data')
                        : t('No_data')}
                    </p>
                    <p>
                      {data
                        ? data.masterPhone
                          ? data.masterPhone
                          : t('No_data')
                        : t('No_data')}
                    </p>
                  </div>
                </td>

                <td className="min-w-[150px] p-5 flex items-center justify-between">
                  <Space direction="vertical">
                    <Space wrap>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: '1',
                              label: (
                                <Link to={`/orders/${data.orderId}`}>
                                  {t('Open')}
                                </Link>
                              ),
                            },
                          ],
                        }}
                        placement="bottomLeft"
                        arrow
                      >
                        <CiMenuKebab className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200" />
                      </Dropdown>
                    </Space>
                  </Space>
                </td>
              </tr>
            ))
          ) : (
            <tr className={`border-b border-[#eee] dark:border-strokedark`}>
              <td
                className="min-w-full dark:text-white text-center py-10 text-xl font-bold"
                colSpan={7}
              >
                Malumot mavjud emas!
              </td>
            </tr>
          )}
        </MasterTable>
        <Pagination
          // showSizeChanger={false}
          responsive={true}
          defaultCurrent={1}
          total={totalPage}
          onChange={onChange}
          rootClassName={`mt-10 mb-5 ms-5`}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
