import { useEffect, useState } from "react";
import ServiceCategoriesCard from "../../components/settings/details/ServiceCategoriesCard";
import DefaultLayout from "../../layout/DefaultLayout";
import Modal from "../../components/modals/modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { add_service_category, attachment_upload, del_service_category, edit_service_category, service_category_list } from "../../helpers/api";
import { config } from "../../helpers/token";
import DelModal from "../../components/settings/modals/delModal";
import EditModal from "../../components/settings/modals/editModal";
import { Skeleton } from 'antd';
import { useTranslation } from "react-i18next";
import { Buttons } from "../../components/buttons";
import defaultImage from '../../images/default.png'
import { clearFunction } from '../../common/clear-function/clear-function.tsx';

interface Data {
    id: string;
    name: string;
    attachmentId: string;
}

const ServiceCategories = () => {
    const [data, setData] = useState<Data[]>([]);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [delIsOpen, setDelIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editedAttachmentId, setEditedAttachmentId] = useState('');
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const [attachmentId, setAttachmentId] = useState('');
    const [loading, setLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        fetchData();
    }, []);

    // FETCH DATA
    const fetchData = () => {
        axios.get(service_category_list, config)
            .then(res => {
                setData(res.data.body);
                setLoading(false);
                clearFunction()
            })
            .catch(() => {
                setLoading(false);
                clearFunction()
            });
    };

    // UPLOAD IMAGE
    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const { data } = await axios.post(attachment_upload, formData, config);
            if (data.success) {
                setAttachmentId(data.body)
            }
        } catch (error) {
            console.log(error);
            clearFunction()
        }
    }

    // ADD DATA
    const addData = () => {
        const newCategory = {
            name: newCategoryName,
            categoryFatherId: null,
            attachmentId: attachmentId,
        };

        if (newCategoryName.length === 0) {
            toast(t("Please_fill_in_the_line"), {
                icon: '⚠️'
            });
        } else if (!newCategoryName.trim() || /^[^a-zA-Zа-яА-Я0-9]/.test(newCategoryName) || /^ +$/.test(newCategoryName)) {  // Only allow names with valid starting characters
            toast(t("Please_enter_valid_name"), { icon: '⚠️' });
        } else if (!attachmentId) {
            toast(t("Please_upload_an_image"), { icon: '⚠️' });
        } else {
            setAddLoading(true);
            axios.post(add_service_category, newCategory, config)
                .then((res) => {
                    if (res.data.success) {
                        toast.success(t("Category_added_successfully"));
                        fetchData();
                        setAddLoading(false)
                        addCloseModal();
                    } else {
                        toast(t('This_category_already_exists'), {
                            icon: '⚠️'
                        });
                        clearFunction()
                    }
                })
                .catch(() => {
                    setAddLoading(false);
                    clearFunction()
                })
                .finally(() => {
                    setAddLoading(false);
                    clearFunction()
                });
        }
    };


    // DELETE DATA
    const deleteData = () => {
        if (categoryToDelete) {
            axios.delete(`${del_service_category}/${categoryToDelete}`, config)
                .then(() => {
                    toast.success(t("Category_deleted_successfully"));
                    setData(data.filter(item => item.id !== categoryToDelete));
                    delCloseModal();
                })
                .catch(() => {
                    setLoading(false);
                    clearFunction()
                });
        }
    };

    // UPDATE DATA
    const updateData = () => {
        if (editingCategory) {
            if (editedCategoryName.trim() === "" || /^ +$/.test(editedCategoryName)) {
                toast(t("Please_fill_in_the_line"), {
                    icon: '⚠️'
                });
                return;
            } else if (!editedCategoryName.trim() || /^[^a-zA-Zа-яА-Я0-9]/.test(editedCategoryName)) {  // Only allow names with valid starting characters
                toast(t("Please_enter_valid_name"), { icon: '⚠️' });
                return;
            }

            const updatedCategory = {
                name: editedCategoryName,
                attachmentId: attachmentId
            };

            // if (!attachmentId && data.some(item => item.name === editedCategoryName)) {
            //     toast(t("This_category_already_exists"), {
            //         icon: '⚠️'
            //     });
            //     return;
            // }

            if (!attachmentId && data.find(item => item.id === editingCategory)?.name === editedCategoryName) {
                toast(t("Please_change_something"), {
                    icon: '⚠️'
                });
                return;
            }

            setEditLoading(true);

            axios.put(`${edit_service_category}/${editingCategory}`, updatedCategory, config)
                .then((res) => {
                    if (res.data.success) {
                        toast.success(t("Category_updated_successfully"));
                        fetchData();
                        editCloseModal();
                    } else {
                        toast(t("This_category_already_exists"), {
                            icon: '⚠️'
                        });
                        clearFunction()
                    }
                })
                .catch(() => {
                    setLoading(false);
                    clearFunction()
                })
                .finally(() => {
                    setEditLoading(false);
                    clearFunction()
                });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            uploadImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('imageUploadInput')?.click();
    };

    const delOpenModal = (id: string) => {
        setCategoryToDelete(id);
        setDelIsOpen(true);
    };

    const delCloseModal = () => {
        setCategoryToDelete(null);
        setDelIsOpen(false);
    };

    const addOpenModal = () => setAddIsOpen(true);
    const addCloseModal = () => {
        setAddIsOpen(false)
        setImagePreviewUrl(null)
        setAttachmentId('')
    };

    const editOpenModal = (id: string, name: string, attachmentId: string) => {
        setEditingCategory(id);
        setEditedCategoryName(name);
        setEditedAttachmentId(attachmentId)
        setEditIsOpen(true);
    };

    const editCloseModal = () => {
        setEditingCategory(null);
        setEditedCategoryName('');
        setImagePreviewUrl('')
        setEditIsOpen(false);
    };

    return (
        <DefaultLayout>
            <div className="flex justify-between">
                <p className="font-bold text-xl text-black">{t("Service_Categories")}</p>
                <button onClick={addOpenModal} className="dark:bg-danger bg-[#c2c2c2] text-black dark:text-white py-2 px-4 rounded-lg">
                    {t("Add_Category")}
                </button>
            </div>
            <div className="mt-4 md:w-[75%] w-full">
                <div className="mt-4 md:w-[75%] w-full">
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    ) : (data.length === 0 ? <div><p className="text-xl dark:text-white">Categories not found</p></div> :
                        data.map(item => (
                            <div key={item.id}>
                                <ServiceCategoriesCard
                                    attchmentStyle={true}
                                    attachmentId={item.attachmentId}
                                    title={item.name}
                                    editOnClick={() => editOpenModal(item.id, item.name, item.attachmentId)}
                                    deleteOnClick={() => delOpenModal(item.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Modal isOpen={addIsOpen} onClose={addCloseModal}>
                <div className="md:w-[500px] h-[200px] sm:w-[400px] w-[250px]">
                    <p className="sm:text-xl text-black dark:text-white">{t("Category_Name")}</p>
                    <div>
                        <input
                            className="w-full dark:text-[#000] border-[1px] border-black p-2 rounded-lg mt-3"
                            type="text"
                            // placeholder={t("Health_Procedures")}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <div className="mt-3 flex items-center gap-3">
                            <Buttons onClick={handleUploadClick}>Upload</Buttons>
                            <input
                                id="imageUploadInput"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <img className="w-8 h-8 object-cover" src={imagePreviewUrl ? imagePreviewUrl : defaultImage} alt="" />
                        </div>
                    </div>
                    <div className="flex mt-10 justify-center">
                        <button
                            onClick={addData}
                            className="sm:py-2 py-1 px-8 sm:px-10 rounded-lg dark:bg-danger bg-slate-800 text-white "
                            disabled={addLoading}
                        >
                            {addLoading ? t("Loading") : t("Add")}
                        </button>
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>
            </Modal>
            <DelModal isOpen={delIsOpen} onClose={delCloseModal} onDelete={deleteData} />
            <EditModal
                isOpen={editIsOpen}
                attachmentStyle={true}
                handleImageChange={handleImageChange}
                handleUploadClick={handleUploadClick}
                attchmentId={editedAttachmentId ? editedAttachmentId : imagePreviewUrl ? imagePreviewUrl : defaultImage}
                onClose={editCloseModal}
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
                onSave={updateData}
                disabled={editLoading}
            />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </DefaultLayout>
    );
};

export default ServiceCategories;

