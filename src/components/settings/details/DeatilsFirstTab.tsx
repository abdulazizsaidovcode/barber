import React, { useEffect } from 'react';
import Switch from './TableSwitcher';

interface StoragePath {
  id: number;
  component: string;
  mount: string;
  name: string;
}

const storagePaths: StoragePath[] = [
  { id: 1, component: 'Услуги', mount: 'Фото процедуры', name: 'Возможность добавлять/изменять/удалять фото к процедуре' },
  { id: 2, component: 'Услуги', mount: 'Дополнительная категория услуг', name: 'Возможность добавлять несколько категорий услуг и несколько специализаций' },
  { id: 3, component: 'Онлайн бронирование', mount: 'Разрешение записывать клиентов', name: 'Возможность разрешать или запрещать клиентам записываться' },
  { id: 4, component: 'Онлайн бронирование', mount: 'Длительность записи на период', name: 'Возможность устанавливать периоды длительности записи' },
  { id: 5, component: 'Онлайн бронирование', mount: 'Перерыв между сеансами для всех процедур', name: 'Возможность устанавливать одинаковые перерывы между сеансами' },
  { id: 6, component: 'Онлайн бронирование', mount: 'Перерыв между сеансами для каждой процедуры', name: 'Возможность устанавливать разные перерывы между сеансами ' },
  { id: 7, component: 'Онлайн бронирование', mount: 'Подтверждение записи для всех клиентов', name: 'Возможность подтверждать записи для всех клиентов' },
  { id: 8, component: 'Онлайн бронирование', mount: 'Подтверждение записи для новых клиентов', name: 'Возможность подтверждать записи для новых клиентов' },
  { id: 9, component: 'Онлайн бронирование', mount: 'Не подтверждать записи', name: 'Возможность не подтверждать записи' },
  { id: 10, component: 'Онлайн бронирование', mount: 'Запрос окошка для всех клиентов', name: 'Возможность записи в зал ожидания для всех клиентов' },
  { id: 11, component: 'Онлайн бронирование', mount: 'Запрос окошка для постоянных клиентов', name: 'Возможность записи в зал ожидания для постоянных клиентов' },
  { id: 12, component: 'Онлайн бронирование', mount: 'Время для VIP клиентов', name: 'Возможность планировать время для ВИП клиентов' },
  { id: 13, component: 'Онлайн бронирование', mount: 'Настройка приёма онлайн оплаты', name: 'Возможность подключить онлайн оплату или отключить' },
  { id: 14, component: 'Онлайн бронирование', mount: 'Настройка предоплаты процент', name: 'Возможность настраивать предоплату в процентах' },
  { id: 15, component: 'Уведомления', mount: 'Напоминать о записи', name: 'Возможность настраивать шаблоны и напоминать клиенту о записи' },
  { id: 16, component: 'Уведомления', mount: 'Отмена записи', name: 'Возможность настраивать шаблоны и напоминать клиенту об отмене записи' },
  { id: 17, component: 'Уведомления', mount: 'Изменение записи', name: 'Возможность настраивать шаблоны и напоминать клиенту об изменении записи' },
  { id: 18, component: 'Уведомления', mount: 'Поздравление с днём рождения', name: 'Возможность настраивать шаблон поздравления и отправлять клиентам' },
  { id: 19, component: 'Уведомления', mount: 'Перестали посещать', name: 'Возможность напоминать клиентам которые перестали посещать' },
  { id: 20, component: 'Уведомления', mount: 'Зал ожидания', name: 'Возможность настраивать шаблон для приглашения в зал ожидания' },
  { id: 21, component: 'Клиенты', mount: 'Клиенты из адресной книги', name: 'Возможность добавлять клиентов из телефона' },
  { id: 22, component: 'Клиенты', mount: 'Статус новый клиент', name: 'Возможность определять клиента что он новый' },
  { id: 23, component: 'Клиенты', mount: 'Статус постоянный клиент', name: 'Возможность определять клиента что он постоянный' },
  { id: 24, component: 'Клиенты', mount: 'Статус не посещал клиент', name: 'Возможность определять клиента что он не посещал мастера' },
  { id: 25, component: 'Клиенты', mount: 'Статус перестал посещать', name: 'Возможность определять клиента что он перестал посещать' },
  { id: 26, component: 'Способы оплаты', mount: 'Управление картами', name: 'Возможность добавления/удаления банковских карт' },
  { id: 27, component: 'Веб страница', mount: 'Ссылка на Веб страницу', name: 'Возможность отправлять ссылку клиентам на профиль мастера' },
  { id: 28, component: 'Финансы', mount: 'Финансы, расходы, топ лист клиентов', name: 'Возможность создавать расходы для расчёта финансов и получать информацию о состоянии финансов' },
  { id: 29, component: 'Расписание', mount: 'Остановить запись', name: 'Возможность остановить запись на выбранный день/дату' },
  { id: 30, component: 'Расписание', mount: 'Записать клиента', name: 'Возможность мастеру записывать клиентов' },
  { id: 31, component: 'Расписание', mount: 'Сделать день выходным', name: 'Возможность мастеру сделать любой день выходным' },
];

interface SwitchStates {
  [key: number]: boolean;
}

interface DetailsFirstTabProps {
  newState: SwitchStates;
  setNewState: React.Dispatch<React.SetStateAction<SwitchStates>>;
}

const DetailsFirstTab: React.FC<DetailsFirstTabProps> = ({ newState, setNewState }) => {
  useEffect(() => {
    // Ensuring the initial state is set only once when the component mounts
    setNewState(newState);
  }, [newState, setNewState]);

  const toggleSwitch = (id: number) => {
    setNewState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <table className='w-full'>
      <thead>
        <tr className='bg-[#d0eeff] h-10'>
          <th className='text-start px-4'>Категория функционала</th>
          <th className='text-start px-4'>Функционал</th>
          <th className='text-start px-4'>Описание</th>
          <th className='text-start px-4'>Статус</th>
        </tr>
      </thead>
      <tbody>
        {storagePaths.map((path) => (
          <tr key={path.id} className='table-row'>
            <td className='px-4 py-7 dark:text-white'>{path.component}</td>
            <td className='px-4 py-7 dark:text-white'>{path.mount}</td>
            <td className='px-4 py-7 dark:text-white'>{path.name}</td>
            <td className='px-4 py-7 dark:text-white'>
              <Switch isOn={!!newState[path.id]} handleToggle={() => toggleSwitch(path.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailsFirstTab;
