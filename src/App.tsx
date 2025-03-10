import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import { Login } from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/calendar/Calendar.tsx';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/settings/Settings.js';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Client from './pages/Client/Client';
import Master from './pages/Masters/Mastera';
import Gallery from './pages/gallery/galery.js';
import Massage from './pages/message';
import Finance from './pages/finance/finance';
import Calculation from './pages/Calculation/calculation';
import Card from './pages/cards/card';
import Natification from './pages/notification/index.js';
import Mortal from './pages/Mutual_settlements/index.js';
import ServiceCategories from './pages/settings/ServiceCategories.js';
import Specializations from './pages/settings/Specializations.js';
import OnlineBooking from './pages/settings/OnlinBooking.tsx';
import MasterDatail from './pages/Mutual_settlements/masterDatail.tsx';
import TariffDetail from './components/settings/details/TariffDetail.tsx';
import TariffsFunctionality from './pages/settings/TariffsFunctionality.tsx';
import Documents from './pages/documents/Documents.tsx';
import { setConfig } from './helpers/token.tsx';
import RequestNewMasters from './components/request/pages/requestNewMasters.tsx';
import RequestFoto from './components/request/pages/requestFoto.tsx';
import RequestSpecializations from './components/request/pages/requestSpecializations.tsx';
import RequestProcedures from './components/request/pages/requestProcedures.tsx';
import MainTabDetail from './pages/Masters/detail/mainTabDetail.tsx';
import Reviews from './pages/reviews/reviews.tsx';
import DetailClient from './pages/Client/detail/detail.tsx';
import TabsComponentForSecondDetail from './pages/Calculation/detail/secondTab.tsx';
import ThirdTab from './pages/Calculation/detail/third.tab.tsx';
import { FirstTab } from './pages/Calculation/detail/firstTab.tsx';
import MailDetail from './pages/notification/mails/mailDetail.tsx';
import Salon from './pages/settings/Salon.tsx';
import { clearFunction } from './common/clear-function/clear-function.tsx';
import RequestSalons from './components/request/pages/requestSalons.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isToken = sessionStorage.getItem('token');

  useEffect(() => {
    setConfig();
    window.scrollTo(0, 0);
    if (!isToken) {
      navigate(`/auth/signin`);
      sessionStorage.clear();
    }
    clearFunction()
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          path={`/`}
          element={
            <>
              <PageTitle title="Dashboard | Barber" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/master-detail/:id"
          element={
            <>
              <PageTitle title="Взаиморасчёты | Barber" />
              <MasterDatail />
            </>
          }
        />
        <Route
          path="/request/new-masters"
          element={
            <>
              <PageTitle title="Request | Barber" />
              <RequestNewMasters />
            </>
          }
        />
        <Route
          path="/request/salons"
          element={
            <>
              <PageTitle title="Request | Barber" />
              <RequestSalons />
            </>
          }
        />
        <Route
          path="/request/foto"
          element={
            <>
              <PageTitle title="Request | Barber" />
              <RequestFoto />
            </>
          }
        />
        <Route
          path="/request/specializations"
          element={
            <>
              <PageTitle title="Request | Barber" />
              <RequestSpecializations />
            </>
          }
        />
        <Route
          path="/request/procedures"
          element={
            <>
              <PageTitle title="Request | Barber" />
              <RequestProcedures />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Barber" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Barber" />
              <Profile />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <PageTitle title="Gallery | Barber" />
              <Gallery />
            </>
          }
        />
        <Route
          path="/client_id/:id"
          element={
            <>
              <PageTitle title="Client | Barber" />
              <DetailClient />
            </>
          }
        />
        <Route
          path="/massage"
          element={
            <>
              <PageTitle title="Massage | Barber" />
              <Massage />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Barber" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Barber" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <Settings />
            </>
          }
        />
        <Route
          path="/settings/service-categories"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <ServiceCategories />
            </>
          }
        />
        <Route
          path="/settings/salon"
          element={
            <>
              <PageTitle title="Settings | Salon" />
              <Salon />
            </>
          }
        />
        <Route
          path="/settings/specializations"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <Specializations />
            </>
          }
        />
        <Route
          path="/settings/online-booking"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <OnlineBooking />
            </>
          }
        />
        <Route
          path="/settings/tariffs-functionality"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <TariffsFunctionality />
            </>
          }
        />
        <Route
          path="/settings/tariff/:id"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <TariffDetail />
            </>
          }
        />
        <Route
          path="/documents"
          element={
            <>
              <PageTitle title="Documents | Barber" />
              <Documents />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Barber" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Barber" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Barber" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Barber" />
              <Login />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Barber" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/master"
          element={
            <>
              <PageTitle title="Master | Barber" />
              <Master />
            </>
          }
        />
        <Route
          path="/master/:id"
          element={
            <>
              <PageTitle title="Master | Barber" />
              <MainTabDetail />
            </>
          }
        />
        <Route
          path="/client"
          element={
            <>
              <PageTitle title="Client | Barber" />
              <Client />
            </>
          }
        />
        <Route
          path="/reviews"
          element={
            <>
              <PageTitle title="Reviews | Barber" />
              <Reviews />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <PageTitle title="Notification | Barber" />
              <Calculation />
            </>
          }
        />
        <Route
          path="/finance"
          element={
            <>
              <PageTitle title="Finance | Barber" />
              <Finance />
            </>
          }
        />
        <Route
          path="/cards"
          element={
            <>
              <PageTitle title="Finance | Barber" />
              <Card />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <PageTitle title="Chat | Barber" />
              <Natification />
            </>
          }
        />
        <Route
          path="/Mutual_settlements"
          element={
            <>
              <PageTitle title="Finance | Barber" />
              <Mortal />
            </>
          }
        />
        <Route
          path="orders/:id"
          element={
            <>
              <PageTitle title="Order | Barber" />
              <FirstTab />
            </>
          }
        />
        <Route
          path="orders_completed/:id"
          element={
            <>
              <PageTitle title="Order | Barber" />
              <TabsComponentForSecondDetail />
            </>
          }
        />
        <Route
          path="orders_rejected1/:id"
          element={
            <>
              <PageTitle title="Order | Barber" />
              <ThirdTab />
            </>
          }
        />
        <Route
          path="mail/:id"
          element={
            <>
              <PageTitle title="Order | Barber" />
              <MailDetail />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
