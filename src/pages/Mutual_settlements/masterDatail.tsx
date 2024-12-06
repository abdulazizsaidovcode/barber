
import { useEffect, useState } from 'react'
import MasterCard from '../../components/MasterCard/masterCard'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios'
import { base_url, getFileId } from '../../helpers/api'
import { useParams } from 'react-router-dom'
import { config } from '../../helpers/token'
import { useTranslation } from 'react-i18next'
import defaultImg from '../../images/user.png'

interface Data {
  masterId: string,
  attachmentId: string | null,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  masterSpecialization: string | null,
  subscriptionPeriod: string,
  price: number,
  startDate: string,
  masterStatus: string,
  endDate: string
}

const MasterDatail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation()
  const [masterData, setMasterData] = useState<Data | null>(null);

  useEffect(() => {
    const getMasterById = async () => {
      try {
        const { data } = await axios.get(`${base_url}tariff/master-one/${id}`, config)
        if (data.success) setMasterData(data.body)
      } catch {

      }
    }

    getMasterById()
  }, [])

  console.log(masterData);


  return (
    <div>
      <DefaultLayout>
        <div className='bg-white dark:bg-black rounded-lg w-full p-3 min-h-screen'>
          <div className='mb-30'>
            <MasterCard
              masterName={masterData ? `${masterData.firstName} ${masterData.lastName}` : t('no_info')}
              day={masterData?.subscriptionPeriod ?? t('no_info')}
              status={masterData?.masterStatus ?? t('no_info')}
              specialistTitle={masterData?.masterSpecialization ?? t('no_info')}
              phoneNumber={masterData?.phoneNumber ?? t('no_info')}
              imageUrl={masterData?.attachmentId ? getFileId + masterData.attachmentId : defaultImg}
              masterData={[
                {
                  name: 'Цена',
                  price: masterData?.price ?? t('no_info')
                },
                {
                  name: 'Дата оплаты',
                  price: masterData?.startDate ?? t('no_info')
                },
                {
                  name: 'Дата начала',
                  price: masterData?.startDate ?? t('no_info')
                },
                {
                  name: 'Дата окончания',
                  price: masterData?.endDate ?? t('no_info')
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