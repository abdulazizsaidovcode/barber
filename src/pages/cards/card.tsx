
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from './../../layout/DefaultLayout';
import MainTabsCard from './mainTabs';
const Card = () => {
  return (
    <div>
     <DefaultLayout>
      <Breadcrumb pageName='Card'/>
      <MainTabsCard/>
     </DefaultLayout>
    </div>
  )
}

export default Card