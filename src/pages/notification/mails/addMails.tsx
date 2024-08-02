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
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

function AddMails() {
  const { t } = useTranslation();

  const [fileName, setFileName] = useState<string>(t('Select_an_image'));
  const [photoName, setPhotoName] = useState<string>(t('Select_an_image'));
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [toWhom, setToWhom] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { setLetterData } = MailStore();

  const handleFileChange = (info: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = info.target.files ? info.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName('Выберите file');
    }
  };

  const handlePhotoChange = (info: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = info.target.files ? info.target.files[0] : null;
    setPhoto(selectedFile);
    if (selectedFile) {
      setPhotoName(selectedFile.name);
      setPhotoPreview(URL.createObjectURL(selectedFile));
    } else {
      setPhotoName('Выберите изображение');
      setPhotoPreview(null);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToWhom(value);
  };

  const validateFields = () => {
    const newErrors: any = {};
    if (!subject) newErrors.subject = true;
    if (!content) newErrors.content = true;
    if (!toWhom) newErrors.toWhom = true;
    if (!file) newErrors.file = true;
    if (!photo) newErrors.photo = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFields = () => {
    setSubject('');
    setContent('');
    setToWhom(null);
    setFile(null);
    setPhoto(null);
    setFileName('Выберите изображение');
    setPhotoName('Выберите изображение');
    setPhotoPreview(null);
    setErrors({});
  };

  const postMail = async () => {
    if (!validateFields()) {
      toast.error(t('Please_fill_in'));
      return;
    }

    let fileUrl = null;
    let photoUrl = null;

    if (file) {
      setLoading(true);
      await uploadFile({
        file,
        setUploadResponse: (response) => (fileUrl = response.body),
      });
    }

    if (photo) {
      setLoading(true);
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
      toWhom,
    };
    setLoading(true);
    axios
      .post(`${newsletters_url}/save`, obj, config)
      .then((res) => {
        res;
        toast.success(t('Newsletter_created_successfully'));
        clearFields();
        GetChatLetters({
          setLetterData: setLetterData,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(t('Error_creating_mailing_list'));
        clearFunction()
      })
      .finally(() => {
        setLoading(false);
        clearFunction()
      });
  };

  return (
    <div className="h-max">
      <p>{t('Topic_name')}</p>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className={`bg-gray-50 border ${
          errors.subject ? 'border-red-500' : 'border-gray-300'
        } text-gray-900 dark:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        required
      />
      <div className="flex gap-3 h-max mt-8 mb-10 md:flex-row flex-col">
        <div className="w-full h-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {t('Description')}:
          </label>
          <textarea
            id="message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`block p-2.5 w-full h-48 text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('Write_your')}
          ></textarea>
        </div>
        <div className="flex gap-5 sm:flex-nowrap flex-wrap">
          <div>
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('Attach_a_picture')}
            </p>
            <label
              htmlFor="attachmentId"
              className={`h-48 w-56 cursor-pointer active:scale-90 duration-200 flex flex-col justify-center items-center border ${
                errors.photo ? 'border-red-500' : 'border-gray-300'
              } rounded p-3`}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <BsPersonAdd className="text-4xl mb-3" />
                  <span className="font-inika text-sm text-center text-black hover:text-blue-800 duration-300 ml-2 tracking-wider">
                    {photoName}
                  </span>
                </>
              )}
            </label>
            <input
              id="attachmentId"
              type="file"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
          <div>
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('Attach_file')}
            </p>
            <label
              htmlFor="fileId"
              className={`h-48 w-48 cursor-pointer active:scale-90 duration-200 flex flex-col justify-center items-center border ${
                errors.file ? 'border-red-500' : 'border-gray-300'
              } rounded p-3`}
            >
              <>
                <FileAddOutlined className="text-4xl mb-3" />
                <span className="font-inika text-sm text-center text-black hover:text-blue-800 duration-300 ml-2 tracking-wider">
                  {fileName}
                </span>
              </>
            </label>
            <input
              id="fileId"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div
        className={`flex gap-3 w-max p-2 rounded-md ${
          errors.toWhom ? 'border-red-500 border' : ''
        }`}
      >
        <div className="flex gap-2">
          <input
            type="checkbox"
            value="ALL"
            checked={toWhom === 'ALL'}
            onChange={handleCheckboxChange}
            className={errors.toWhom ? 'bg-red-500' : ''}
          />
          <p>{t('Everyone')}</p>
        </div>
        <div className="flex gap-3">
          <input
            type="checkbox"
            value="MASTER"
            checked={toWhom === 'MASTER'}
            onChange={handleCheckboxChange}
            className={errors.toWhom ? 'bg-red-500' : ''}
          />
          <p>{t('For_masters')}</p>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            value="CLIENT"
            checked={toWhom === 'CLIENT'}
            onChange={handleCheckboxChange}
            className={errors.toWhom ? 'bg-red-500' : ''}
          />
          <p>{t('For_clients')}</p>
        </div>
      </div>
      <div className="mt-5 flex gap-2 ">
        <Buttons>{t('Back')}</Buttons>
        <Buttons onClick={postMail} disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <span className="mr-2">{t('heading_off')} ...</span>
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 20, color: '#fff' }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            'Отправить'
          )}
        </Buttons>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default AddMails;
