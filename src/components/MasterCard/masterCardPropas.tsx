import React from 'react';

interface MasterCardStatusProps {
  masterName: string;
  specialistTitle: string;
  phoneNumber: string;
  imageUrl: string;
}

const MasterCardPropas: React.FC<MasterCardStatusProps> = ({
  masterName,
  specialistTitle,
  phoneNumber,
  imageUrl,
}) => {
  return (
    <div className='w-full flex justify-between'>
      <div className=''>
        <div className='w-full  shadow-lg p-3 rounded-lg mb-3'>
          <div className='flex justify-between mb-3'>
            <h1 className='font-bold'>{masterName}</h1>
            {/* Display any additional master-related information here */}
          </div>
          <div className='flex justify-center mb-3'>
            <img
              src={imageUrl}
              className='rounded-full'
              alt='master'
              style={{ width: '100px', height: '100px' }} // Adjust size as needed
            />
          </div>
          <h1 className='text-center mb-2'>{specialistTitle}</h1>
          <p className='text-center mb-3'>{phoneNumber}</p>
        </div>
        <div className='w-full bg-white shadow-lg p-3 rounded-lg mb-3'>
          <div className='flex justify-between mb-3 '>
            <h1>Остановить</h1>
            <div className='bg-gray-300 p-1 rounded-full'>
              <input type='switch' />
            </div>
          </div>
          <div className='flex justify-between'>
            <h1 className='font-bold mt-2'>Остановить</h1>
            <button className='bg-[#9C0A35] px-8 py-2 rounded-lg text-white'>
              Продлить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterCardPropas;
