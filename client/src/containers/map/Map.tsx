import './Map.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Event } from '../../interfaces/Event';
import { Feature } from '../../interfaces/Feature';
import { FeatureCollection } from '../../interfaces/FeatureCollection';

if (process.env.REACT_APP_MAPBOX_ACCESS_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
}

export default function Map({ filteredEvents }: { filteredEvents: Event[] }) {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-0.1);
  const [lat, setLat] = useState(51.5);
  const [zoom, setZoom] = useState(9.8);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    map.on('move', () => {
      setLng(+map.getCenter().lng.toFixed(4));
      setLat(+map.getCenter().lat.toFixed(4));
      setZoom(+map.getZoom().toFixed(2)); //here the '+' is added in order to ensure that the function receives a number - this is required by the type
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const fetchData = ({
      longitude,
      latitude,
    }: {
      longitude?: any;
      latitude?: any;
    }) => {
      const newFeaturesList: Feature[] = [];
      filteredEvents.forEach((el: Event) => {
        const id: string | undefined = el._id;
        const location: string[] = el.geolocation.split(',');
        const longitude: string = location[0];
        const latitude: string = location[1];

        if (id && location && longitude && latitude) {
          newFeaturesList.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            properties: {
              id,
              name: `${el.name} #${id}`,
              description: `${el.description} #${id}`,
            },
          });
        }
      });

      return Promise.resolve({
        type: 'FeatureCollection',
        features: newFeaturesList,
      });
    };

    map.on('load', async () => {
      // get center coordinates
      const { lng, lat } = map.getCenter();

      // fetch new data
      const results: FeatureCollection = await fetchData({
        longitude: lng,
        latitude: lat,
      });

      // iterate through the feature collection and append marker to the map for each feature
      results.features.forEach((result: Feature) => {
        const lng: number = +result.geometry.coordinates[0];
        const lat: number = +result.geometry.coordinates[1];

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      });
    });

    map.on('moveend', async () => {
      // get center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results: FeatureCollection = await fetchData({
        longitude: lng,
        latitude: lat,
      });
      // iterate through the feature collection and append marker to the map for each feature
      results.features.forEach((result) => {
        const lng: number = +result.geometry.coordinates[0];
        const lat: number = +result.geometry.coordinates[1];

        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      });
    });
    return () => map.remove();
  }, [filteredEvents, lat, lng, zoom]);

  return (
    <div className="relative-container">
      <div className="relative">
        <div>
          <div id="mapContainer" className="map" ref={mapContainer}></div>
        </div>
      </div>
    </div>
  );
}
