import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";

import MasterCard from "../../components/MasterCard/masterCard.tsx";




const Mortal = () => {
  return (
    <div>
        <DefaultLayout>
           <div className='bg-white w-full p-3 max-h-screen'>
               <Breadcrumb pageName="Мастера"  />
               <MasterCard/>


           </div>

        </DefaultLayout>
    </div>
  )
}

export default Mortal