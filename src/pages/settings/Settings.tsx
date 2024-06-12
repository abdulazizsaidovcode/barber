import { useTranslation } from 'react-i18next';
import MainCard from '../../components/settings/mainCard';
import DefaultLayout from '../../layout/DefaultLayout';

const Settings = () => {
  const { t } = useTranslation()
  return (
    <DefaultLayout>
      <div>
        <div className='flex gap-5 flex-wrap lg:flex-row flex-col w-[100%] mb-7'>
          <MainCard text={t("Specialization_service_categories")} link='/settings/service-categories' />
          <MainCard text={t("Online_booking")} link='/settings/online-booking' />
          <MainCard text='Специализации' link='/settings/specializations' />
          <MainCard text='Тарифы и функционал' link='/settings/tariffs-functionality' />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
