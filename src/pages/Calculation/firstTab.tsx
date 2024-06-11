import { Select, Button, Popover, Pagination, Space, Dropdown } from "antd";
import MasterTable from "../../components/Tables/MasterTable";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import orderStore from "../../helpers/state_managment/order/orderStore";
import { CiMenuKebab } from "react-icons/ci";
import FilterOrder from "./filter/filter";

const FilterComponent: React.FC = () => {
  const { data, totalPage } = orderStore();
    const { t } = useTranslation();

  const tableHeaders = [
    { id: 1, name: t("order_table_client") },
    { id: 2, name: t("order_table_procedure") },
    { id: 3, name: t("order_table_date") },
    { id: 4, name: t("order_table_time") },
    { id: 5, name: t("order_table_cost") },
    { id: 6, name: t("order_table_prepayment") },
    { id: 7, name: t("order_table_paid") },
    { id: 8, name: t("order_table_paymentType") },
    { id: 9, name: t("order_table_pay") },
    { id: 10, name: t("order_table_status") },
    { id: 11, name: t("order_table_master") },
    { id: 12, name: "" },
  ];

  return (
    <div className="p-5 rounded-lg shadow-md mb-5 dark:bg-boxdark bg-white">
      {/* Top filters row */}

      <FilterOrder/>

      <div>
        <MasterTable thead={tableHeaders}>
          {data.length !== 0 ? (
            data.map((data, i) => (
              <tr key={i} className="dark:text-white">
                <td className="p-5">
                  <div className="flex flex-col justify-start gap-1">
                    <p>{data.clientFullName}</p>
                    <p>{data.clientPhone}</p>
                  </div>
                </td>
                <td className="p-5">{data.serviceName}</td>
                <td className="p-5">{data.orderDate}</td>
                <td className="p-5">
                  <div className="bg-blue-500 rounded-md flex items-center gap-2 justify-center p-1">
                    <p>{data.orderFrom}</p>
                    <p>-</p>
                    <p>{data.orderTo}</p>
                  </div>
                </td>
                <td className="p-5">{data.price}</td>
                <td className="p-5">{data.prePayment}</td>
                <td className="p-5">{data.paid}</td>
                <td className="p-5">
                  {data.paymentTypes === null
                    ? "Mavjud emas"
                    : data.paymentTypes}
                </td>
                <td className="p-5">{data.toPay}</td>
                <td className="p-5">
                  {data.orderStatus === "COMPLETED" ? "true" : "false"}
                </td>
                <td className="p-5">
                  <div className="flex flex-col justify-start gap-1">
                    <p>{data.masterFullName}</p>
                    <p>{data.masterPhone}</p>
                  </div>
                </td>

                <td className="min-w-[150px] p-5 flex items-center justify-between">
                  <Space direction="vertical">
                    <Space wrap>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "1",
                              label: (
                                <Link to={`/orders/${data.orderId}`}>{t("Open")}</Link>
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
                className="min-w-full text-center py-10 text-xl font-bold"
                colSpan={7}
              >
                Malumot mavjud emas!
              </td>
            </tr>
          )}
        </MasterTable>
        {data.length !== 0 ? (
          <Pagination
            showSizeChanger={false}
            responsive={true}
            defaultCurrent={1}
            total={totalPage}
            // onChange={onChange}
            rootClassName={`mt-10 mb-5 ms-5`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
