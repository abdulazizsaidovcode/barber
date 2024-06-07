import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import calendarStore from "../../helpers/state_managment/calendar/calendarStore";
import { getCalendar, getCategoryId } from "../../helpers/api-function/calendar/calendar";
import { getDistrict, getRegion } from "../../helpers/api-function/master/master";
import FilterComponent from "./filterComponent";
import EventLegendComponent from "./eventLegendComponent";
import CategoryButtonsComponent from "./categoryButtonsComponent";

export interface Event {
  title: string;
  start: string;
  color: string;
}

const Calendar: React.FC = () => {
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
  const [currentDate, setCurrentDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const regionOptions = regionData?.map((item) => {
    return { value: item.id, label: item.name };
  }) || [];

  const districtOptions = districtData?.map((item) => {
    return { value: item.id, label: item.name };
  }) || [];

  console.log(regionData);

  const fetchCalendarData = () => {
    if (currentDate && isMonth !== null) {
      getCalendar({
        categoryId: categoryId || "",
        districtId: districtId || 0,
        endDate: endDate || "",
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

  const handleButtonClick = (buttonId: string, id: string) => {
    setCategoryIdState(id);
    setActiveButton(buttonId);
  };

  const handleDatesSet = (arg: any) => {
    if (arg.view.type === "dayGridMonth") {
      const end = new Date(arg.endStr);
      const lastDayOfMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0); // Get the last day of the month
      const formattedDate = `${lastDayOfMonth.getFullYear()}-${lastDayOfMonth
        .getMonth()
        .toString()
        .padStart(2, "0")}-27`;
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

  const resetFilters = () => {
    setRegionId(null);
    setDistrictId(null);
  };

  const [activeButton, setActiveButton] = useState<string | null>(null);

  console.log(calendarData);

  const events: Event[] = calendarData.flatMap((item) => {
    const dateTime = item.time ? `${item.date}T${item.time}` : `${item.date}`;
    const events: Event[] = [];

    if (item.completedOrders !== null && item.completedOrders !== undefined) {
      events.push({
        title: `${item.completedOrders}`,
        start: dateTime,
        color: "#22C55E",
      });
    }
    if (item.canceledOrders !== null && item.canceledOrders !== undefined) {
      events.push({
        title: `${item.canceledOrders}`,
        start: dateTime,
        color: "#EF4444",
      });
    }
    if (item.pendingOrders !== null && item.pendingOrders !== undefined) {
      events.push({
        title: `${item.pendingOrders}`,
        start: dateTime,
        color: "#F97316",
      });
    }
    if (
      item.toBeConfirmedOrders !== null &&
      item.toBeConfirmedOrders !== undefined
    ) {
      events.push({
        title: `${item.toBeConfirmedOrders}`,
        start: dateTime,
        color: "#3B82F6",
      });
    }

    return events;
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />
      <div className="grid md:grid-cols-2 gap-5 my-5">
        <EventLegendComponent />
        <FilterComponent
          regionOptions={regionOptions}
          districtOptions={districtOptions}
          regionId={regionId}
          districtId={districtId}
          setRegionId={setRegionId}
          setDistrictId={setDistrictId}
          getDistrict={getDistrict}
          resetFilters={resetFilters}
        />
      </div>
      <CategoryButtonsComponent
        category={category}
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
      />
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
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        datesSet={handleDatesSet}
        eventAdd={() => {}}
        eventBackgroundColor="#fff"
        events={events}
      />
    </DefaultLayout>
  );
};

export default Calendar;
