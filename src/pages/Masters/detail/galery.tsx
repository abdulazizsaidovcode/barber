import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { master_gallery_id } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import ProcedureItem from '../../../components/MasterCard/master_galery';
import { useTranslation } from 'react-i18next';
import empaty from '../../../images/empty.png';

const Gallery: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const id = location.pathname.substring(8);

  useEffect(() => {
    getMasterGalleryDetails();
  }, [id]);

  const getMasterGalleryDetails = async () => {
    try {
      const response = await axios.get(`${master_gallery_id}${id}`, config);
      const masterArray = response.data.body;
      console.log('service id =>', masterArray);
      setOrderDetails(masterArray);
    } catch (error) {
      console.error('Gallery data not found', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (attachmentId: string) => {
    setOrderDetails((prevDetails) =>
      prevDetails.map((orderDetail) => ({
        ...orderDetail,
        resGalleryAttachments: orderDetail.resGalleryAttachments.filter(
          (attachment: any) => attachment.attachmentId !== attachmentId,
        ),
      })),
    );
  };

  return (
    <div className="p-5 flex flex-col gap-10">
      {isLoading ? (
        <p>{t('Loading...')}</p>
      ) : orderDetails.length === 0 ? (
        <div className="w-full flex justify-center">
          <img width={120} height={120} src={empaty} alt="" />
        </div>
      ) : (
        orderDetails.map((orderDetail, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between shadow-lg p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <p className="lg:block hidden text-black dark:text-white">
                  {t('Album')} {index + 1}
                </p>
                <p className="text-sm sm:text-lg text-black dark:text-white lg:text-xl font-bold">
                  {orderDetail.albumName}
                </p>
              </div>
              <div>
                <p className="font-bold lg:text-xl text-black dark:text-white text-sm">
                  {orderDetail.date}
                </p>
              </div>
            </div>
            <div className="w-full shadow-lg rounded-xl flex gap-10 p-3">
              {orderDetail.resGalleryAttachments.length !== 0 ? (
                orderDetail.resGalleryAttachments.map(
                  (attachment: any, subIndex: number) => (
                    <ProcedureItem
                      getFunc={getMasterGalleryDetails}
                      galleryId={orderDetail.id}
                      key={subIndex}
                      status={attachment.newStatus}
                      imgUrl={attachment.attachmentId}
                      attachmentId={attachment.attachmentId}
                      onDelete={handleDelete}
                    />
                  ),
                )
              ) : (
                <div className="w-full flex justify-center">
                  <img width={120} height={120} src={empaty} alt="" />
                </div>
              )}
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Gallery;
