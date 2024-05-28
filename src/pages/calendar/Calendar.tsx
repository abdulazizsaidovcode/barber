// src/components/Calendar.tsx

import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Select } from 'antd';

interface Event {
  title: string;
  start: string;
  color: string;
}

const Calendar: React.FC = () => {
  const regionOptions = [
    { value: '1', label: 'Not Identified' },
    { value: '2', label: 'Closed' },
  ];

  const events: Event[] = [
    { title: '25', start: '2024-05-07', color: '#22C55E' },
    { title: '21', start: '2024-05-07', color: '#F97316' },
    { title: '9', start: '2024-05-07', color: '#EF4444' },
    { title: '11', start: '2024-05-07', color: '#3B82F6' },
    { title: '21', start: '2024-05-03', color: '#F97316' },
    { title: '25', start: '2024-05-03', color: '#22C55E' },
    { title: '11', start: '2024-05-03', color: '#3B82F6' },
    { title: '9', start: '2024-05-03', color: '#EF4444' },
    { title: '21', start: '2024-03-07', color: '#F97316' },
    { title: '25', start: '2024-03-07', color: '#22C55E' },
    { title: '11', start: '2024-03-07', color: '#3B82F6' },
    { title: '9', start: '2024-03-07', color: '#EF4444' },
  ];

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />
      <div className="grid md:grid-cols-2 gap-5 my-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-green-500 flex justify-center items-center rounded-lg text-white">Завершён</div>
          <div className="bg-blue-500 flex justify-center items-center rounded-lg text-white">Одобрен</div>
          <div className="bg-orange-500 flex justify-center items-center rounded-lg text-white">На одобрении</div>
          <div className="bg-red-500 flex justify-center items-center rounded-lg text-white">Отклонён</div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Select
            showSearch
            placeholder="Регион"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={regionOptions}
          />
          <Select
            showSearch
            placeholder="Город"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={regionOptions}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-3 my-3">
        <button
          disabled
          className={
            "inline-block rounded bg-[#2C3E50] cursor-not-allowed px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-lg focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          }
        >
          Все категории
        </button>
        <button
          onClick={() => handleButtonClick('category')}
          className={`inline-block rounded border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
            activeButton === 'category'
              ? 'bg-[#2C3E50] text-white'
              : 'border-[#2C3E50] text-[#2C3E50] hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]'
          }`}
        >
          категории
        </button>
        <button
          onClick={() => handleButtonClick('hand')}
          className={`inline-block rounded border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
            activeButton === 'hand'
              ? 'bg-[#2C3E50] text-white'
              : 'border-[#2C3E50] text-[#2C3E50] hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]'
          }`}
        >
          категории
        </button>
        <button
          onClick={() => handleButtonClick('volos')}
          className={`inline-block rounded border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
            activeButton === 'volos'
              ? 'bg-[#2C3E50] text-white'
              : 'border-[#2C3E50] text-[#2C3E50] hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]'
          }`}
        >
          категории
        </button>
      </div>
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        plugins={[dayGridPlugin, resourceTimelinePlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek',
        }}
        eventAdd={() => {}}
        eventBackgroundColor="#fff"
        events={events}
      />
    </DefaultLayout>
  );
};

export default Calendar;