import L from 'leaflet';
import marker from '../assets/marker-icon-2x.png';
import shadow from '../assets/marker-shadow.png';

const Icon = new L.Icon({
    iconUrl: marker,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: new L.Point(41, 41),
    shadowAnchor: null,
    iconSize: new L.Point(25, 41),
    className: 'leaflet-marker-icon'
});

export { Icon };