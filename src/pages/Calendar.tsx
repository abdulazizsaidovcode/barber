import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import { Button, Select } from "antd";
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
          <Button type="primary" className="bg-yellow-500 hover:bg-yellow-500 active:bg-yellow-500 focus:bg-yellow-500 ant-btn-danger" block>
            Завершён
          </Button>
          <Button color="red" type="primary"  block>
            Одобрен
          </Button>
          <Button type="primary" block>
            На одобрении
          </Button>
          <Button type="primary" danger block>
            Отклонён
          </Button>
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

          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridMonth,timeGridDay",
        }
        }
      />
    </DefaultLayout>
  );
};

export default Calendar;
