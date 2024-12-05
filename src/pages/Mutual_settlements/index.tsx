import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.tsx";

import MainTabs from "./mainTabs.tsx";
import { useTranslation } from "react-i18next";




const Mortal: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <DefaultLayout>
        <div className=' w-full p-3 max-h-screen'>
          <Breadcrumb pageName={t("subscription")} />
          <MainTabs />
        </div>


      </DefaultLayout>
    </div>
  )
}

export default Mortal