import React from 'react'

const Notselected = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className='text-center'>
                <p className='text-gray-600 text-lg'>Чат не выбран</p>
                <p className='text-gray-500'>Выберите один из списка чатов или начните новый чат.</p>
            </div>
        </div>
    )
}

export default Notselected