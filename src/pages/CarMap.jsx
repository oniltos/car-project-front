import { useState, useEffect } from 'react'
import axios from "axios";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { Icon } from '../components/Icon'

const center = [-23.586575844488742, -46.67346148146696]

const CarMap = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchCars = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/ads?token=${import.meta.env.VITE_TOKEN}`);
      const carsData = await response.data;
      setCars(carsData);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchCars();
    }, []);
  
    return (
      <div>
        { !loading && 
        ( <MapContainer style={{height:"100vh"}} center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker key="root" position={center}>
              <Popup>
                <h1>Start</h1>
              </Popup>
            </Marker>
            {
              cars.length > 0 && cars.map(car => {
                return (
                  <Marker 
                    key={car._id} 
                    position={[car.lat, car.lng]}
                  >
                    <Popup>
                      { car.image && <img width="100%" src={car.image} alt={car.model} /> }
                      <h2>{car.order}. {car.make.toUpperCase()} {car.model.toUpperCase()} {car.yearManufacture}/{car.yearModel}</h2>
                      <p>Preço: R${car.price}</p>
                      <p>Fipe: R${car.fipe}</p>
                      <h2>{car.store}</h2>
                      <p>{ car.storePhone && <a href={`tel:${car.storePhone}`}>{car.storePhone}</a> }</p>
                      <p>{ car.storeAddress }</p>
                      <a href={`https://waze.com/ul?q=${car.storeAddress}`} rel="noreferrer" target="_blank">Abrir no Waze</a>
                    </Popup>
                  </Marker>
                )
              })
            }
        </MapContainer>)
         }
      </div>
    );
  };
  
  export default CarMap;