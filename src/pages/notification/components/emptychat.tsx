import { useTranslation } from 'react-i18next';
import { BsChatSquareDots } from 'react-icons/bs';

const ChatEmptyState = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <BsChatSquareDots className='text-6xl' />
      <p className="text-lg text-gray-600 mt-5 z-0 relative">{t("no_publications_yet")}</p>
    </div>
  );
};

export default ChatEmptyState;
