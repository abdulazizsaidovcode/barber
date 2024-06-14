import ClientTable from "../../components/Tables/MasterTable.tsx";
import { CiMenuKebab } from "react-icons/ci";
import type { MenuProps } from "antd";
import { Dropdown, Menu, Pagination, Space } from "antd";
import Filters from "./filters/filters.tsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clientFilterStore from "../../helpers/state_managment/client/clientFilterStore.tsx";
import { Buttons } from "../../components/buttons/index.tsx";
import Modal from "../../components/modals/modal.tsx";
import { updateClientStatus } from "../../helpers/api-function/client/clientFilter.tsx";
import { getFileId } from "../../helpers/api.tsx";
import ClientModal from "./client-modal.tsx";

export interface UpdateStatus {
  status: string;
  id: string;
}

const ClientTables: React.FC = () => {
  const { t } = useTranslation();
  const { clientFilterData,totalPage,setPage, setClientFilterData, setIsModal, setIsLoading, isLoading, isModal, setClientTotalPage, setIsMessageModal, isMessageModal, setid } = clientFilterStore();
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    status: "",
    id: "",
  });

  const onChange = (page: number): void => setPage(page - 1)


  const openIsModal = () => setIsModal(!isModal)
  const openIsMessageModal = () => setIsMessageModal(!isMessageModal)

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

  const thead = [
    {
      id: 1,
      name: t("Photo"),
    },
    {
      id: 2,
      name: t("Client"),
    },
    {
      id: 3,
      name: t("Registration_date"),
    },
    {
      id: 4,
      name: t("Phone"),
    },
    {
      id: 5,
      name: t("Total_sessions"),
    },
    {
      id: 6,
      name: t("Turnover"),
    },
    {
      id: 7,
      name: t("Age"),
    },
    {
      id: 8,
      name: t("master"),
    },
    {
      id: 9,
      name: t("Canceled"),
    },
    {
      id: 10,
      name: t("Status"),
    },
  ];

  const getItems = (id: string): MenuProps["items"] => [
    {
      key: "1",
      label: <Link to={`/client_id/${id}`}>{t("Open")}</Link>,
    },
    {
      key: 'ACTIVE',
      label: `${t('Active')}`,
      onClick: () => openIsModal(),
    },
    {
      key: 'BLOCKED',
      label: `${t('Locked')}`,
      onClick: () => openIsModal(),
    },
    {
      key: '4',
      label: `${'Send message'}`,
      onClick: () => openIsMessageModal(),
    }
  ];


  const handleMenuClick = (e: any, id: string) => {
    setUpdateStatus({ status: e.key, id });
  };


  return (
    <>
      <Filters />
      <ClientTable thead={thead}>
        {clientFilterData.length > 0 ? (
          clientFilterData.map((item: any, key: any) => (
            <tr
              key={key}
              className={`${key === clientFilterData.length - 1
                ? ""
                : "border-b border-[#eee] dark:border-strokedark"
                }`}
            >
              <td className={`min-w-[150px] p-5`}>
                <img
                  src={item.imgId ? getFileId + item.imgId : "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"}
                  alt="img"
                  className={"w-10 h-10 scale-[1.4] rounded-full object-cover"}
                />
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.fullName ?? t("No_data")}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.registrationDate ?? t("No_data")}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.phoneNumber ?? t("No_data")}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.completedOrder ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.turnover ?? t("No_data")}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.age ? `${item.age} ${t("years")}` : t("No_data")}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.masterCount ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.canceledOrder ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5 flex items-center justify-between">
                <p
                  className={`${item.status === 'ACTIVE' ? 'bg-green-400' : item.status === 'BLOCKED' ? 'bg-red-500' : 'bg-red-700'} text-white rounded-full py-1 px-3 text-sm font-medium`}
                >
                  {item.status}
                </p>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(e) => {
                            handleMenuClick(e, item.id)
                            setid(item.id)
                          }}
                          items={getItems(item.id)}
                        />
                      }
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
              className="min-w-full text-center py-10 text-xl dark:text-white font-bold"
              colSpan={5}
            >
              {t("No_data_available")}
            </td>
          </tr>
        )}
      </ClientTable>
      <Pagination
        showSizeChanger={false}
        responsive={true}
        total={totalPage}
        pageSize={5}
        current={5}
        onChange={onChange}
        rootClassName={`mt-10 mb-5 ms-5`}
        itemRender={itemRender}
      />

      <Modal isOpen={isModal} onClose={openIsModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p
              className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}
            >
              {updateStatus.status === "ACTIVE" ? t("Activer") : t("Blocker")}
            </p>
          </div>
          <div className={`flex justify-center items-center gap-10 mt-8`}>
            <Buttons
              bWidth={`w-[200px]`}
              onClick={() =>
                updateClientStatus(
                  updateStatus.id,
                  updateStatus.status,
                  setClientFilterData,
                  setClientTotalPage,
                  openIsModal,
                  setIsLoading
                )
              }
            >
              {isLoading ? "loading..." : t("Yeah")}
            </Buttons>
            <Buttons bWidth={`w-[200px]`} onClick={openIsModal}>
              {t("Not")}
            </Buttons>
          </div>
        </div>
      </Modal>
      <ClientModal />
    </>
  );
};

export default ClientTables;
