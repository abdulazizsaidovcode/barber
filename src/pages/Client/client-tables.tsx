import ClientTable from '../../components/Tables/MasterTable.tsx';
import { CiMenuKebab } from 'react-icons/ci';
import type { MenuProps } from 'antd';
import { Dropdown, Menu, Pagination, Space } from 'antd';
import Filters from './filters/filters.tsx';
import React, { useState } from 'react';
import images from '../../images/user.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clientFilterStore, { FilterData } from '../../helpers/state_managment/client/clientFilterStore.tsx';
import { Buttons } from '../../components/buttons';
import Modal from '../../components/modals/modal.tsx';
import { updateClientStatus } from '../../helpers/api-function/client/clientFilter.tsx';
import { getFileId } from '../../helpers/api.tsx';
import ClientModal from './client-modal.tsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MenuInfo } from 'rc-menu/lib/interface';

export interface UpdateStatus {
  status: string;
  id: string;
}

const ClientTables: React.FC = () => {
  const { t } = useTranslation();
  const {
    clientFilterData,
    totalPage,
    setPage,
    setClientFilterData,
    setIsModal,
    setIsLoading,
    isLoading,
    isModal,
    setClientTotalPage,
    setIsMessageModal,
    isMessageModal,
    setid,
    setSize
  } = clientFilterStore();
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    status: '',
    id: ''
  });
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string>('');

  const onChange = (page: number, size: number): void => {
    setPage(page - 1);
    setSize(size);
  };

  const openIsModal = () => setIsModal(!isModal);
  const openIsMessageModal = () => setIsMessageModal(!isMessageModal);
  const openIsImageModal = () => setIsImageModal(!isImageModal);

  const itemRender = (_: number, type: "page" | "prev" | "next" | "jump-prev" | "jump-next", element: React.ReactNode) => {
    if (type === 'page') {
      return (
        <a
          className="shadow-none dark:bg-[#9c0a36] dark:text-white border dark:border-[#9c0a36] border-black rounded no-underline">
          {element}
        </a>
      );
    }
    return element;
  };

  const thead = [
    {
      id: 1,
      name: t('Photo')
    },
    {
      id: 2,
      name: t('Client')
    },
    {
      id: 3,
      name: t('Registration_date')
    },
    {
      id: 4,
      name: t('Phone')
    },
    {
      id: 5,
      name: t('Total_sessions')
    },
    {
      id: 6,
      name: t('Age')
    },
    {
      id: 7,
      name: t('Canceled')
    },
    {
      id: 8,
      name: t('Status')
    }
  ];

  const getItemsActive = (id: string): MenuProps['items'] => [
    {
      key: '1',
      label: <Link to={`/client_id/${id}`}>{t('Open')}</Link>
    },
    {
      key: 'ACTIVE',
      label: `${t('Active')}`,
      onClick: () => openIsModal()
    },
    {
      key: '4',
      label: `${t('Send_Message')}`,
      onClick: () => openIsMessageModal()
    }
  ];
  const getItemsBlock = (id: string): MenuProps['items'] => [
    {
      key: '1',
      label: <Link to={`/client_id/${id}`}>{t('Open')}</Link>
    },
    {
      key: 'BLOCKED',
      label: `${t('Locked')}`,
      onClick: () => openIsModal()
    },
    {
      key: '4',
      label: `${t('Send_Message')}`,
      onClick: () => openIsMessageModal()
    }
  ];

  const handleMenuClick = (e: MenuInfo, id: string) => {
    setUpdateStatus({ status: e.key, id });
  };

  const clientStatusGenerate = (status: string) => {
    if (status === 'NEW') return [t('New'), 'bg-blue-700'];
    else if (status === 'ACTIVE') return [t('Active'), 'bg-green-500'];
    else if (status === 'BLOCKED') return [t('Locked'), 'bg-red-500'];
    else if (status === 'DELETED') return [t('Deleted'), 'bg-red-700'];
    else return [t('unknown'), 'bg-gray-500'];
  };

  console.log('status',clientStatusGenerate('DELETED')[0]);
  

  return (
    <>
      <Filters />
      <ClientTable thead={thead}>
        {clientFilterData.length > 0 ? (
          clientFilterData.map((item: FilterData, key: number) => (
            <tr
              key={key}
              className={`${key === clientFilterData.length - 1
                ? ''
                : 'border-b border-[#eee] dark:border-strokedark'
                }`}
            >
              <td className={`min-w-[150px] p-5`}>
                <LazyLoadImage
                  alt="img"
                  src={
                    item.imgUrl && item.imgUrl !== null ? `${getFileId}${item.imgUrl}` : images
                  }
                  className={'w-10 h-10 scale-[1.4] rounded-full object-cover hover:cursor-pointer'}
                  effect="blur"
                  onClick={() => {
                    openIsImageModal();
                    setImageID(item.imgUrl !== null ? item.imgUrl : '');
                  }}
                />
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.fullName ?? t('No_data')}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.registrationDate ?? t('No_data')}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.phoneNumber ?? t('No_data')}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.completedOrder ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5 flex items-center justify-between">
                <p className="text-black dark:text-white">
                  {item?.turnover ?? t('No_data')}
                </p>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(e) => {
                            handleMenuClick(e, item.id);
                            setid(item.id);
                          }}
                          items={
                            item.status === 'ACTIVE'
                              ? getItemsBlock(item.id)
                              : getItemsActive(item.id)
                          }
                        />
                      }
                      placement="bottomLeft"
                      arrow
                    >
                      <CiMenuKebab
                        className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200" />
                    </Dropdown>
                  </Space>
                </Space>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.age ? `${item.age} ${t('years')}` : t('No_data')}
                </p>
              </td>
              {/* <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.canceledOrder ?? 0}
                </p>
              </td> */}
              <td className="min-w-[150px] p-5">
                <p
                  className={`${clientStatusGenerate(item.status)[1]} text-white text-center rounded-full py-1 px-3 text-sm font-medium`}
                >
                 {clientStatusGenerate(item.status)[0]}
                </p>
              </td>
            </tr>
          ))
        ) : (
          <tr className={`border-b border-[#eee] dark:border-strokedark`}>
            <td
              className="min-w-full text-center py-10 text-xl dark:text-white font-bold"
              colSpan={10}
            >
              {t('No_data_available')}
            </td>
          </tr>
        )}
      </ClientTable>
      <div className="flex justify-start items-center">
        <Pagination
          // showSizeChanger
          responsive={true}
          defaultCurrent={1}
          total={totalPage}
          onChange={onChange}
          rootClassName={`mt-10 mb-5 ms-5`}
          itemRender={itemRender}
        />
        <p
          className={`px-5 py-1 mt-10 mb-5 ms-5 border border-black dark:border-white rounded dark:text-white`}
        >
          {totalPage}
        </p>
      </div>
      <Modal isOpen={isModal} onClose={openIsModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p
              className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}
            >
              {updateStatus.status === 'ACTIVE' ? t('Activer') : t('Blocker')}
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
              {isLoading ? 'loading...' : t('Yeah')}
            </Buttons>
            <Buttons bWidth={`w-[200px]`} onClick={openIsModal}>
              {t('Not')}
            </Buttons>
          </div>
        </div>
      </Modal>
      {isImageModal && (
        <div
          className={`fixed inset-0 z-999 flex items-center justify-center w-full h-full bg-black-2 bg-opacity-50`}
          onClick={openIsImageModal}
        >
          <p className={`absolute top-10 right-10 text-white`}>
            <IoMdCloseCircleOutline
              size={30}
              className="dark:text-white text-black hover:cursor-pointer opacity-80 duration-200"
              onClick={openIsImageModal} />
          </p>
          <div className="flex justify-center items-center">
            <LazyLoadImage
              alt="img"
              src={imageID ? `${getFileId}${imageID}` : images}
              className="object-contain"
              effect="blur"
              style={{ maxWidth: '700px', maxHeight: '500px' }}
            />
          </div>
        </div>
      )}
      <ClientModal />
    </>
  );
};

export default ClientTables;