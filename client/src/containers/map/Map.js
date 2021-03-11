/* eslint-disable react-hooks/exhaustive-deps */
import './Map.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map({ filteredEvents }) {
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
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const fetchData = () => {
      const newFeaturesList = [];
      filteredEvents.forEach((el) => {
        console.log(el);
        const id = el._id;
        const location = el.geolocation.split(',');
        const longitude = location[0];
        const latitude = location[1];
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
      const results = await fetchData({ longitude: lng, latitude: lat });
      // iterate through the feature collection and append marker to the map for each feature
      results.features.forEach((result) => {
        const { geometry } = result;
        // add marker to map
        new mapboxgl.Marker().setLngLat(geometry.coordinates).addTo(map);
      });
    });

    map.on('moveend', async () => {
      // get center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results = await fetchData({ longitude: lng, latitude: lat });
      // iterate through the feature collection and append marker to the map for each feature
      results.features.forEach((result) => {
        const { geometry } = result;
        // create marker node
        // const markerNode = document.createElement('div');
        // ReactDOM.render(<Marker id={id} />, markerNode);
        // add marker to map
        new mapboxgl.Marker().setLngLat(geometry.coordinates).addTo(map);
      });
    });
    return () => map.remove();
  }, [filteredEvents]);

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
