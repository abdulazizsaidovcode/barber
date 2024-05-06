import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Filters from './filters/filters.tsx';

const MasterLocation = () => {
  const API_KEY = 'AIzaSyA1XGfEqBwWmScDF1KREhDpYHVdJX0VxuE';
  return (
    <>
      <Filters />
      <APIProvider apiKey={API_KEY}>
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <div className="h-full">
            <APIProvider apiKey={API_KEY}>
              <Map
                defaultCenter={{ lat: 41.2995, lng: 69.2401 }}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
              />
            </APIProvider>
          </div>
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: 10,
              borderRadius: 5,
              zIndex: 1
            }}
          ></div>
        </div>
      </APIProvider>
    </>
  );
};

export default MasterLocation;
