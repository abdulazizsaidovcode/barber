import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MasterCardInfo from '../../../components/MasterCard/MasterCardR';
import { master_full_data } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import userImg from '../../../images/user.png';
import { useTranslation } from 'react-i18next';

const DetailMaster: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const id = location.pathname.substring(8);
  console.log(id);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${master_full_data}/${id}`, config)
      .then((response) => {
        const master = response.data.body;
        console.log(`detail page with id${master}`);
        setOrderDetails(master);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p className="dark:text-white">{t("Loading_order_details")}</p>
      ) : orderDetails ? (
        <div>
          <MasterCardInfo
            StatusNow={orderDetails.masterChatStatus}
            Specialization={orderDetails.masterSpecialization[1]}
            ServiceCategory={orderDetails.masterServiceCategory}
            GenderType={orderDetails.directionByGender}
            PlaceOfWork={orderDetails.placeOfWork}
            StartData={
              orderDetails.startDate === null
                ? t("Not_available")
                : orderDetails.startDate
            }
            Telegram={
              orderDetails.telegramLink === null
                ? t("Not_available")
                : orderDetails.telegramLink
            }
            Level={
              orderDetails.masterFeedbackCount === null
                ? t("Not_available")
                : orderDetails.masterFeedbackCount
            }
            Clients={
              orderDetails.clientCount === null
                ? t("Not_available")
                : orderDetails.clientCount
            }
            rejectedOrderCount={
              orderDetails.rejectedOrderCount === null
                ? t("Not_available")
                : orderDetails.rejectedOrderCount
            }
            CompOrders={
              orderDetails.completedOrderCount === null
                ? t("Not_available")
                : orderDetails.completedOrderCount
            }
            Instagram={
              orderDetails.instagramLink === null
                ? t("Not_available")
                : orderDetails.instagramLink
            }
            Number={orderDetails.phoneNumber}
            Region={
              orderDetails.regionName === null
                ? t("Not_available")
                : orderDetails.regionName
            }
            City={
              orderDetails.districtName === null
                ? t("Not_available")
                : orderDetails.districtName
            }
            Age={orderDetails.age === null ? t("Not_available") : orderDetails.age}
            Gender={
              orderDetails.gender === null ? t("Not_available") : orderDetails.gender
            }
            UserName={
              orderDetails.nickname === null
                ? t("Not_available")
                : orderDetails.nickname
            }
            SurName={orderDetails.lastName}
            Location={
              orderDetails.address === null
                ? t("Address_Not_available")
                : orderDetails.address
            }
            scheduleType={orderDetails.scheduleType}
            MasterName={orderDetails.firstName}
            MasterImg={
              orderDetails.masterImgId === null
                ? userImg
                : orderDetails.masterImgId
            }
            definitionType={
              orderDetails.masterPhone === undefined
                ? t("Not_available")
                : orderDetails.masterPhone
            }
            Status={orderDetails.status}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <p className="dark:text-white">{t("No_order_details_found")}</p>
      )}
    </div>
  );
};

export default DetailMaster;
