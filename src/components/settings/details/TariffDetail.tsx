import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import DefaultLayout from '../../../layout/DefaultLayout';
import axios from 'axios';
import { tarif_detail, tarif_put_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import toast, { Toaster } from 'react-hot-toast';
import DetailsSecondTab from './DeatilsSecondTab';
import { MdEdit } from 'react-icons/md';
import DetailsFirstTab from './DeatilsFirstTab';
import EditModal from '../modals/editModal';
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

interface SecondTabData {
  bookingDuration: number;
  bookingPerMonth: number;
  prePaymentCount: number;
  numberOfAlbums: number;
  numberOfFoto: number;
  monthPrice: number;
  yearPrice: number;
}

const TariffDetail: React.FC = () => {
  const [newState, setNewState] = useState<{ [key: number]: boolean }>({});
  const [initialState, setInitialState] = useState<{ [key: number]: boolean }>({});
  const [name, setName] = useState<string>('');
  const [initialName, setInitialName] = useState<string>('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [secondTabData, setSecondTabData] = useState<SecondTabData>({
    bookingDuration: 0,
    bookingPerMonth: 0,
    prePaymentCount: 0,
    numberOfAlbums: 0,
    numberOfFoto: 0,
    monthPrice: 0,
    yearPrice: 0
  });
  const [initialSecondTabData, setInitialSecondTabData] = useState<SecondTabData>(secondTabData);
  const [hasChanges, setHasChanges] = useState(false);

  const id = window.location.pathname.substring(17);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  useEffect(() => {
    checkForChanges();
  }, [newState, secondTabData]);

  const fetchData = async (id: string) => {
    try {
      const res = await axios.get(`${tarif_detail}/${id}`, config);
      const funcReqList = res.data.body.funcReqList;
      const newState = funcReqList.reduce((acc: { [key: number]: boolean }, number: number) => {
        acc[number] = true;
        return acc;
      }, {});

      setNewState(newState);
      setInitialState(newState);
      setName(res.data.body.name);
      setInitialName(res.data.body.name);
      const fetchedSecondTabData = {
        bookingDuration: res.data.body.bookingDuration,
        bookingPerMonth: res.data.body.bookingPerMonth,
        prePaymentCount: res.data.body.prePaymentCount,
        numberOfAlbums: res.data.body.numberOfAlbums,
        numberOfFoto: res.data.body.numberOfFoto,
        monthPrice: res.data.body.monthPrice,
        yearPrice: res.data.body.yearPrice
      };
      setSecondTabData(fetchedSecondTabData);
      setInitialSecondTabData(fetchedSecondTabData);
    } catch (error) {
      console.error(error);
    }
  };

  const checkForChanges = () => {
    const isStateChanged = JSON.stringify(newState) !== JSON.stringify(initialState);
    const isSecondTabDataChanged = JSON.stringify(secondTabData) !== JSON.stringify(initialSecondTabData);
    setHasChanges(isStateChanged || isSecondTabDataChanged);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const isNameValid = () => {
    const trimmedName = name.trim();
    return (
      trimmedName.length > 0 &&
      trimmedName !== initialName &&
      !/^[',", ]+$/.test(trimmedName)
    );
  };

  const updateData = async () => {
    if (!isNameValid()) {
      toast.error('Invalid name input');
      return;
    }

    const payload = {
      id: id,
      name: name,
      funcReqList: Object.keys(newState).filter(key => newState[Number(key)]).map(key => Number(key)),
      bookingDuration: secondTabData.bookingDuration ?? 0,
      bookingPerMonth: secondTabData.bookingPerMonth ?? 0,
      prePaymentCount: secondTabData.prePaymentCount ?? 0,
      numberOfAlbums: secondTabData.numberOfAlbums ?? 0,
      numberOfFoto: secondTabData.numberOfFoto ?? 0,
      monthPrice: secondTabData.monthPrice ?? 0,
      yearPrice: secondTabData.yearPrice ?? 0
    };
    try {
      const res = await axios.put(tarif_put_url, payload, config);
      if (res.data.success) {
        toast.success('Tariff updated successfully');
        setInitialState(newState);
        setInitialSecondTabData(secondTabData);
        setHasChanges(false);
        closeEditModal();
      } else {
        toast.error('Something went wrong updating the tariff');
        setHasChanges(true);
      }
    } catch (error) {
      toast.error('An error occurred while updating the tariff');
      console.error(error);
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          Основной функционал
        </span>
      ),
      children: <DetailsFirstTab newState={newState} setNewState={setNewState} />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          Ограничения
        </span>
      ),
      children: <DetailsSecondTab onSave={updateData} data={secondTabData} setData={setSecondTabData} hasChanges={hasChanges} />,
    },
  ];

  return (
    <DefaultLayout>
      <Link to={'/settings/tariffs-functionality'}>
        <FaArrowLeft className='text-2xl my-3'/>
      </Link>
      {name ? <div className='w-full flex justify-between items-center my-2 rounded-lg dark:text-black h-15 px-5 bg-white'>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <button
            onClick={openEditModal}
            className="p-[6px] border-[#000] border-[1px] rounded-lg"
          >
            <MdEdit size={20} color="black" className="dark:text-white" />
          </button>
        </div>
      </div> :
        <div className='h-15 bg-white flex items-center px-5 rounded-lg my-2'>
          <p>Название тарифа не настроено</p>
        </div>}
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        onChange={onChange}
      >
        {items.map(item => (
          <Tabs.TabPane tab={item.label} key={item.key}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
      <Toaster position='top-center' reverseOrder={false} />
      <EditModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        onChange={handleNameChange}
        onSave={updateData}
        defaultValue={name}
      />
    </DefaultLayout>
  );
};

export default TariffDetail;