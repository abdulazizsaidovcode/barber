import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";
import MainTabsCard from "../cards/mainTabs.tsx";



const Mortal:React.FC = () => {

  return (
    <div>
        <DefaultLayout>
           <div className='bg-white w-full p-3 max-h-screen'>
               <Breadcrumb pageName="Мастера"  />
                <MainTabsCard/>
           </div>


        </DefaultLayout>
    </div>
  )
}

export default Mortal