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
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

  const { id } = useParams()

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    checkForChanges();
  }, [newState, secondTabData]);

  const fetchData = async () => {
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
      !/^[',", ]+$/.test(trimmedName)
    );
  };
  const { t } = useTranslation()

  const updateData = async () => {
    if (!isNameValid()) {
      toast.error(t("Invalid_name_input"));
      return;
    }

    if (name.trim() === initialName.trim()) {
      toast(t("Name_is_unchanged"), { icon: '⚠️' });
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
        toast.success(t("Tariff_updated_successfully"));
        setInitialState(newState);
        setInitialSecondTabData(secondTabData);
        setHasChanges(false);
        closeEditModal();
      } else {
        toast.error(t("Something_went_wrong_updating_the_tariff"));
        setHasChanges(true);
      }
    } catch (error) {
      toast.error(t("An_error_occurred_while_updating_the_tariff"));
      console.error(error);
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("Main_functionality")}
        </span>
      ),
      children: <DetailsFirstTab newState={newState} setNewState={setNewState} />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("Restrictions")}
        </span>
      ),
      children: <DetailsSecondTab onSave={updateData} data={secondTabData} setData={setSecondTabData} hasChanges={hasChanges} />,
    },
  ];

  return (
    <DefaultLayout>
      <Link to={'/settings/tariffs-functionality'}>
        <FaArrowLeft className='text-2xl my-3' />
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
          <p>{t("Tariff_name_is_not_configured")}</p>
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