import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import Filters from './filters/filters.tsx';
import masterStore, { Data } from '../../helpers/state_managment/master/masterStore.tsx';

const MasterLocation: React.FC = () => {
  const API_KEY: string = 'AIzaSyA1XGfEqBwWmScDF1KREhDpYHVdJX0VxuE';
  const {data} = masterStore()
  // const [selectedLocation, setSelectedLocation] = useState<Data[]>([]);

  console.log(data);
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
                  // onMouseOver={() => setSelectedLocation(location)}
                  // onMouseOut={() => setSelectedLocation([])}
                />
              ))}

              {/*/!*{selectedLocation && (*!/*/}
              {/*/!*  <InfoWindow*!/*/}
              {/*/!*    position={{ lat: selectedLocation.lat + .07, lng: selectedLocation.lng }}*!/*/}
              {/*/!*    onCloseClick={() => setSelectedLocation([])}*!/*/}
              {/*/!*  >*!/*/}
              {/*/!*    <div>*!/*/}
              {/*/!*      <h4>{selectedLocation.fullName}</h4>*!/*/}
              {/*/!*      <h4>{selectedLocation.workPlace}</h4>*!/*/}
              {/*/!*    </div>*!/*/}
              {/*/!*  </InfoWindow>*!/*/}
              {/*)}*/}
            </Map>
          </div>
        </div>
      </APIProvider>
    </>
  );
};

export default MasterLocation;
