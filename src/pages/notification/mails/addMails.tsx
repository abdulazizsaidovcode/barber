import React, { useState } from 'react';
import { Buttons } from '../../../components/buttons';
import { FileAddOutlined } from '@ant-design/icons';
import { BsPersonAdd } from 'react-icons/bs';
import { uploadFile } from '../../../helpers/attachment/uploadFile';
import axios from 'axios';
import { config } from '../../../helpers/token';
import { newsletters_url } from '../../../helpers/api';
import toast, { Toaster } from 'react-hot-toast';
import { GetChatLetters } from '../../../helpers/api-function/chat/mail';
import MailStore from '../../../helpers/state_managment/chat/mailStore';

function AddMails() {
    const [fileName, setFileName] = useState<string>("Выберите изображение");
    const [photoName, setPhotoName] = useState<string>("Выберите изображение");
    const [file, setFile] = useState<File | null>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [toWhom, setToWhom] = useState<string[]>([]);
    const [errors, setErrors] = useState<any>({});

    const { setLetterData } = MailStore();

    const handleFileChange = (info: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = info.target.files ? info.target.files[0] : null;
        setFile(selectedFile);
        if (selectedFile) {
            setFileName(selectedFile.name);
        } else {
            setFileName("Выберите file");
        }
    };

    const handlePhotoChange = (info: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = info.target.files ? info.target.files[0] : null;
        setPhoto(selectedFile);
        if (selectedFile) {
            setPhotoName(selectedFile.name);
        } else {
            setPhotoName("Выберите изображение");
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (toWhom.includes(value)) {
            setToWhom(toWhom.filter((item) => item !== value));
        } else {
            setToWhom([...toWhom, value]);
        }
    };

    const validateFields = () => {
        const newErrors: any = {};
        if (!subject) newErrors.subject = true;
        if (!content) newErrors.content = true;
        if (toWhom.length === 0) newErrors.toWhom = true;
        if (!file) newErrors.file = true;
        if (!photo) newErrors.photo = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const postMail = async () => {
        if (!validateFields()) {
            toast.error("Пожалуйста, заполните все обязательные поля");
            return;
        }

        let fileUrl = null;
        let photoUrl = null;

        if (file) {
            await uploadFile({
                file,
                setUploadResponse: (response) => (fileUrl = response.body),
            });
        }

        if (photo) {
            await uploadFile({
                file: photo,
                setUploadResponse: (response) => (photoUrl = response.body),
            });
        }

        const obj = {
            subject,
            content,
            attachmentId: fileUrl,
            fileId: photoUrl,
            toWhom: toWhom.join(','),
        };
        axios
            .post(`${newsletters_url}/save`, obj, config)
            .then((res) => {
                toast.success("Рассылка успешно создана");
                GetChatLetters({
                    setLetterData: setLetterData,
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Ошибка создания рассылки");
            });

        console.log(obj);
    };

    return (
        <div className="h-max">
            <p>Название темы:</p>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`bg-gray-50 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Новый тариф"
                required
            />
            <div className="flex gap-3 h-max mt-8 mb-10">
                <div className="w-2/3 h-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание:</label>
                    <textarea
                        id="message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={`block p-2.5 w-full h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Write your thoughts here..."
                    ></textarea>
                </div>
                <div className="h-max"></div>
                <div className="">
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Прикрепить картинку</p>
                    <label htmlFor="attachmentId" className={`h-32 cursor-pointer active:scale-90 duration-200 flex flex-col justify-center items-center border ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded p-3`}>
                        <BsPersonAdd className="text-4xl mb-3" />
                        <span className="font-inika text-sm text-center text-black hover:text-blue-800 duration-300 ml-2 tracking-wider">{photoName}</span>
                    </label>
                    <input id="attachmentId" type="file" className="hidden" onChange={handlePhotoChange} />
                </div>
                <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Вложить файл</p>
                    <label htmlFor="fileId" className={`h-32 cursor-pointer active:scale-90 duration-200 flex flex-col justify-center items-center border ${errors.file ? 'border-red-500' : 'border-gray-300'} rounded p-3`}>
                        <FileAddOutlined className="text-4xl mb-3" />
                        <span className="font-inika text-sm text-center text-black hover:text-blue-800 duration-300 ml-2 tracking-wider">{fileName}</span>
                    </label>
                    <input id="fileId" type="file" className="hidden" onChange={handleFileChange} />
                </div>
            </div>

            <div className="flex gap-3 ">
                <div className="flex gap-2">
                    <input
                        type="checkbox"
                        value="ALL"
                        onChange={handleCheckboxChange}
                        className={errors.toWhom ? 'border-red-500' : ''}
                    />
                    <p>Всем</p>
                </div>
                <div className="flex gap-3">
                    <input
                        type="checkbox"
                        value="MASTER"
                        onChange={handleCheckboxChange}
                        className={errors.toWhom ? 'border-red-500' : ''}
                    />
                    <p>Мастерам</p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="checkbox"
                        value="CLIENT"
                        onChange={handleCheckboxChange}
                        className={errors.toWhom ? 'border-red-500' : ''}
                    />
                    <p>Клиентам</p>
                </div>
            </div>
            <div className="mt-5 flex gap-2">
                <Buttons>Назад</Buttons>
                <div onClick={postMail}>
                    <Buttons>Отправить</Buttons>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}

export default AddMails;
