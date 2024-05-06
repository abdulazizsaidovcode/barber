import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
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
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />
      <div className="grid grid-cols-2 gap-5 my-5">
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-green-500 flex justify-center items-center rounded-lg text-white">
            Завершён
          </div>
          <div className="bg-blue-500 flex justify-center items-center rounded-lg text-white">
            Одобрен
          </div>
          <div className="bg-orange-500 flex justify-center items-center rounded-lg text-white" >
            На одобрении
          </div>
          <div className="bg-red-500 flex justify-center items-center rounded-lg text-white" >
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
        plugins={[dayGridPlugin, resourceTimelinePlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{

          start: "prev,today,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }
        }
      />
    </DefaultLayout>
  );
};

export default Calendar;
