import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Polyline from '@mapbox/polyline';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke } from 'ol/style';
import mbtaService from '../services/mbta';

const MapComponent = () => {
  const mapRef = useRef(null);
  const vectorSource = useRef(new VectorSource({
    features: [],
  })).current;

  const vectorLayer = useRef(new VectorLayer({
    source: vectorSource,
    style: (feature) => {
      const lineColor = feature.get('color');
      return new Style({
        stroke: new Stroke({
          color: lineColor,
          width: 5,
        }),
      });
    },
  })).current;

  const map = useRef(
    new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner-lite',
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([-71.0603, 42.3583]),
        zoom: 12,
      }),
    })
  ).current;

  useEffect(() => {
    if (!mapRef.current) return;

    map.setTarget(mapRef.current);

    const fetchAndAddLineData = async (line, color) => {
      const feature = await mbtaService.fetchLineData(line);
      feature.setStyle(
        new Style({
          stroke: new Stroke({
            color,
            width: 5,
          }),
        })
      );
      vectorSource.addFeature(feature);
    };

    fetchAndAddLineData('Orange', 'orange');
    fetchAndAddLineData('Red', 'red');
    fetchAndAddLineData('Blue', 'blue');

    return () => {
      map.setTarget(null);
      vectorSource.clear();
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '1000px' }} />;
};

export default MapComponent;
