import React from 'react';
import SecondTabCard from './cards/SecondTabCard';
import { getFileId } from '../../../../helpers/api';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-5'>
      {serviceData.length === 0 ?
        <div className='h-[200px]'>
          <p className='text-xl dark:text-[#60606d]'>{t("Master_services_not_found")}</p>
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
