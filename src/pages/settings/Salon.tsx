import React, { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import useSalonStore from '../../helpers/state_managment/settings/salon';
import { fetchData, addData, editData } from '../../helpers/api-function/salon/salon';
import Modal from '../../components/modals/modal';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import toast from 'react-hot-toast';

interface SalonCardProp {
    title: string;
    openEditModal: () => void;
}

const SalonCard: React.FC<SalonCardProp> = ({ title, openEditModal }) => {
    return (
        <div onClick={openEditModal} className='w-[278px] dark:bg-[#30303d] cursor-pointer gap-5 rounded-3xl shadow-3 flex flex-col justify-center items-center shadow-black bg-white h-[170px]'>
            <p className='font-bold text-black dark:text-white'>{title}</p>
        </div>
    );
};

const Salon: React.FC = () => {
    const {
        data,
        isEditModal,
        isAddModal,
        newSalonName,
        selectedLat,
        selectedLon,
        attachmentId,
        editSalonId,
        setAddModal,
        setEditModal,
        setData,
        setNewSalonName,
        setSelectedLat,
        setSelectedLon,
        setAttachmentId,
        setEditSalonId
    } = useSalonStore();

    const API_KEY: string = 'YOUR_API_KEY';

    useEffect(() => {
        fetchData(setData);
    }, [setData]);

    const openEditModal = (id: string, name: string, lat: number, lon: number, attachment: any) => {
        setEditSalonId(id);
        setNewSalonName(name);
        setSelectedLat(lat);
        setSelectedLon(lon);
        setAttachmentId(attachment);
        setEditModal(true);
    };

    const closeEditModal = () => {
        setEditSalonId(null);
        setEditModal(false);
    };

    const openAddModal = () => {
        setNewSalonName("");
        setSelectedLat(null);
        setSelectedLon(null);
        setAttachmentId(null);
        setAddModal(true);
    };

    const closeAddModal = () => setAddModal(false);

    const containsInvalidCharacters = (text: string) => {
        return /['"\s]/.test(text);
    };

    const handleAddSalon = async () => {
        if (containsInvalidCharacters(newSalonName)) {
            toast("Please avoid using spaces, single or double quotes in the salon name.", {
                icon: '⚠️'
            });
        } else if (newSalonName && selectedLat !== null && selectedLon !== null) {
            await addData(setData, newSalonName, selectedLat, selectedLon, attachmentId);
            closeAddModal();
        } else {
            toast("Please enter the salon name and select a location on the map.", {
                icon: '⚠️'
            });
        }
    };

    const handleEditSalon = async () => {
        if (containsInvalidCharacters(newSalonName)) {
            toast("Please avoid using spaces, single or double quotes in the salon name.", {
                icon: '⚠️'
            });
        } else if (editSalonId && newSalonName && selectedLat !== null && selectedLon !== null) {
            await editData(editSalonId, setData, newSalonName, selectedLat, selectedLon, attachmentId);
            closeEditModal();
        } else {
            toast("Please enter the salon name and select a location on the map.", {
                icon: '⚠️'
            });
        }
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setSelectedLat(event.latLng.lat());
            setSelectedLon(event.latLng.lng());
        }
    };

    return (
        <DefaultLayout>
            <div>
                <div className='flex justify-between'>
                    <p className='text-xl dark:text-white'>Salon</p>
                    <button onClick={openAddModal} className='py-2 px-10 dark:text-white dark:bg-[#9C0A35] bg-[#eaeaea] rounded-2xl text-black'>Add salon</button>
                </div>
                <div className='flex flex-wrap gap-3 mt-5'>
                    {data.map((item, index) => (
                        <SalonCard
                            key={index}
                            title={item.name}
                            openEditModal={() => openEditModal(item.id, item.name, item.lat, item.lon, item.attachmentId)}
                        />
                    ))}
                </div>
            </div>
            <Modal isOpen={isEditModal} onClose={closeEditModal}>
                <div className='w-[700px] h-[500px]'>
                    <div className='mt-5'>
                        <label htmlFor="editInp">Salon name</label>
                        <input
                            type="text"
                            id='editInp'
                            value={newSalonName}
                            onChange={(e) => setNewSalonName(e.target.value)}
                            placeholder='Enter changed salon name'
                            className="dark:border-slate-700 w-full dark:text-[#000] border-black h-13 bg-[#f1f5f9] border-[1px] active:outline-none dark:bg-slate-100 dark:text-dark rounded-md px-3"
                        />
                    </div>
                    <div className='mt-5'>
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                id="map"
                                style={{ height: '400px', width: '100%' }}
                                zoom={10}
                                center={{ lat: selectedLat || -34.397, lng: selectedLon || 150.644 }}
                                onClick={(event) => handleMapClick(event as unknown as google.maps.MapMouseEvent)}
                            >
                                {selectedLat !== null && selectedLon !== null && (
                                    <Marker position={{ lat: selectedLat, lng: selectedLon }} />
                                )}
                            </Map>
                        </APIProvider>
                    </div>
                    <div className='mt-5'>
                        <button onClick={handleEditSalon} className='py-2 px-10 dark:text-white dark:bg-[#9C0A35] bg-[#eaeaea] rounded-lg mb-5 text-black'>Edit Salon</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isAddModal} onClose={closeAddModal}>
                <div className='w-[700px] h-[500px]'>
                    <div className='mt-5'>
                        <label htmlFor="newSalonName">Salon name</label>
                        <input
                            type="text"
                            id='newSalonName'
                            value={newSalonName}
                            onChange={(e) => setNewSalonName(e.target.value)}
                            placeholder='Enter salon name'
                            className="dark:border-slate-700 w-full dark:text-[#000] border-black h-13 bg-[#f1f5f9] border-[1px] active:outline-none dark:bg-slate-100 dark:text-dark rounded-md px-3"
                        />
                    </div>
                    <div className='mt-5'>
                        <APIProvider apiKey={API_KEY}>
                            <Map
                                id="map"
                                style={{ height: '400px', width: '100%' }}
                                zoom={10}
                                center={{ lat: 41.311081, lng: 69.240562 }}
                                onClick={(event) => handleMapClick(event as unknown as google.maps.MapMouseEvent)}
                            >
                                {selectedLat !== null && selectedLon !== null && (
                                    <Marker position={{ lat: selectedLat, lng: selectedLon }} />
                                )}
                            </Map>
                        </APIProvider>
                    </div>
                    <div className='mt-5'>
                        <button onClick={handleAddSalon} className='py-2 px-10 dark:text-white dark:bg-[#9C0A35] bg-[#eaeaea] rounded-lg mb-5 text-black'>Add Salon</button>
                    </div>
                </div>
            </Modal>
        </DefaultLayout>
    );
};

export default Salon;