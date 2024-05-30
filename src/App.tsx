import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import { Login } from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/calendar/Calendar.tsx';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
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
import Id_page from './pages/Calculation/id_page.tsx';
import { getMe } from './helpers/api.tsx';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isToken = sessionStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isToken) navigate(`/auth/signin`);
  }, [pathname]);

  useEffect(() => {
    const refresh = sessionStorage.getItem('refreshUrl');
    setTimeout(() => setLoading(false), 1000);
    if (!refresh) {
      navigate('/auth/signin');
      sessionStorage.setItem('refreshUrl', 'true');
    }
    getMe()
  }, []);

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
          path="/MasterDatail"
          element={
            <>
              <PageTitle title="Взаиморасчёты | Barber" />
              <MasterDatail />
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
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Barber" />
              <FormElements />
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
          path="/service-categories"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <ServiceCategories />
            </>
          }
        />
        <Route
          path="/specializations"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <Specializations />
            </>
          }
        />
        <Route
          path="/online-booking"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <OnlineBooking />
            </>
          }
        />
        <Route
          path="/tariffs-functionality"
          element={
            <>
              <PageTitle title="Settings | Barber" />
              <TariffsFunctionality />
            </>
          }
        />
        <Route
          path="/tariff-detail"
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
          path="/client"
          element={
            <>
              <PageTitle title="client | Barber" />
              <Client />
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
              <PageTitle title="Finance | Barber" />
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
              <Id_page />
            </>
          }
        />
      </Routes>
    </>
  );
}

//Mutual_settlements
export default App;
