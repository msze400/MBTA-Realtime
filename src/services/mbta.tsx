import Polyline from '@mapbox/polyline';
import { fromLonLat } from 'ol/proj';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature.js';

const fetchLineData = async (line) => {
  const url = `https://api-v3.mbta.com/shapes?filter%5Broute%5D=${line}`;
  const res = await fetch(url);
  const data = await res.json();
  const decodedCoords = Polyline.decode(
    data.data[0].attributes.polyline
  ).map((coord) => [coord[1], coord[0]]);
  const lineCoords = decodedCoords.map((coord) => fromLonLat(coord));
  const lineString = new LineString(lineCoords);
  const feature = new Feature({
    geometry: lineString,
  });
  return feature;
};

export default {
  fetchLineData,
};