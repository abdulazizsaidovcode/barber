import MasterTable from '../../components/Tables/MasterTable.tsx';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuProps, Pagination, Dropdown, Space, Menu } from 'antd';
import Filters from './filters/filters.tsx';
import React, { useState } from 'react';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import images from '../../images/user.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Modal from '../../components/modals/modal.tsx';
import { Buttons } from '../../components/buttons';
import { updateStatusFunc } from '../../helpers/api-function/master/master.tsx';
import { getFileId } from '../../helpers/api.tsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export interface UpdateStatus {
  status: string;
  masterId: string;
}

const MasterTables: React.FC = () => {
  const { t } = useTranslation();

  const thead = [
    {
      id: 1,
      name: t('Photo')
    },
    {
      id: 2,
      name: t('master')
    },
    {
      id: 3,
      name: t('Service_category')
    },
    {
      id: 4,
      name: t('Started_work')
    },
    {
      id: 5,
      name: t('Total_sessions')
    },
    {
      id: 6,
      name: t('Rating')
    },
    {
      id: 7,
      name: t('Status')
    },
    {
      id: 8,
      name: t('Schedule_Type')
    },
    {
      id: 9,
      name: t('Canceled')
    },
    {
      id: 10,
      name: t('Specializations')
    },
    {
      id: 11,
      name: t('siderbar_client')
    },
    {
      id: 12,
      name: t('Phone')
    },
    {
      id: 13,
      name: t('Place_of_work')
    }
  ];
  const {
    data,
    totalPage,
    isModal,
    setIsModal,
    setData,
    setTotalPage,
    isLoading,
    setIsLoading,
    setPage,
    setSize
  } = masterStore();
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    status: '',
    masterId: ''
  });
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string>('');

  const getItemsActive = (id: string): MenuProps['items'] => [
    {
      key: '1',
      label: <Link to={`/master/${id}`}>{t('Open')}</Link>
    },
    {
      key: 'ACTIVE',
      label: `${t('Active')}`,
      onClick: () => openIsModal()
    }
  ];
  const getItemsBlock = (id: string): MenuProps['items'] => [
    {
      key: '1',
      label: <Link to={`/master/${id}`}>{t('Open')}</Link>
    },
    {
      key: 'BLOCKED',
      label: `${t('Locked')}`,
      onClick: () => openIsModal()
    }
  ];
  const openIsModal = () => setIsModal(!isModal);
  const handleMenuClick = (e: any, masterId: string) => setUpdateStatus({ status: e.key, masterId });
  const openIsImageModal = () => setIsImageModal(!isImageModal);
  const onChange = (page: number, size: number): void => {
    setPage(page - 1);
    setSize(size);
  };

  const itemRender = (_: any, type: string, originalElement: any) => {
    if (type === 'page') {
      return (
        <a
          className="shadow-none dark:bg-[#9c0a36] dark:text-white border dark:border-[#9c0a36] border-black rounded no-underline">
          {originalElement}
        </a>
      );
    }
    return originalElement;
  };

  return (
    <>
      <Filters />
      <MasterTable thead={thead}>
        {data.length > 0 ? (
          data.map((item, key) => (
            <tr
              key={item.id}
              className={`${
                key === data.length - 1
                  ? ''
                  : 'border-b border-[#eee] dark:border-strokedark'
              }`}
            >
              <td className={`min-w-[150px] p-5`}>
                <LazyLoadImage
                  alt="img"
                  src={item.imgId !== null ? `${getFileId}${item.imgId}` : images}
                  className={'w-10 h-10 scale-[1.4] rounded-full object-cover hover:cursor-pointer'}
                  effect="blur"
                  onClick={() => {
                    openIsImageModal();
                    setImageID(item.imgId !== null ? item.imgId : '');
                  }}
                />
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.fullName}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.serviceCategory?.map((c) => <p key={c}>{c}</p>)}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.startedWork}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.orderCount}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.rating !== 0 ? item.rating.toFixed(3) : item.rating}
                </p>
              </td>
              <td className="min-w-[150px] p-5 pt-7 flex items-center justify-between">
                <p
                  className={`${
                    item.status === 'ACTIVE'
                      ? 'bg-green-400'
                      : item.status === 'NEW'
                        ? 'bg-green-700'
                        : item.status === 'BLOCKED'
                          ? 'bg-red-500' : 'bg-red-700'
                  } text-white rounded-full py-1 px-3 text-sm font-medium`}
                >
                  {item.status}
                </p>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={(e) => handleMenuClick(e, item.id)}
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
                <p className="text-black dark:text-white">{item.schedule}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.canceled}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.specialization?.map((s) => <p key={s}>{s}</p>)}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.totalClient}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.phoneNumber}</p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">{item.workPlace}</p>
              </td>
            </tr>
          ))
        ) : (
          <tr className={`border-b border-[#eee] dark:border-strokedark`}>
            <td
              className="min-w-full text-center py-10 text-xl font-bold"
              colSpan={5}
            >
              {t('Information_not_available')}
            </td>
          </tr>
        )}
      </MasterTable>
      <div className={`flex justify-start items-center`}>
        <Pagination
          // showSizeChanger={false}
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

      {/*modal*/}
      <Modal isOpen={isModal} onClose={openIsModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p
              className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}
            >
              {updateStatus.status === 'ACTIVE' ? 'Активный' : 'Заблокировать'}{' '}
              мастра?
            </p>
          </div>
          <div className={`flex justify-center items-center gap-10 mt-8`}>
            <Buttons
              bWidth={`w-[200px]`}
              onClick={() =>
                updateStatusFunc(
                  updateStatus.masterId,
                  updateStatus.status,
                  setData,
                  setTotalPage,
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
          <div className={`w-[85vw] h-[90vh] flex justify-center items-center`}>
            <LazyLoadImage
              alt="img"
              src={imageID ? `${getFileId}${imageID}` : images}
              className={'w-full h-full object-cover'}
              effect="blur"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MasterTables;
