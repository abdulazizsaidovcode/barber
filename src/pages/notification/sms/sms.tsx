import { useEffect, useRef, useState } from 'react';
import ChatEmptyState from '../components/emptychat';
import { IoMdAttach } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import Notselected from '../components/notselected';
import { ChatSentSmsType, ChatSentSmstList } from '../../../types/chat';
import { getFileId } from '../../../helpers/api';
import { Dropdown, Menu } from 'antd';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { BiReply, BiReplyAll } from 'react-icons/bi';
import { ImCancelCircle } from "react-icons/im";
import { EditFilled } from '@ant-design/icons';
import Modal from '../../../components/modals/modal';
import { Buttons } from '../../../components/buttons';
import TextArea from 'antd/es/input/TextArea';
import { GiCancel } from 'react-icons/gi';

const Sms = ({ editId, replyId, deleteId, senderId, sendMessage, chat, setContent, content, reply, deleteMessage, editMessage, setPhoto }: ChatSentSmsType) => {
  const [chats, setChats] = useState<ChatSentSmstList[]>(chat);
  const [selreplyId, setSelreplyId] = useState<string>("");
  const [seleditId, setseleditId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attachmentIds, setAttachmentIds] = useState<any>(null);
  const [photo, setPhotos] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setChats(chat);
  }, [chat]);

  const handleDelete = () => {
    deleteMessage();
  };

  const handleReply = (id: any) => {
    setseleditId("")
    setSelreplyId(id)
    replyId(id)
    setseleditId("")
    setContent("")
  };

  const handleEdit = (id: any) => {
    let cont = chats.find((item) => item.id === id)?.content;
    editId(id);
    setseleditId(id)
    setContent(cont);
    setSelreplyId("")
  };

  const items = (id: any) => [
    {
      key: '1',
      onClick: () => {
        openModal()
        deleteId(id)
      },
      label: "Удалить",
    },
    {
      key: '2',
      onClick: () => handleReply(id),
      label: "Ответить",
    },
    {
      key: '3',
      onClick: () => handleEdit(id),
      label: "Редактировать",
    },
  ];

  const openModal = () => {
    setModalOpen(!modalOpen)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Enter bosilganda yangi qatorga tushishni to'xtatish
    }
  };


  const setAttachment = (info: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = info.target.files ? info.target.files[0] : null;
    setPhoto(selectedFile);
    setAttachmentIds(selectedFile)

    if (selectedFile) {
      setPhotoPreview(URL.createObjectURL(selectedFile));
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <div className='h-full relative pl-4'>
      {chat.length > 0 ? (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-200 flex-1 h-full overflow-hidden">
            <div className='w-full h-full overflow-y-auto'>
              {chats.length > 0 ? (
                chats.map((item, index) => (
                  <div key={index} className={`py-2 ${item.senderId === senderId ? "flex items-end justify-end flex-col" : "justify-start"}`}>
                    <div className="flex items-center mb-2">
                      <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={item.senderId !== senderId ? getFileId + item.receiverImg : getFileId + item.senderImg}
                        alt="User Avatar"
                      />
                      <div className="font-medium">{item.senderId === senderId ? item.senderName : item.receiverName}</div>
                    </div>
                    <div className={`p-2 rounded-md flex flex-col  ${item.replayDto ? "dark:bg-[#9c093543] bg-[#85828343]" : ""} ${item.senderId === senderId ? "items-end ml-20" : "items-start mr-20"}`}>
                      {item.replayDto &&
                        <div className={`flex gap-2 items-center ${item.senderId === senderId ? "justify-end" : "justify-start"}`}>
                          <div className='w-10 h-10 flex justify-center items-center'>
                            <BiReply style={{ fontSize: 25 }} />
                          </div>
                          <div className={`bg-gray text-black py-1 px-3 mb-1 rounded-md  dark:border-[#9c0935] ${item.senderId === senderId ? "border-r-2" : "border-l-2"}`}>{item.replayDto.content}</div>
                        </div>
                      }
                      {
                        item.attachmentIds.length > 0 ?
                          <img src={`${getFileId + item.attachmentIds[0]}`} alt="" className='rounded-md mb-2' />
                          : null

                      }
                      <p className={`flex items-center gap-5 ${item.senderId === senderId ? "bg-white rounded-lg py-2 px-3 shadow max-w-sm w-max" : "bg-lime-500 text-white rounded-lg py-2 px-3 shadow mb-2 max-w-max flex-col-reverse"}`}>
                        <p className='w-[95%]'>{item.content ? item.content : "(null)"}</p>
                        <Dropdown overlay={<Menu items={items(item.id)} />} placement="bottomLeft" arrow>
                          <PiDotsThreeOutlineVertical style={{ fontSize: 16 }} />
                        </Dropdown>
                      </p>
                    </div>
                    <p className="text-xs">{item.createdAt}</p>
                  </div>
                ))
              ) : (
                <ChatEmptyState />
              )}
            </div>
          </div>
          {
            selreplyId &&
              chats.length > 0 ? chats.filter(item => item.id === selreplyId).map((item, index) => (
                <div key={index} className='border flex gap-3 justify-between rounded-t-md p-3'>
                  <div className='flex gap-3'>
                    <BiReply style={{ fontSize: 25 }} />
                    <p>{item.content}</p>
                  </div>
                  <button onClick={() => {
                    setSelreplyId("")
                    handleReply(null)
                  }}>
                    <ImCancelCircle />
                  </button>
                </div>
              )) : null

          }
          <div className="px-4 py-2 border">
            <div className="flex items-center gap-5 w-full">
              <TextArea value={content}
                className="w-full border-none py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0 custom-textarea"
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={handleKeyDown}
                autoSize />
              <div className="flex justify-end items-center text-2xl w-1/2 gap-5">
                <div className='flex items-center'>
                  <input type="file" onChange={setAttachment} className="hidden" ref={fileInputRef} />
                  <IoMdAttach className="cursor-pointer text-3xl" onClick={handleClick} />
                  {photoPreview ? (
                    <div className='flex items-center gap-2 '>
                      <img
                        className="w-10 h-10 rounded-md p-1 bg-[#9c0935]"
                        src={photoPreview}
                        alt="User Avatar" />
                      <button onClick={() => {
                        setPhotoPreview(null)
                        setPhoto(null)
                      }}>
                        <GiCancel />
                      </button>
                    </div>) :
                    null}

                </div>
                {(content.trim() || photoPreview) && !selreplyId && !seleditId && <button onClick={sendMessage}><IoSend /></button>}
                {(content.trim() || photoPreview) ? selreplyId && <button onClick={() => {
                  reply()
                  setSelreplyId("")
                }}><BiReplyAll /></button> : null}
                {(content.trim() || photoPreview) ? seleditId && <button onClick={() => {
                  editMessage()
                  setseleditId("")
                }
                }><EditFilled /></button> : null}
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
        <div className=' max-w-96 w-96 pt-10'>
          <p className='mb-20 text-center '>habarni o'chirish</p>

          <div className='flex gap-5 justify-center'>
            <Buttons onClick={() => openModal}>
              cansel
            </Buttons>
            <Buttons onClick={() => {
              handleDelete()
              openModal()
            }}>
              Delete
            </Buttons>
          </div>
        </div>
      </Modal >
    </div >
  );
};

export default Sms;
