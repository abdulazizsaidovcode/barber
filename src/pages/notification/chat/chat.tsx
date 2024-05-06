
import { Link } from 'react-router-dom';
import { CgMenuLeft } from 'react-icons/cg';
import { useEffect, useState } from 'react';
// ========= images ======= //
// import user from "../../../../public/img/chat/user.jpg"

const Chat = () => {
    const [chats, setchats] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState('w-max');

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
                setSidebarWidth('w-1/6'); // md: ekranlar va undan kattaroq uchun
            } else {
                setSidebarWidth('w-20'); // kichik ekranda boshlang'ich holat
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
        setSidebarWidth(currentWidth => (currentWidth === 'w-max' ? 'w-20' : 'w-max'));
    };

    useEffect(() => {
    })



    return (
        <div className='flex w-[100%]'>
            <div className={`${sidebarWidth} md:w-1/4  md:px-3 border py-5 h-screen overflow-scrool transition-width duration-300 flex flex-col`}>
                <button onClick={toggleSidebar} className="md:hidden pl-5  text-black mb-2">
                    {/* <CgMenuLeft className='text-[1.5rem] font-bold' /> */}
                </button>
                <div className={`${sidebarWidth == "w-max" ? "p-3 border" : "py-2"}   `}>
                    {/* <Chatusers user={data} widthbar={sidebarWidth} /> */}
                </div>
            </div>
            <div className=' w-full relative overflow-y-auto'>
                {data.length > 0 ?
                    <div className="w-full h-[100%] flex flex-col overflow-scroll">
                        <div className="bg-gray-200 flex-1 overflow-y-scroll pb-20 pt-5 px-4">
                            {/* <Link> */}
                            <h1 className='text-xl hover:text-lime-600 mb-10'>Teshavoy (998 91 959 55 99)</h1>
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
                                    <h1 className='mb-2'>Abdul Aziz</h1>
                                    <div className="bg-lime-500 text-white rounded-lg p-2 shadow  max-w-sm mb-2">
                                        Sure, I can help with that.
                                    </div>
                                    <p className='text-xs'>12.23.2024</p>
                                </div>

                            </div> : "error"
                            }
                            <p className='text-center'>thats all 🙂</p>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 fixed bottom-0 w-[74%]">
                            <div className="flex items-center w-full">
                                <input className="w-full border rounded-full py-2 px-4 mr-2" type="text" placeholder="Type your message..." />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='w-full'>
                        {/* <WaitingLoading /> */}
                        "error"
                    </div>}
            </div>

        </div>
    )
}

export default Chat