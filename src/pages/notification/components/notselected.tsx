import { useTranslation } from "react-i18next"

const Notselected = () => {
    const { t } = useTranslation()
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='text-center'>
                <p className='text-gray-600 text-lg'>{t("Chat_not_selected")}</p>
                <p className='text-gray-500'>{t("Select_one_from")}</p>
            </div>
        </div>
    )
}

export default Notselected