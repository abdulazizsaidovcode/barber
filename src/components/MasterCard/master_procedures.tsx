import React from 'react';

interface ProceduresProps {
  title: string;
  imgUrl: string;
  price: number;
  duration: number;
  description: string;
  serviceStatus: string;
}

const MasterProcedures: React.FC<ProceduresProps> = ({
  title,
  imgUrl,
  price,
  duration,
  description,
  serviceStatus,
}) => {
  return (
    <div className="flex w-full lg:w-[100%] bg-white dark:bg-[#ffffffdf] text-black dark:text-black   border-gray-300 shadow-lg p-3 rounded-xl mb-4">
      <div className="w-1/3">
        <img
          src={imgUrl}
          alt="Procedure"
          className="w-[50%] ml-6 h-auto rounded"
        />
      </div>
      <div className="w-2/3 pl-4">
        <h2 className="text-xl font-bold mb-2 text-blue-600">{title}</h2>
        <p className="mb-2">
          <strong>Цена:</strong> {price} сум
        </p>
        <p className="mb-2">
          <strong>Длительность:</strong> {Math.floor(duration / 60)} час{' '}
          {duration % 60} минут
        </p>
        <p className="mb-2">
          <strong>Описание:</strong> {description}
        </p>
        <div className="flex items-center mb-2">
          <span
            className={`inline-block px-2 py-1 text-sm font-semibold rounded ${
              serviceStatus === 'APPROVED'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {serviceStatus === 'APPROVED' ? 'Одобрена' : 'Новая или измененная'}
          </span>
          <div className="ml-4 flex items-center space-x-2">
            <button className="bg-green-500 text-white py-1 px-2 rounded flex items-center">
              <i className="fas fa-check"></i>
            </button>
            <button className="bg-red-500 text-white py-1 px-2 rounded flex items-center">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterProcedures;
