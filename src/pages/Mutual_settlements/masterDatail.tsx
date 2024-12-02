
import MasterCard from '../../components/MasterCard/masterCard'
import PricesCard from '../../components/PricesCard/pricesCard'
import DefaultLayout from '../../layout/DefaultLayout'
const MasterDatail = () => {
  return (
    <div>
      <DefaultLayout>
        <div className='bg-white w-full p-3 min-h-screen'>
          <div className='mb-30'>
          <MasterCard
                masterName="Малика Махмудова"
                specialistTitle="Специалист по наращиванию ресниц"
                phoneNumber="123-456-7890"
                imageUrl="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                masterData={[
                    {
                        name: 'Цена',
                        price: 10000
                    },
                    {
                        name: 'Дата оплаты',
                        price: '25.02 .2024'
                    },
                    {
                        name: 'Дата оплаты',
                        price: '25.02 .2024'
                    },
                    {
                        name: 'Дата окончания',
                        price: '25.05.2024'
                    },
                    // {
                    //     name: 'Способ оплаты',
                    //     price: 'Карта'
                    // }
                ]}
            />
          </div>
          {/* <PricesCard /> */}
        </div>



      </DefaultLayout>
     
    </div>
  )
}

export default MasterDatail