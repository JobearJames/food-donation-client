import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import Loader from '../components/Loader';
import useLocation from '../hooks/useLocation';

const containerStyle = {
    width: '100%',
    height: '300px'
};

const Location = ({position}) => {
    const location = useLocation()
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })
    const onLoad = marker => {
        //console.log('marker: ', marker)
    }

    if (!location?.loaded || !isLoaded) {
        return <Loader />
    }

    if (location.error) {
        return <p>{location?.error?.message}</p>
    }
    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location.coordinates}
                zoom={14}
            >
                <MarkerF
                    onLoad={onLoad}
                    position={position}
                />
            </GoogleMap>
        </div>
    );
};

export default Location;