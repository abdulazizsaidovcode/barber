import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { master_gallery_id } from '../../../helpers/api';
import axios from 'axios';
import { config } from '../../../helpers/token';
import ProcedureItem from '../../../components/MasterCard/master_galery';
import { useTranslation } from 'react-i18next';

const Gallery: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  const id = location.pathname.substring(8);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id: string) => {
    axios
      .get(`${master_gallery_id}${id}`, config)
      .then((response) => {
        const masterArray = response.data.body;
        console.log(`service id =>`, masterArray);
        setOrderDetails(masterArray);
      })
      .catch((error) => {
        console.error('Gallery ga oid malumotlar topilmadi', error);
      });
  };
  const { t } = useTranslation();

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
      {orderDetails.map((orderDetail, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center justify-between shadow-8 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <p>
                {t('Album')}
                {orderDetail.id}
              </p>
              <p className="text-xl font-bold">{orderDetail.albumName}</p>
            </div>
            <div>
              <p className="font-bold text-xl">{orderDetail.date}</p>
            </div>
          </div>
          <div
            key={index}
            className={`w-full  shadow-8 rounded-xl grid grid-cols-5 gap-3 p-3`}
          >
            {orderDetail.resGalleryAttachments &&
              orderDetail.resGalleryAttachments.map(
                (attachment: any, subIndex: number) => (
                  <ProcedureItem
                    galleryId={orderDetail.id}
                    key={subIndex}
                    status={attachment.newStatus}
                    imgUrl={attachment.attachmentId}
                    attachmentId={attachment.attachmentId}
                    onDelete={handleDelete}
                  />
                ),
              )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Gallery;
