
import { Link } from 'react-router-dom';
import { CgMenuLeft } from 'react-icons/cg';
import { useEffect, useRef, useState } from 'react';
import Chatusers from '../components/chat components/user';
import Notselected from '../components/chat components/notselected';
import ChatEmptyState from '../components/chat components/emptychat';
import { Input, Select } from 'antd';
import { Buttons } from '../../../components/buttons';
import { IoSearchOutline, IoSend } from 'react-icons/io5';
import { IoMdAttach } from "react-icons/io";
import { FaCheck } from 'react-icons/fa6';
// ========= images ======= //
// import user from "../../../../public/img/chat/user.jpg"

const Chat: React.FC = () => {
    const [chats, setchats] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState('w-max');
    const [siteBar, setsiteBar] = useState<boolean>(false);
    const [siteBarClass, setsiteBarClass] = useState<string>("");

    const data = [
        {
            id: 1,
            img: null,
            name: "Abdulaziz",
            number: "91 959 55 99"
        },
        {
            id: 2,
            img: null,
            name: "Abdulaziz",
            number: "91 959 55 99"
        },
    ]

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setSidebarWidth('w-1/4'); // md: ekranlar va undan kattaroq uchun
            } else {
                setSidebarWidth('fixed z-10 left-0'); // kichik ekranda boshlang'ich holat
            }
        }

        // Ekranning o'zgarishini kuzatish
        window.addEventListener('resize', handleResize);

        // Komponent yuklanganda dastlabki holatni o'rnatish
        handleResize();

        // Tugatishda tozalash
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarWidth(currentWidth => (currentWidth === 'w-max' ? 'fixed' : 'w-max'));
        setsiteBarClass(() => {
            if (siteBar) {
                setsiteBar(false)
                return "translate-x-0 left-0"
            } else {
                setsiteBar(true)
                return "-translate-x-full -left-10"
            }
        })
    };

    useEffect(() => {
        const updateWidth = () => {
            const parent = document.getElementById('parent-container') as HTMLElement;
            const footer = document.getElementById('fixed-footer') as HTMLElement;

            if (parent && footer) {
                const parentWidth = parent.offsetWidth;
                footer.style.width = `${parentWidth}px`;
            }
        };

        window.addEventListener('resize', updateWidth);
        updateWidth();

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fayl tanlash oynasini ochuvchi hodisa (event handler)
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>

            <div className="w-full pb-5 flex gap-10 items-center flex-wrap ">
                <button onClick={toggleSidebar} className="md:hidden  text-black mb-2">
                    <CgMenuLeft className='text-[1.5rem] font-bold' />
                </button>

                <Input
                    prefix={<IoSearchOutline />}
                    className='w-max dark:bg-gray' />
                <Select
                    defaultValue="lucy"
                    className='w-40 dark:bg-gray'
                    dropdownClassName="my-custom-dropdown"
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                />
                <Buttons>button</Buttons>
                <Buttons>button</Buttons>
            </div>

            <div className='flex w-[100%] relative '>
                <div className={`${sidebarWidth} ${siteBar} ${siteBarClass} transition-all sidebar md:translate-x-0 -translate-x-full  sm:w-2/3 w-3/4 bg-graymedium drop-shadow-1 dark:bg-[#30303d] md:static fixed z-10 top-[130px]  md:px-3 p-5 y border md:py-5 h-[83vh]   duration-300 flex flex-col`}>
                    <div className={`w-full`}>
                        <Chatusers user={data} />
                    </div>
                </div>
                <div className=' w-full relative overflow-y-auto'>
                    {data.length > 0 ?
                        <div className="w-full h-[100%] flex flex-col overflow-auto">
                            <div className="bg-gray-200 flex-1 overflow-y-auto pb-20 pt-5 px-4">
                                {/* <Link> */}
                                {!chats ? <h1 className='text-xl hover:text-lime-600 mb-10'>Teshavoy (998 91 959 55 99)</h1> : ""}
                                {/* </Link> */}
                                {!chats ? <div className=" py-2">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar" />
                                            <div className="font-medium">John Doe</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                                            Hi, how can I help you?
                                        </div>
                                        <p className='text-xs'>12.23.2024</p>
                                    </div>
                                    <div className="flex items-end justify-end flex-col">
                                        <div className="flex items-center mb-2">
                                            <img className="w-8 h-8 rounded-full mr-2" src="https://picsum.photos/50/50" alt="User Avatar" />
                                            <div className="font-medium">Abdul Aziz</div>
                                        </div>
                                        <div className="bg-lime-500 text-white rounded-lg p-2 shadow  max-w-sm mb-2">
                                            Sure, I can help with that.
                                        </div>
                                        <p className='text-xs'>12.23.2024</p>
                                    </div>

                                </div> : <ChatEmptyState />
                                }
                                {chats ? <p className='text-center'>thats all 🙂</p> : ""}
                            </div>
                            <div id="parent-container" className="container">
                                <div className=" bg-gray-100 px-4 py-2 border fixed bottom-3 w-full sm:ml-[12px] sm:left-auto left-[50%] sm:translate-x-0 -translate-x-[50%]" style={{ width: 'inherit' }} id="fixed-footer">
                                    <div className="flex items-center gap-5 w-full">
                                        <input className="w-1/2 border-none rounded-full py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0" type="text" placeholder="Type your message..." />

                                        <div className='flex justify-end items-center text-2xl w-1/2 gap-5'>

                                            <div>
                                                {/* useRef bilan input elementiga murojaat qilamiz */}
                                                <input type="file" className="hidden" ref={fileInputRef} />
                                                {/* onClick hodisasini boshqarish */}
                                                <IoMdAttach className="cursor-pointer text-xl" onClick={handleClick} />
                                            </div>
                                            < FaCheck />
                                            <Buttons><IoSend /></Buttons>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='w-full relative z-0'>
                            <Notselected />
                        </div>}
                </div>

            </div>
        </div>
    )
}

export default Chat