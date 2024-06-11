import React from 'react';
import SecondTabCard from './cards/SecondTabCard';
import { getFileId } from '../../../../helpers/api';

interface ServiceData {
  category: {
    name: string;
  };
  price: string;
  serviceTime: string;
  attachmentId: string;
  description: string;
}

interface SecondTabProps {
  serviceData: ServiceData[];
}

const SecondTab: React.FC<SecondTabProps> = ({ serviceData }) => {
  return (
    <div className='flex flex-col gap-5'>
      {serviceData.length === 0 ?
        <div>
          <p className='text-xl dark:text-white'>Master services not found</p>
        </div> : serviceData.map((service, index) => (
          <SecondTabCard
            key={index}
            category={service.category.name}
            description={service.description}
            price={service.price}
            duration={service.serviceTime}
            image={getFileId + service.attachmentId}
          />
        ))}
    </div>
  );
}

export default SecondTab;
