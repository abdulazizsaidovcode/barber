import React from 'react'
import { Buttons } from '../../../components/buttons'

function AddMails() {
    return (
        <div>
            <p> Название темы:</p>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Новый тариф" required />
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание:</label>
                <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div>
            <div>
                <p>Вложения</p>
                <p>Прикрепить картинку</p>
            </div>
            <input type="file" />
            <p>Вложить файл</p>
            <div className='flex gap-3'>
                <div className='flex gap-2'>
                    <input type="checkbox" name="" id="" />
                    <p>Всем</p>
                </div>
                <div className='flex gap-3'>
                    <input type="checkbox" name="" id="" />
                    <p>Мастерам</p>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" name="" id="" />
                    <p>Клиентам</p>
                </div>
            </div>
            <div>
                <button>Назвад</button>
                <Buttons>Отправить</Buttons>
            </div>
        </div>
    )
}

export default AddMails
