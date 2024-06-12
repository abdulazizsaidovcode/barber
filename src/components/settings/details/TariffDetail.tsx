import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import DefaultLayout from '../../../layout/DefaultLayout';
import axios from 'axios';
import { tarif_detail, tarif_put_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import toast, { Toaster } from 'react-hot-toast';
import DetailsSecondTab from './DeatilsSecondTab';
import DetailsFirstTab from './DeatilsFirstTab';

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
  const [name, setName] = useState<string>('');
  const [secondTabData, setSecondTabData] = useState<SecondTabData>({
    bookingDuration: 0,
    bookingPerMonth: 0,
    prePaymentCount: 0,
    numberOfAlbums: 0,
    numberOfFoto: 0,
    monthPrice: 0,
    yearPrice: 0
  });

  const id = window.location.pathname.substring(17);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id: string) => {
    try {
      const res = await axios.get(`${tarif_detail}/${id}`, config);
      const funcReqList = res.data.body.funcReqList;
      const newState = funcReqList.reduce((acc: { [key: number]: boolean }, number: number) => {
        acc[number] = true;
        return acc;
      }, {});

      setNewState(newState);
      setName(res.data.body.name);
      setSecondTabData({
        bookingDuration: res.data.body.bookingDuration,
        bookingPerMonth: res.data.body.bookingPerMonth,
        prePaymentCount: res.data.body.prePaymentCount,
        numberOfAlbums: res.data.body.numberOfAlbums,
        numberOfFoto: res.data.body.numberOfFoto,
        monthPrice: res.data.body.monthPrice,
        yearPrice: res.data.body.yearPrice
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateData = async () => {
    const payload = {
      id: id,
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
      await axios.put(tarif_put_url, payload, config);
      toast.success('Tariff updated successfully');
    } catch (error) {
      console.error('Error updating tariff:', error);
    }
  };

  const onChange = (key: string) => {
    console.log(key);
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
      children: <DetailsSecondTab onSave={updateData} data={secondTabData} setData={setSecondTabData} />,
    },
  ];

  return (
    <DefaultLayout>
      <div className='w-full my-2 rounded-lg dark:text-black h-15 p-5 bg-white'>
        <p>{name}</p>
      </div>
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
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
    </DefaultLayout>
  );
};

export default TariffDetail;
