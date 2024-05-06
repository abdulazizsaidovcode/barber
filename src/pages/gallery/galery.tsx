import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from './../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './tabs';

const Gallery = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Gallery" />
        <MainTabs />
      </DefaultLayout>
    </div>
  );
};

export default Gallery;
