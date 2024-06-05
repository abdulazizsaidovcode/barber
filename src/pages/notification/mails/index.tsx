import { useState } from 'react';
import { Product } from '../../../types/product';
import ProductOne from '../../../images/product/product-01.png';
import ProductTwo from '../../../images/product/product-02.png';
import ProductThree from '../../../images/product/product-03.png';
import ProductFour from '../../../images/product/product-04.png';
import { DatePicker, Select } from 'antd';
import { Buttons } from '../../../components/buttons';
import AddMails from './addMails';
import { TbArrowBigLeftFilled } from 'react-icons/tb';

const productData: Product[] = [
    {
        image: ProductOne,
        name: 'Apple Watch Series 7',
        category: 'Electronics',
        price: 296,
        sold: 22,
        profit: 45,
    },
    {
        image: ProductTwo,
        name: 'Macbook Pro M1',
        category: 'Electronics',
        price: 546,
        sold: 12,
        profit: 125,
    },
    {
        image: ProductThree,
        name: 'Dell Inspiron 15',
        category: 'Electronics',
        price: 443,
        sold: 64,
        profit: 247,
    },
    {
        image: ProductFour,
        name: 'HP Probook 450',
        category: 'Electronics',
        price: 499,
        sold: 72,
        profit: 103,
    },
];

const ChatTable = () => {

    const [showAddMails, setShowAddMails] = useState(false);

    return (
        <section>
            {showAddMails ? (
                <div className='pt-5'>
                    <div onClick={() => setShowAddMails(false)} className='mb-5 flex'>
                        <Buttons className="mb-5">
                            <TbArrowBigLeftFilled />
                        </Buttons>
                    </div>
                    <AddMails />
                </div>
            ) : (
                <div className='pt-5'>
                    <div className='mb-5 flex gap-2'>
                        <Select
                            className='w-full md:w-40 lg:w-40 xl:w-40 dark:bg-gray-800 dark:text-white'
                            defaultValue="Тема"
                            style={{ width: 120 }}
                            showSearch
                            options={[
                                { value: 'Тема', label: 'Тема', disabled: true  },
                                { value: '2025', label: '2025' },
                                { value: '2026', label: '2026' },
                            ]}
                        />
                        <DatePicker
                            className='h-8 w-full md:w-50 lg:w-50 xl:w-50 dark:bg-gray-800 dark:text-white '
                            placeholder='Дата'
                            onChange={(e) => console.log(e)}
                        />
                        <div onClick={() => setShowAddMails(true)}>
                            <Buttons >
                                Создать рассылку
                            </Buttons>
                        </div>

                    </div>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="py-6 px-4 md:px-6 xl:px-7.5">
                            <h4 className="text-xl font-semibold text-black dark:text-white">
                                Top Products
                            </h4>
                        </div>
                        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                            <div className="col-span-3 flex items-center">
                                <p className="font-medium">Картинка</p>
                            </div>
                            <div className="col-span-2 hidden items-center sm:flex">
                                <p className="font-medium">Тема</p>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Кому</p>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Дата</p>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Вложения</p>
                            </div>
                            <div className="col-span-1 flex items-center">
                                <p className="font-medium">Описание</p>
                            </div>
                        </div>
                        {productData.map((product, key) => (
                            <div
                                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                                key={key}
                            >
                                <div className="col-span-3 flex items-center">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <div className="h-12.5 w-15 rounded-md">
                                            <img src={product.image} alt="Product" />
                                        </div>
                                        <p className="text-sm text-black dark:text-white">
                                            {product.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-2 hidden items-center sm:flex">
                                    <p className="text-sm text-black dark:text-white">
                                        {product.category}
                                    </p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm text-black dark:text-white">
                                        ${product.price}
                                    </p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm text-black dark:text-white">{product.sold}</p>
                                </div>
                                <div className="col-span-1 flex items-center">
                                    <p className="text-sm text-meta-3">${product.profit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ChatTable;
