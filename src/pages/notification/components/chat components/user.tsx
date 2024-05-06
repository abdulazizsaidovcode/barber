import React, { useEffect, useState } from 'react'


const Chatusers = ({ user, widthbar }: any) => {
    const [widths, setSidebarWidth] = useState('w-max');

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setSidebarWidth(widthbar !== 'w-max' ? 'hidden' : 'block');

        } else if (widthbar == "w-1/6") {
            setSidebarWidth("block"); // kichik ekranda boshlang'ich holat
        }

        console.log(widthbar);
    }, [widthbar])

    return (
        <div className='h-full overflow-y-scroll'>
            <ul>
                {user.length > 0 ? user.map((item: any) =>
                    <li className='flex gap-2 items-center  my-1 border p-2'>
                        <img src={item.img ? item.img : "https://picsum.photos/50/50"} alt="user img" className='w-10 rounded-full' />
                        <div className={`${widths} flex gap-1  flex-col w-max`}>
                            <div className={`flex items-center gap-1 ${widths == 'hidden' ? "" : "flex-col items-start"}`}>
                                <p className='text-sm'>{item.name ? item.name : "namae "} </p>
                                <p className='text-xs'> ({item.number ? item.number : "number"})</p>
                            </div>
                            <div className='bg-blue-400 text-xs px-1 w-max rounded-sm text-white'>
                                detailes
                            </div>
                        </div>
                    </li>
                )
                    :
                    <div className='w-full flex items-center mt-3 flex-col'>
                        <p>user not found</p>
                        "not found"
                    </div>}
            </ul>
        </div>

    )
}

export default Chatusers