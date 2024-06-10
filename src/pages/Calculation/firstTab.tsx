import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  DatePickerProps,
  Popover,
  Pagination,
} from "antd";
import MasterTable from "../../components/Tables/MasterTable";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import orderStore from "../../helpers/state_managment/order/orderStore";

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const { data, totalPage } = orderStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
                <td className="flex items-center justify-center">
                  <Popover
                    content={
                      <div>
                        <Button
                          onClick={() => navigate(`/orders/${data.orderId}`)}
                        >
                          Открыть
                        </Button>
                      </div>
                    }
                    placement="bottomRight"
                    className="flex items-center justify-center"
                    title="Title"
                    trigger="click"
                  >
                    <Button> . . . </Button>
                  </Popover>
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
