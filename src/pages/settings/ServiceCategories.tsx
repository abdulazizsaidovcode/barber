import { useEffect, useState } from "react";
import ServiceCategoriesCard from "../../components/settings/details/ServiceCategoriesCard"
import DefaultLayout from "../../layout/DefaultLayout"
import Modal from "../../components/modals/modal";
import axios from "axios";
import { service_category_list } from "../../helpers/api";

interface Data {
    id: string;
    name: string;
}

const ServiceCategories = () => {
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [delIsOpen, setDelIsOpen] = useState(false);
    const [data, setData] = useState<Data[]>([]);

    const delOpenModal = () => setDelIsOpen(true);
    const delCloseModal = () => setDelIsOpen(false);
    const addOpenModal = () => setAddIsOpen(true);
    const addCloseModal = () => setAddIsOpen(false);
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get(service_category_list)
            console.log(res.data);
            setData(res.data.body)
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <DefaultLayout>
                <div className="flex justify-between">
                    <p className="font-bold text-xl text-black">Категории услуг</p>
                    <button onClick={addOpenModal} className="dark:bg-danger bg-[#c2c2c2] text-black dark:text-white    py-2 px-4 rounded-lg">Добавить категорию</button>
                </div>
                <div className="mt-4 w-[75%]">
                    {data.map(item => (
                        <div key={item.id}>
                            <ServiceCategoriesCard title={`${item.name}`} editOnClick={() => 'w'} deleteOnClick={() => delOpenModal()} />
                        </div>
                    ))}
                </div>
            </DefaultLayout>
            <Modal isOpen={addIsOpen} onClose={addCloseModal}>
                <div className="w-[600px] h-[180px]">
                    <p className="text-xl text-black">Название категории:</p>
                    <input className="w-full border-[1px] border-black p-2 rounded-lg mt-3" type="text" placeholder="Оздоровительные процедуры" />
                    <div className="flex mt-15 justify-center">
                        <button className="py-2 px-10 bg-slate-800 text-white">Добавить</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={delIsOpen} onClose={delCloseModal}>
                <div className="w-[500px] h-[130px]">
                    <div className="flex justify-center">
                        <p className="text-xl text-black">Вы уверены что хоите удалить процедуру?</p>
                    </div>
                    <div className="flex justify-around mt-10">
                        <button className="text-white bg-[#000] py-2 px-10">Удалить</button>
                        <button onClick={delCloseModal} className="text-white bg-gray py-2 px-14">Hет</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ServiceCategories