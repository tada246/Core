import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
    onChange: (lat: number, lng: number) => void;
    lat: number;
    lng: number;
};

export default function GeographyInput(props: Props) {
    const { onChange, lat, lng } = props;

    const [position, setPosition] = useState<[number, number]>([lat, lng]);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onChange(e.latlng.lat, e.latlng.lng);
            },
        });

        return <Marker position={position} />;
    }

    useEffect(() => {
        setPosition([lat, lng]);
    }, [lat, lng]);

    return (
        <div className='w-full aspect-square flex flex-col rounded-large overflow-hidden'>
            <MapContainer center={position} zoom={16} className='w-full flex-1'>
                <TileLayer
                    attribution='© <a href="http://osm.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <LocationMarker />
            </MapContainer>
            <div className='h-6 bg-default-100 flex justify-center gap-4 items-center'>
                <p className='text-xs text-default-600'>
                    緯度
                    <span className='text-sm text-black pl-1'>
                        {position[0]}
                    </span>
                </p>
                <p className='text-xs text-default-600'>
                    経度
                    <span className='text-sm text-black pl-1'>
                        {position[1]}
                    </span>
                </p>
            </div>
        </div>
    );
}
