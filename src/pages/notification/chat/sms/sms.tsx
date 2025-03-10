import { useEffect, useRef, useState } from 'react';
import ChatEmptyState from '../../components/emptychat';
import { IoMdAttach } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import Notselected from '../../components/notselected';
import { ChatSentSmsType, ChatSentSmstList } from '../../../../types/chat';
import { getFileId } from '../../../../helpers/api';
import { Dropdown, Menu } from 'antd';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { BiReply, BiReplyAll } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { ArrowDownOutlined, EditFilled } from '@ant-design/icons';
import Modal from '../../../../components/modals/modal';
import { Buttons } from '../../../../components/buttons';
import TextArea from 'antd/es/input/TextArea';
import { GiCancel } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const Sms = ({
               recipientId,
               editId,
               replyId,
               deleteId,
               senderId,
               sendMessage,
               chat,
               setContent,
               content,
               reply,
               deleteMessage,
               editMessage,
               setPhoto,
               markMessageAsRead
             }: ChatSentSmsType) => {
  const [chats, setChats] = useState<ChatSentSmstList[]>(chat);
  const { t } = useTranslation();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [prevChatsLength, setPrevChatsLength] = useState<number>(chat.length);

  const [selreplyId, setSelreplyId] = useState<string>('');
  const [seleditId, setseleditId] = useState<string | null>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attachmentIds, setAttachmentIds] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [unReadMessages, setUnReadMessages] = useState<any[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getUnreadMessages = () => {
    const unread = chats.filter((item) => !item.read);
    setUnReadMessages(unread);
  };

  useEffect(() => {
    isRead();
  }, [recipientId]);

  useEffect(() => {
    getUnreadMessages();

  }, [chats]);

  useEffect(() => {
    setChats(chat);
  }, [chat]);

  function isRead() {

    let arr = chat.filter((item) => item.read === false);
    markMessageAsRead(arr);
    console.log(arr);

  }

  const scrollToBottom = (behavior: ScrollBehavior) => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  // setTimeout(() => {
  //   ;
  // }, 1000);
  useEffect(() => {
    scrollToBottom('auto');
  }, [chats]);

  useEffect(() => {
    setPrevChatsLength(chats.length);
  }, [chats.length]);

  const handleDelete = () => {
    deleteMessage();
  };

  const handleReply = (id: any) => {
    setseleditId('');
    setSelreplyId(id);
    replyId(id);
    setseleditId('');
    setContent('');
  };

  const handleEdit = (id: any) => {
    let cont = chats.find((item) => item.id === id)?.content;
    editId(id);
    setseleditId(id);
    setContent(cont);
    setSelreplyId('');
  };

  const items = (id: any) => [
    {
      key: '1',
      onClick: () => {
        openModal();
        deleteId(id);
      },
      label: t('Delete')
    },
    {
      key: '2',
      onClick: () => handleReply(id),
      label: t('Answer')
    },
    {
      key: '3',
      onClick: () => handleEdit(id),
      label: t('Edit')
    }
  ];

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const setAttachment = (info: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = info.target.files ? info.target.files[0] : null;
    setPhoto(selectedFile);
    setAttachmentIds(selectedFile);

    if (selectedFile) {
      setPhotoPreview(URL.createObjectURL(selectedFile));
    } else {
      setPhotoPreview(null);
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chats]);

  const handleSendMessage = () => {
    sendMessage();
    setPhotoPreview(null);
    setPhoto(null);
    scrollToBottom('smooth');
  };

  return (
    <div className="h-full relative pl-4">
      {chat ? (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-200 flex-1 h-full overflow-hidden" ref={chatContainerRef}>
            <div className="w-full h-full overflow-y-auto">
              {chats && chats.length > 0 ? (
                chats.map((item, index) => (
                  <div
                    key={index}
                    id={`message-${item.id}`}
                    className={`py-2 ${item.senderId === senderId ? 'flex items-end justify-end flex-col' : 'justify-start'}`}
                  >
                    <div className="flex items-center mb-2">
                      <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={item.senderId !== senderId ? getFileId + item.receiverImg : getFileId + item.senderImg}
                        alt="User Avatar"
                      />
                      <div
                        className="font-medium">{item.senderId === senderId ? item.senderName : item.receiverName}</div>
                    </div>
                    <div
                      className={`p-2 rounded-md flex flex-col ${item.replayDto ? 'dark:bg-[#9c093543] bg-[#85828343]' : ''} ${item.senderId === senderId ? 'items-end ml-20' : 'items-start mr-20'}`}
                    >
                      {item.replayDto && (
                        <div
                          className={`flex gap-2 items-center ${item.senderId === senderId ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="w-10 h-10 flex justify-center items-center">
                            <BiReply style={{ fontSize: 25 }} />
                          </div>
                          <div
                            className={`bg-gray text-black py-1 px-3 mb-1 rounded-md dark:border-[#9c0935] ${item.senderId === senderId ? 'border-r-2' : 'border-l-2'}`}
                          >
                            {item.replayDto.content ? item.replayDto.content :
                              <img src={`${getFileId + item.attachmentIds[0]}`} alt="" className="w-10 h-10" />}
                          </div>
                        </div>
                      )}
                      {item.attachmentIds.length > 0 && (
                        <div className="relative">
                          <img src={`${getFileId + item.attachmentIds[0]}`} alt="" className="rounded-md mb-2" />
                          {!item.content && (
                            <div className="absolute top-3 right-2">
                              <Dropdown overlay={<Menu items={items(item.id)} />} placement="bottomLeft" arrow>
                                <PiDotsThreeOutlineVertical style={{ fontSize: 24, color: 'white' }} />
                              </Dropdown>
                            </div>
                          )}
                        </div>
                      )}
                      {item.content && (
                        <p
                          className={`flex items-start gap-5 ${item.senderId === senderId ? 'bg-white rounded-lg py-2 px-3 shadow max-w-sm w-max' : 'bg-lime-500 text-white rounded-lg py-2 px-3 shadow mb-2 max-w-max flex-row-reverse'}`}
                        >
                          <p className="w-[95%]">{item.content ? item.content : '(null)'}</p>
                          <Dropdown overlay={<Menu items={items(item.id)} />} placement="bottomLeft" arrow>
                            <PiDotsThreeOutlineVertical style={{ fontSize: 20, width: '20px' }} />
                          </Dropdown>
                        </p>
                      )}
                    </div>
                    <p className="text-xs">{moment(item.createdAt).format('DD.MM.YYYY')}</p>
                  </div>
                ))
              ) : <ChatEmptyState />}
              <div ref={bottomRef} />
            </div>
          </div>
          {selreplyId &&
            chats.length > 0 &&
            chats.filter((item) => item.id === selreplyId).map((item, index) => (
              <div key={index} className="border flex gap-3 justify-between rounded-t-md p-3">
                <div className="flex gap-3">
                  <BiReply style={{ fontSize: 25 }} />
                  <p>{item.content}</p>
                </div>
                <button
                  onClick={() => {
                    setSelreplyId('');
                    handleReply(null);
                  }}
                >
                  <ImCancelCircle />
                </button>
              </div>
            ))}

          <div className="px-4 py-2 border relative">
            {isAtBottom && unReadMessages.length > 0 && (
              <button
                onClick={() => {
                  isRead();
                }} className="flex justify-center h-max flex-col items-center bottom-5 left-[90%] absolute -top-13">
                <div className="relative">
                  {unReadMessages.length !== 0 && (
                    <span
                      className="absolute -top-2 left-2 w-4 h-4 flex items-center justify-center bg-gray text-black rounded-full ">
                      {unReadMessages.length}
                    </span>
                  )}
                </div>
                <p className="w-10 h-10 flex items-center justify-center bg-gray text-black rounded-full p-5 ">
                  <ArrowDownOutlined className="text-white text-xl " />
                </p>
              </button>
            )}
            <div className="flex items-center gap-5 w-full">
              <TextArea
                value={content}
                className="w-full border-none py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0 custom-textarea"
                onChange={(e) => setContent(e.target.value)}
                placeholder={t('Type_your_message')}
                onKeyDown={handleKeyDown}
                autoSize
              />

              <div className="flex justify-end items-center text-2xl w-1/2 gap-5">
                {seleditId &&
                  <button
                    onClick={() => {
                      setseleditId(null);
                      content = '';
                    }}>
                    <GiCancel className="text-xl" />
                  </button>
                }
                <div className="flex items-center">
                  <input type="file" onChange={setAttachment} className="hidden" ref={fileInputRef} />
                  <IoMdAttach className="cursor-pointer text-3xl" onClick={handleClick} />
                  {photoPreview ? (
                    <div className="flex items-center gap-2 ">
                      <img className="w-10 h-10 rounded-md p-1 bg-[#9c0935]" src={photoPreview} alt="User Avatar" />
                      <button
                        onClick={() => {
                          setPhotoPreview(null);
                          setPhoto(null);
                        }}
                      >
                        <GiCancel />
                      </button>
                    </div>
                  ) : null}
                </div>
                {(content.trim() || photoPreview) && !selreplyId && !seleditId && <button onClick={() => {
                  handleSendMessage();
                  scrollToBottom('smooth');
                }}><IoSend /></button>}
                {(content.trim() || photoPreview) && selreplyId && <button onClick={() => {
                  reply();
                  setSelreplyId('');
                  setPhotoPreview(null);
                  setPhoto(null);
                  scrollToBottom('smooth');
                }}><BiReplyAll /></button>}
                {(content.trim() || photoPreview) && seleditId && <button onClick={() => {
                  editMessage();
                  setseleditId('');
                  setPhotoPreview(null);
                  setPhoto(null);
                }}><EditFilled /></button>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-96 relative z-0">
          <Notselected />
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={openModal}>
        <div className=" max-w-96 w-96 pt-10">
          <p className="mb-20 text-center ">{t('delete_the_message')}</p>
          <div className="flex gap-5 justify-center">
            <Buttons onClick={() => openModal()}>{t('cancel')}</Buttons>
            <Buttons onClick={() => {
              handleDelete();
              openModal();
            }}>{t('Delete')}</Buttons>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sms;
