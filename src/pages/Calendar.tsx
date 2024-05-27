import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Select } from "antd";
const Calendar = () => {
  const regionOption = [
    {
      value: "1",
      label: "Not Identified",
    },
    {
      value: "2",
      label: "Closed",
    },
  ];
  let event = [
    {
      title: "25",
      start: "2024-05-07",
      color: "#22C55E",
    },
    {
      title: "21",
      start: "2024-05-07",
      color: "#F97316",
    },
    {
      title: "9",
      start: "2024-05-07",
      color: "#EF4444",
    },
    {
      title: "11",
      start: "2024-05-07",
      color: "#3B82F6",
    },

    {
      title: "21",
      start: "2024-05-03",
      color: "#F97316",
    },

    {
      title: "25",
      start: "2024-05-03",
      color: "#22C55E",
    },
    {
      title: "11",
      start: "2024-05-03",
      color: "#3B82F6",
    },

    {
      title: "9",
      start: "2024-05-03",
      color: "#EF4444",
    },
    {
      title: "21",
      start: "2024-03-07",
      color: "#F97316",
    },
    {
      title: "25",
      start: "2024-03-07",
      color: "#22C55E",
    },
    {
      title: "11",
      start: "2024-03-07",
      color: "#3B82F6",
    },

    {
      title: "9",
      start: "2024-03-07",
      color: "#EF4444",
    },
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
            options={regionOption}
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
            options={regionOption}
          />
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
          start: "prev,next",
          center: "title",
          
          end: "dayGridMonth,timeGridWeek",
        }}
        eventAdd={() => {}}
        eventBackgroundColor="#fff"
        eventClick={(e) => {
          alert(e.event._def.title)

        }}
        events={event}
      />
    </DefaultLayout>
  );
};

export default Calendar;
