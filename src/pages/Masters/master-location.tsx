import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import Filters from './filters/filters.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { useTranslation } from 'react-i18next';

const MasterLocation: React.FC = () => {
  const API_KEY: string = 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao';
  // const API_KEY: string = 'AIzaSyDmtHK-BpQgKGdQfVY1Q_lL_aR7IIBRoRc';
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const { data } = masterStore();
  return (
    <>
      <Filters />
      <APIProvider apiKey={API_KEY}>
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <div className="h-full">
            <Map
              defaultCenter={{ lat: 38.847199519913644, lng: 65.79641469227047 }}
              defaultZoom={12}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
              scrollwheel={false}
            >

              {data.map((location, index) => (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.workPlace}
                  onMouseOver={() => setSelectedLocation(location)}
                  onMouseOut={() => setSelectedLocation(null)}
                />
              ))}
              {selectedLocation && (
                <InfoWindow
                  position={{ lat: selectedLocation.lat + .01, lng: selectedLocation.lng }}
                  onCloseClick={() => setSelectedLocation(null)}
                  className={`w-40 min-h-max`}
                >
                  <div className={`font-medium text-black dark:text-white text-lg mt-0 pt-0`}>{selectedLocation.workPlace}</div>
                  <div className={`text-sm my-2`}><span className={`font-medium`}>{t("Specialization")}:</span> {selectedLocation.specialization.map((item: any, idx: number) => <p className={`${idx === 0 ? 'inline' : 'block'} leading-4`}>{item}</p>)}</div>
                  <div className={`text-sm`}>
                    {selectedLocation.status === 'ACTIVE'
                      ? <p className={`bg-green-500 px-4 rounded-md text-white inline font-medium`}>{t("Active")}</p>
                      : selectedLocation.status === 'BLOCKED' ? <p className={`bg-red-500 px-4 rounded-md text-white inline font-medium`}>{t("Block")}</p>
                        : ''
                    }
                  </div>
                </InfoWindow>
              )}
            </Map>
          </div>
        </div>
      </APIProvider>
    </>
  );
};

export default MasterLocation;
