import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";

import MainTabs from "./mainTabs.tsx";




const Mortal:React.FC = () => {

  return (
    <div>
        <DefaultLayout>
           <div className=' w-full p-3 max-h-screen'>
               <Breadcrumb pageName="Мастера"  />
                <MainTabs/>
           </div>


        </DefaultLayout>
    </div>
  )
}

export default Mortal