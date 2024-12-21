
import MasterCard from '../../components/MasterCard/masterCard'
import DefaultLayout from '../../layout/DefaultLayout'
const MasterDatail = () => {
  return (
    <div>
        <DefaultLayout>
           <div className='bg-white w-full p-3 max-h-screen'>
               <MasterCard
               day=''
               status=''
               masterData={
                []
               }
               masterName='Hello'
               specialistTitle=''
               phoneNumber='+998949899004'
               imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxuazQ7_RGUp4WrKx41JwXBlZ0Xr818VVPQuqcHgzWQ&s'/>
                
           </div>


        </DefaultLayout>
        MasterDatail
    </div>
  )
}

export default MasterDatail