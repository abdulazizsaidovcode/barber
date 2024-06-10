import MainCard from '../../components/settings/mainCard';
import DefaultLayout from '../../layout/DefaultLayout';

const Settings = () => {
  return (
    <DefaultLayout>
      <div>
        <div className='flex gap-5 flex-wrap lg:flex-row flex-col w-[100%] mb-7'>
          <MainCard text='Категории услуги специализации' link='/settings/service-categories'/>
          <MainCard text='Онлайн бронирование' link='/settings/online-booking'/>  
          <MainCard text='Специализации' link='/settings/specializations'/>
          <MainCard text='Тарифы и функционал' link='/settings/tariffs-functionality'/>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
