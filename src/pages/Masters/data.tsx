import { IMasterItems, IThead } from '../../types/master.ts';
import MasterTables from './master-tables.tsx';
import MasterLocation from './master-location.tsx';
// import { useTranslation } from 'react-i18next';
// const { t } = useTranslation();

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
  }
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
