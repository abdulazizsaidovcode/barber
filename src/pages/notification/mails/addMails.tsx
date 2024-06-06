import { Buttons } from '../../../components/buttons'
import { FileAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { BsPersonAdd } from 'react-icons/bs';


function AddMails() {
    const [fileName, setFileName] = useState<string>("Выберите изображение");
    const [photoName, setPhotoName] = useState<string>("Выберите изображение");
    const [file, setFile] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [toWhom, setToWhom] = useState<string>(''); // You might need a different type or multiple states for "toWhom"

    const handleUpload = (info: any) => {
        setFile(info.target.files[0]);
        const selectedFile = info.target.files[0];

        if (selectedFile) {
            setFileName(selectedFile.name);
        } else {
            setFileName("Выберите file");
        }
    };
    const handleUploadImg = (info: any) => {
        setPhoto(info.target.files[0]);
        const selectedFile = info.target.files[0];

        if (selectedFile) {
            setPhotoName(selectedFile.name);
        } else {
            setPhotoName("Выберите изображение");
        }
    };

    const postMail = () => {
        const obj = {
            subject,
            content,
            attachmentId: file,
            fileId: fileName,
            toWhom
        };
        console.log(obj);


    };

    return (
        <div className='h-max'>
            <p> Название темы:</p>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Новый тариф"
                required
            />
            <div className='flex gap-3 h-max mt-8 mb-10'>
                <div className='w-2/3 h-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание:</label>
                    <textarea
                        id="message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="block p-2.5 w-full h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
                        placeholder="Write your thoughts here..."
                    ></textarea>
                </div>
                <div className='h-max'>

                </div>
                <div className=''>
                    <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Прикрепить картинку</p>
                    <label htmlFor="attachmentId " className="h-32 cursor-pointer active:scale-90 duration-200 flex flex-col justify-center items-center border rounded p-3">
                        <BsPersonAdd className='text-4xl mb-3' />
                        <span
                            className='font-inika text-sm text-center text-black hover:text-blue-800 duration-300 ml-2 tracking-wider'>{photoName}</span>
                    </label>
                    <input id="attachmentId" type="file" className="hidden" onChange={handleUploadImg} />
                </div>
                <div>
                    <p className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Вложить файл</p>
                    <label htmlFor="fileId"
                        className="h-32 cursor-pointer active:scale-90 duration-200 flex flex-col justify-center items-center border rounded p-3">
                        <FileAddOutlined className='text-4xl mb-3' />
                        <span
                            className='font-inika text-sm text-center text-black hover:text-blue-800 duration-300 ml-2 tracking-wider'>{fileName}</span>
                    </label>
                    <input id="fileId" type="file" className="hidden" onChange={handleUpload} />
                </div>
            </div>

            <div className='flex gap-3 '>
                <div className='flex gap-2'>
                    <input
                        type="checkbox"
                        value="all"
                        onChange={(e) => setToWhom(e.target.value)}
                    />
                    <p>Всем</p>
                </div>
                <div className='flex gap-3'>
                    <input
                        type="checkbox"
                        value="masters"
                        onChange={(e) => setToWhom(e.target.value)}
                    />
                    <p>Мастерам</p>
                </div>
                <div className='flex gap-2'>
                    <input
                        type="checkbox"
                        value="clients"
                        onChange={(e) => setToWhom(e.target.value)}
                    />
                    <p>Клиентам</p>
                </div>
            </div>
            <div className='mt-5 flex gap-2' >
                <Buttons>Назвад</Buttons>
                <div onClick={postMail}>
                    <Buttons>Отправить</Buttons>
                </div>
            </div>
        </div>
    )
}

export default AddMails;
