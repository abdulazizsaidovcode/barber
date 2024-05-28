import MainCard from '../../components/settings/mainCard';
import DefaultLayout from '../../layout/DefaultLayout';

const Settings = () => {
  return (
    <DefaultLayout>
      <div>
        <div className='flex justify-between w-[85%] mb-7'>
          <MainCard text='Категории услуги специализации' link='/service-categories'/>
          <MainCard text='Онлайн бронирование' link=''/>  
          <MainCard text='Галереи' link=''/>
        </div>
        <div className='flex justify-between w-[85%]'>
          <MainCard text='Специализации' link='/specializations'/>
          <MainCard text='Тарифы и функционал' link=''/>
          <MainCard text='Помощь' link=''/>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
