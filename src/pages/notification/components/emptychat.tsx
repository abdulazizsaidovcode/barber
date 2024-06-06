import { BsChatSquareDots } from 'react-icons/bs';

const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <BsChatSquareDots className='text-6xl' />
      <p className="text-lg text-gray-600 mt-5 z-0 relative">пока нет публикаций.</p>
    </div>
  );
};

export default ChatEmptyState;
