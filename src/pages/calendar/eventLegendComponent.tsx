import React from "react";

const EventLegendComponent: React.FC = () => (
  <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
    <div className="bg-green-500 flex justify-center text-center items-center rounded-lg text-white p-1">
      Завершён
    </div>
    <div className="bg-blue-500 flex justify-center text-center items-center rounded-lg text-white p-1">
      Одобрен
    </div>
    <div className="bg-orange-500 flex justify-center text-center items-center rounded-lg text-white p-1">
      На одобрении
    </div>
    <div className="bg-red-500 flex justify-center text-center items-center rounded-lg text-white p-1">
      Отклонён
    </div>
  </div>
);

export default EventLegendComponent;
