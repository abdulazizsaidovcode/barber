import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Select } from "antd";
import calendarStore from "../../helpers/state_managment/calendar/calendarStore";
import { getCalendar, getCategoryId } from "../../helpers/api-function/calendar/calendar";

interface Event {
  title: string;
  start: string;
  color: string;
}

const Calendar: React.FC = () => {
  const { setCategory, category } = calendarStore();
  const [regionId, setRegionId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [categoryId, setCategoryIdState] = useState<string | null>(null);
  const [isMonth, setIsMonth] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const regionOptions = [
    { value: 1, label: "Not Identified" },
    { value: 2, label: "Closed" },
  ];

  const fetchCalendarData = () => {
    getCalendar({
      categoryId: categoryId || "",
      districtId: districtId || 0,
      endDate: endDate || "",
      isMonth: isMonth,
      localDate: currentDate,
      regionId: regionId || 0
    });
  };

  useEffect(() => {
    getCategoryId(setCategory);
  }, []);

  useEffect(() => {
    fetchCalendarData();
  }, [regionId, districtId, categoryId, isMonth, currentDate, endDate]);

  const handleButtonClick = (buttonId: string, id: string) => {
    setCategoryIdState(id);
    setActiveButton(buttonId);
  };

  const handleDatesSet = (arg: any) => {
    if (arg.view.type === "dayGridMonth") {
      const start = new Date(arg.startStr);
      const formattedDate = `${start.getFullYear()}-${(start.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`;
      setCurrentDate(formattedDate);
      setEndDate("");
      setIsMonth(true);
    } else if (arg.view.type === "timeGridWeek") {
      const start = new Date(arg.start);
      const end = new Date(arg.end);
      const startDate = `${start.getFullYear()}-${(start.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`;
      const endDate = `${end.getFullYear()}-${(end.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${(end.getDate() - 1).toString().padStart(2, "0")}`;
      setCurrentDate(startDate);
      setEndDate(endDate);
      setIsMonth(false);
    }
  };

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const events: Event[] = [
    { title: "25", start: "2024-05-07", color: "#22C55E" },
    { title: "21", start: "2024-05-07", color: "#F97316" },
    { title: "9", start: "2024-05-07", color: "#EF4444" },
    { title: "11", start: "2024-05-07", color: "#3B82F6" },
    { title: "21", start: "2024-05-03", color: "#F97316" },
    { title: "25", start: "2024-05-03", color: "#22C55E" },
    { title: "11", start: "2024-05-03", color: "#3B82F6" },
    { title: "9", start: "2024-05-03", color: "#EF4444" },
    { title: "21", start: "2024-03-07", color: "#F97316" },
    { title: "25", start: "2024-03-07", color: "#22C55E" },
    { title: "11", start: "2024-03-07", color: "#3B82F6" },
    { title: "9", start: "2024-03-07", color: "#EF4444" },
  ];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />
      <div className="grid md:grid-cols-2 gap-5 my-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-green-500 flex justify-center items-center rounded-lg text-white">
            Завершён
          </div>
          <div className="bg-blue-500 flex justify-center items-center rounded-lg text-white">
            Одобрен
          </div>
          <div className="bg-orange-500 flex justify-center items-center rounded-lg text-white">
            На одобрении
          </div>
          <div className="bg-red-500 flex justify-center items-center rounded-lg text-white">
            Отклонён
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Select
            showSearch
            placeholder="Регион"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={regionOptions}
            onChange={(value) => setRegionId(value)}
          />
          <Select
            showSearch
            placeholder="Город"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={regionOptions}
            onChange={(value) => setDistrictId(value)}
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
        {category.length !== 0 &&
          category.map((item, i) => {
            if (!item) return null;
            return (
              <button
                key={i}
                onClick={() => {
                  handleButtonClick(item.name, item.id);
                }}
                className={`inline-block rounded border-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out focus:ring-0 motion-reduce:transition-none ${
                  activeButton === item.name
                    ? "bg-[#2C3E50] text-white"
                    : "border-[#2C3E50] text-[#2C3E50] hover:shadow-xl hover:bg-[#DDDDDD] dark:border-[#DDDDDD] dark:hover:border-[#2C3E50] dark:hover:text-[#2C3E50] dark:text-[#DDDDDD]"
                }`}
              >
                {item.name}
              </button>
            );
          })}
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
          start: "prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek",
        }}
        datesSet={handleDatesSet}
        eventAdd={() => {}}
        eventBackgroundColor="#fff"
        events={events}
      />
      <div>
        <p>Current Date: {currentDate}</p>
        <p>End Date: {endDate}</p>
      </div>
    </DefaultLayout>
  );
};

export default Calendar;
