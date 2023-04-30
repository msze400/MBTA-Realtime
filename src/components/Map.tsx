
import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import Polyline from '@mapbox/polyline';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString';
import 'ol/ol.css';
import {transform} from 'ol/proj'
import {Style, Stroke } from 'ol/style'

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const orangeLineUrl = `https://api-v3.mbta.com/shapes?filter%5Broute%5D=Orange`;

    fetch(orangeLineUrl)
      .then((res) => res.json())
      .then((data) => {

        const decodedCoords = Polyline.decode(data.data[0].attributes.polyline).map((coord) =>{
            return [coord[1], coord[0]]
        }
        );

        const lineCoords = decodedCoords.map(coord => fromLonLat(coord));
        const lineString = new LineString(lineCoords);
        const feature = new Feature({
            geometry: lineString,
        });
        const vectorSource = new VectorSource({
            features: [feature],
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: [
                new Style({
                stroke: new Stroke({
                    color: 'orange',
                    width: 5,
                }),
                }),
            ],
        });


        const map = new Map({
          target: mapRef.current,
          layers: [
            new TileLayer({
              source: new Stamen({
                layer: "toner-lite"
              }),
            }),
            vectorLayer
        ],
          view: new View({
            center: fromLonLat([-71.0603, 42.3583]),
            zoom: 12,
          }),
        });

        return () => {
          map.setTarget(null);
        };
      });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '800px' }} />;
};

export default MapComponent;


