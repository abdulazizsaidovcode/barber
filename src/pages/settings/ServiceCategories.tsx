import ServiceCategoriesCard from "../../components/settings/ServiceCategoriesCard"
import DefaultLayout from "../../layout/DefaultLayout"

const ServiceCategories = () => {
    return (
        <DefaultLayout>
            <div className="flex justify-between">
                <p className="font-bold text-xl text-black">Категории услуг</p>
                <button className="dark:bg-danger bg-[#c2c2c2] text-black dark:text-white    py-2 px-4 rounded-lg">Добавить категорию</button>
            </div>
            <div className="mt-4">
                <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
                <ServiceCategoriesCard title="Красота волос" editOnClick={() => 'w'} deleteOnClick={() => 'w'} />
            </div>
        </DefaultLayout>
    )
}

export default ServiceCategories