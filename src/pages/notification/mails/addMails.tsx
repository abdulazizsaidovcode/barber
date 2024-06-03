import { Buttons } from '../../../components/buttons'
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';

function AddMails() {
    const [fileList, setFileList] = useState<any>([]);



    const props: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                // message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                // message.error(`${info.file.name} file upload failed.`);
            }
        },
    }



    const handleUpload = (info: any) => {
        let fileList = [...info.fileList];

        // Limit to one file
        fileList = fileList.slice(-1);

        // 1. Read file from response and show preview
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        // 2. Filter successfully uploaded files according to response from server
        fileList = fileList.filter(file => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        setFileList(fileList);
    };

    return (
        <div className='h-max'>
            <p> Название темы:</p>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Новый тариф" required />
            <div className='flex gap-3 h-max mt-8 mb-10'>
                <div className='w-2/3'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание:</label>
                    <textarea id="message" className="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write your thoughts here..."></textarea>
                </div>
                <div className='h-max'>
                    <p>Прикрепить картинку</p>
                    <Upload
                        style={{ width: '100%', height: '100%' }}
                        action="http://localhost:8000/Chat"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUpload}
                    >
                        {fileList.length === 0 && (
                            <div>
                                <PlusOutlined className='text-white' />
                                <div className='text-white' style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </div>
                <div>
                    <p>Вложить файл</p>
                    <div className='border rounded-md p-2 w-max'>
                        <Upload {...props}>
                            <Button className='text-white' icon={<UploadOutlined className='text-white' />}>Click to Upload</Button>
                        </Upload>
                    </div>
                </div>
            </div>

            <div className='flex gap-3 '>
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
            <div className='mt-5'>
                <Buttons>Назвад</Buttons>
                <Buttons>Отправить</Buttons>
            </div>
        </div>
    )
}

export default AddMails
