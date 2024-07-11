import React, { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Select } from 'antd';
import calendarStore from '../../helpers/state_managment/calendar/calendarStore';
import { RxReload } from 'react-icons/rx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import {
  getCalendar,
  getCategoryId,
} from '../../helpers/api-function/calendar/calendar';
import {
  getDistrict,
  getRegion,
} from '../../helpers/api-function/master/master';
import { useTranslation } from 'react-i18next';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; // Import the CSS file

export interface Event {
  title: string;
  start: string;
  color: string;
}

const Calendar: React.FC = () => {
  const { t } = useTranslation();
  const {
    setCategory,
    category,
    setCalendarData,
    calendarData,
    setDistrictData,
    districtData,
    setRegionData,
    regionData,
  } = calendarStore();
  const [regionId, setRegionId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [categoryId, setCategoryIdState] = useState<string | null>(null);
  const [isMonth, setIsMonth] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const regionOptions =
    regionData?.map((item) => {
      return { value: item.id, label: item.name };
    }) || [];

  const districtOptions =
    districtData?.map((item) => {
      return { value: item.id, label: item.name };
    }) || [];

  const fetchCalendarData = () => {
    if (currentDate && isMonth !== null) {
      getCalendar({
        categoryId: categoryId || '',
        districtId: districtId || 0,
        endDate: endDate || '',
        isMonth: isMonth,
        localDate: currentDate,
        regionId: regionId || 0,
        setData: setCalendarData,
      });
    }
  };

  useEffect(() => {
    getCategoryId(setCategory);
    getRegion(setRegionData);
  }, []);

  useEffect(() => {
    fetchCalendarData();
  }, [regionId, districtId, categoryId, isMonth, currentDate, endDate]);

  useEffect(() => {
    setDistrictId(null);
    fetchCalendarData();
  }, [regionId]);

  const handleButtonClick = (buttonId: string, id: string) => {
    setCategoryIdState(id);
    setActiveButton(buttonId);
  };

  const handleDatesSet = (arg: any) => {
    if (arg.view.type === 'dayGridMonth') {
      const end = new Date(arg.endStr);
      const lastDayOfMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0);
      const formattedDate = `${lastDayOfMonth.getFullYear()}-${lastDayOfMonth
        .getMonth()
        .toString()
        .padStart(2, '0')}-27`;
      setCurrentDate(formattedDate);
      setEndDate('');
      setIsMonth(true);
    } else if (arg.view.type === 'timeGridWeek') {
      const start = new Date(arg.start);
      const end = new Date(arg.end);
      const startDate = `${start.getFullYear()}-${(start.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}`;
      const endDate = `${end.getFullYear()}-${(end.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${(end.getDate() - 1).toString().padStart(2, '0')}`;
      setCurrentDate(startDate);
      setEndDate(endDate);
      setIsMonth(false);
    }
  };

  const [activeButton, setActiveButton] = useState<string | null>('All');

  const resetFilters = () => {
    setRegionId(null);
    setDistrictId(null);
  };

  const carouselRef = useRef<any>(null); // Create a ref for AliceCarousel

  const handleSlidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const handleSlideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const events = calendarData.reduce(
    (acc, item) => {
      const dateTime = item.time ? `${item.date}T${item.time}` : `${item.date}`;

      if (item.pendingOrders !== null && item.pendingOrders !== undefined) {
        acc.push({
          title: `${item.pendingOrders}`,
          start: dateTime,
          color: '#F97316',
        });
      }

      if (
        item.toBeConfirmedOrders !== null &&
        item.toBeConfirmedOrders !== undefined
      ) {
        acc.push({
          title: `${item.toBeConfirmedOrders}`,
          start: dateTime,
          color: '#3B82F6',
        });
      }

      if (item.canceledOrders !== null && item.canceledOrders !== undefined) {
        acc.push({
          title: `${item.canceledOrders}`,
          start: dateTime,
          color: '#EF4444',
        });
      }
      if (item.completedOrders !== null && item.completedOrders !== undefined) {
        acc.push({
          title: `${item.completedOrders}`,
          start: dateTime,
          color: '#22C55E',
        });
      }
      return acc;
    },
    [] as { title: string; start: string; color: string }[],
  );

  const categoryButtons = [
    <button
      key="all"
      onClick={() => {
        handleButtonClick('All', '');
      }}
      className={`w-[97%] rounded-lg border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
        activeButton === 'All'
          ? 'bg-[#2C3E50] text-white'
          : 'border-[#2C3E50] text-[#2C3E50] bg-emerald-200 dark:bg-slate-400 hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]'
      }`}
    >
      {t('All_categories')}
    </button>,
    ...category.map((item, i) => (
      <button
        key={i}
        onClick={() => {
          handleButtonClick(item.name, item.id);
        }}
        className={`w-[97%] rounded-lg border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
          activeButton === item.name
            ? 'bg-[#2C3E50] text-white'
            : 'border-[#2C3E50] text-[#2C3E50] hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]'
        }`}
      >
        {item.name}
      </button>
    )),
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName={t('siderbar_calendar')} />
      <div className="grid md:grid-cols-2 gap-5 my-5">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-green-500 text-xs flex justify-center text-center items-center rounded-lg text-white px-6 py-1 shadow-xl">
            {t('SecondTab_name')}
          </div>
          <div className="bg-blue-500 text-xs flex justify-center text-center items-center rounded-lg text-white px-6 py-1 shadow-xl ">
            {t('detail_type')}
          </div>
          <div className="bg-orange-500 text-xs flex justify-center text-center items-center rounded-lg text-white px-6 py-1 shadow-xl">
            {t('On_approval')}
          </div>
          <div className="bg-red-500 text-xs flex justify-center text-center items-center rounded-lg text-white px-6 py-1 shadow-xl">
            {t('Rejected')}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">
          <Select
            showSearch
            placeholder={t('Region')}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={regionOptions}
            value={regionId} // Add value prop
            onChange={(value) => {
              setRegionId(value);
              getDistrict(setDistrictData, value);
            }}
          />
          <div className="flex gap-3 items-center w-full">
            <Select
              className="w-full"
              showSearch
              placeholder={t('City')}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={districtOptions}
              value={districtId} // Add value prop
              onChange={(value) => setDistrictId(value)}
            />
            <RxReload
              size={20}
              onClick={resetFilters}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="px-10 my-10">
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full"
            onClick={handleSlidePrev}
            style={{ marginLeft: '-2.5rem' }} // Move button outside carousel
          >
            <FaChevronLeft />
          </button>
          <AliceCarousel
            items={categoryButtons}
            infinite
            mouseTracking
            disableButtonsControls
            disableSlideInfo
            disableDotsControls
            ref={carouselRef}
            responsive={{
              0: { items: 1 },
              450: { items: 2 },
              700: { items: 3 },
              991: { items: 4 },
              1500: { items: 6 },
            }}
          />
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full"
            onClick={handleSlideNext}
            style={{ marginRight: '-2.5rem' }} // Move button outside carousel
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        plugins={[
          dayGridPlugin,
          resourceTimelinePlugin,
          interactionPlugin,
          timeGridPlugin,
          
        ]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek',
        }}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        buttonText={{
          today: t('today'),
          month: t('month'),
          week: t('week'),
          day: t('day')
        }}
        datesSet={handleDatesSet}
        eventBackgroundColor="#fff"
        events={events}
      />
    </DefaultLayout>
  );
};

export default Calendar;
