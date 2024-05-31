import { IMasterItems, ITbody, IThead } from '../../types/master.ts';
import MasterTables from './master-tables.tsx';
import img from '../../images/product/product-01.png';
import MasterLocation from './master-location.tsx';

export const thead: IThead[] = [
  {
    id: 1,
    name: 'Фото',
  },
  {
    id: 2,
    name: 'Мастер',
  },
  {
    id: 3,
    name: 'Категория услуг',
  },
  {
    id: 4,
    name: 'Начал работу',
  },
  {
    id: 5,
    name: 'Сеансов всего',
  },
  {
    id: 6,
    name: 'Рейтинг',
  },
  {
    id: 7,
    name: 'Статус',
  },
  {
    id: 8,
    name: 'Тип расписания',
  },
  {
    id: 9,
    name: 'Отмененых',
  },
  {
    id: 10,
    name: 'Спеиализация',
  },
  {
    id: 11,
    name: 'Клиенты',
  },
  {
    id: 12,
    name: 'Телефон',
  },
  {
    id: 13,
    name: 'Место работы',
  },
  {
    id: 14,
    name: 'Самозанятый',
  },
];

export const tbody: ITbody[] = [
  {
    id: 1,
    img: img,
    name: 'Имя, Фамилия',
    category: 'Красота и здоровье волос',
    invoiceDate: `10 апреля 2024`,
    totalSessions: 104,
    rating: 5,
    status: 'Активный',
    scheduleType: 'По графику',
    canceled: 104,
    specialization: 'Парихмахер, барбер',
    clients: 154,
    phoneNumber: '99899 205 05 05',
    placeOfWork: 'Beauty Lab',
    selfEmployed: 'Да',
  },
  {
    id: 2,
    img: img,
    name: 'Имя, Фамилия',
    category: 'Красота и здоровье волос',
    invoiceDate: `10 апреля 2024`,
    totalSessions: 104,
    rating: 5,
    status: 'Заблокированный',
    scheduleType: 'По графику',
    canceled: 104,
    specialization: 'Парихмахер, барбер',
    clients: 154,
    phoneNumber: '99899 205 05 05',
    placeOfWork: 'Beauty Lab',
    selfEmployed: 'Да',
  },
  {
    id: 3,
    img: img,
    name: 'Имя, Фамилия',
    category: 'Ногтевой сервис',
    invoiceDate: `09 апреля 2024`,
    totalSessions: 104,
    rating: 5,
    status: 'Активный',
    scheduleType: 'По графику',
    canceled: 104,
    specialization: 'Парихмахер, барбер',
    clients: 154,
    phoneNumber: '99899 205 05 05',
    placeOfWork: 'Beauty Lab',
    selfEmployed: 'Да',
  },
];

export const items: IMasterItems[] = [
  {
    key: '1',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Masterlar ro'yxati
      </span>
    ),
    children: <MasterTables />,
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Masterning joylashuvi
      </span>
    ),
    children: <MasterLocation />,
  },
];
