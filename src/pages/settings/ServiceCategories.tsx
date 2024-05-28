import { useState } from "react";
import ServiceCategoriesCard from "../../components/settings/ServiceCategoriesCard"
import DefaultLayout from "../../layout/DefaultLayout"
import Modal from "../../components/modals";

const ServiceCategories = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <DefaultLayout>
                <div className="flex justify-between">
                    <p className="font-bold text-xl text-black">Категории услуг</p>
                    <button onClick={openModal} className="dark:bg-danger bg-[#c2c2c2] text-black dark:text-white    py-2 px-4 rounded-lg">Добавить категорию</button>
                </div>
                <div className="mt-4">
                    <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                    <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                    <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                    <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                    <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                </div>
            </DefaultLayout>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <h2>Hello, I am a modal!</h2>
                <p>This is a modal example using React.</p>
            </Modal>
        </>

    )
}

export default ServiceCategories